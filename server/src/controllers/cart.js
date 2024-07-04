import { Cart } from "../models/cart.model.js";

export const getCart = async (req, res) => {
    try{
        let { mongoUser } = req.user;
        let details = await Cart.findOne({ user_id: mongoUser._id }).populate(["products.product_id", "products.details"]);
        if(!details){
            return res.status(500).json(details);
        }
        res.status(200).json(details);
    } catch(err) {
        res.status(401).json({message: err.message});
    }
}

export const addToCart = async (req, res) => {
    try{
        let { mongoUser } = req.user;
        let { type } = req.params;
        let { productId, detailsId } = req.body;
        let query = {};
        let filter = {
            user_id: mongoUser._id,
            "products.details": detailsId
        };

        if(type == "PUSH"){
            let details = req.cart.products.filter((item) => { return String(item.product_id) === productId && String(item.details) === detailsId });
            
            if(details.length !== 0){
                return res.status(500).json({ message: "Item already in cart" })
            }

            query = {
                $addToSet: {
                    products: {
                        product_id: productId,
                        details: detailsId,
                        quantity: 1
                    }
                }
            }
            filter = {
                user_id: mongoUser._id
            }
        } else if(type == "INCREMENT"){
            query = {
                $inc: {
                    "products.$.quantity": 1
                }
            }
        } else if(type == "DECREMENT"){
            query = {
                $inc: {
                    "products.$.quantity": -1
                }
            }
        } else if(type == "REMOVE"){
            query = {
                $pull: {
                    products: {
                        product_id: productId,
                        details: detailsId
                    }
                }
            }
        } else {
            return res.status(500).json({
                message: "Invalid query"
            });
        }

        let result = await Cart.updateOne(filter, query);

        if(result.matchedCount == 0){
            return res.status(500).json({
                message: "Some error occured"
            })
        }

        res.status(200).json({message: `Item ${type}`});
    } catch(err) {
        res.status(401).json({message: err.message});
    }
}

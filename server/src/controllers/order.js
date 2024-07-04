import { Order } from "../models/order.model.js";

export const getUserOrder = async (req, res) => {
    try {
        let { mongoUser } = req.user;

        let details = await Order.find({ user_id: mongoUser._id }).populate("user_id");

        if (!details) {
            return res.status(500).json({
                message: "Some error occured"
            });
        }

        res.status(200).json(details);
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
}

export const getUserOrderByPage = async (req, res) => {
    try{
        let { mongoUser } = req.user;
        
        let details = await Order.find({ user_id: mongoUser._id }).sort([["createdAt", -1]]);

        if(!details){
            return res.status(500).json({
                message: "Some error occured"
            });
        }

        res.status(200).json(details);
    } catch(err){
        res.status(401).json({ message: err.message });
    }
}

export const updateOrder = async (req, res) => {
    try {
        let details = await Order.updateOne({ user_id: req.body.userId }, {
            $set: {
                shippingPrice: req.body.shippingPrice,
                taxPrice: req.body.taxPrice,
                totalPrice: req.body.totalPrice,
            }
        });

        if (!details) {
            return res.status(500).json({
                message: "Some error occured"
            })
        }

        res.status(200).json(details);
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
}

export const getAllOrders = async (req, res) => {
    try{

        let page = req.body.page || 1;
        let limit = req.body.limit || 15;
        let skip = (page - 1) * limit;

        let count = await Order.find({ status: req.body.status }).count();
        let details = await Order.find({ status: req.body.status }).populate(["user_id"]).skip(skip).limit(limit).sort([["createdAt", 1]]).lean();

        if(!details){
            return res.status(500).json({
                message: "Some error occured"
            });
        }

        res.status(200).json({data: details, count: count});
    }catch(err){
        res.status(401).json({ message: err.message });
    }
}

export const changeUserStatus = async (req, res) => {
    try {
        let details = await Order.updateOne({ user_id: req.body.userId }, {
            $set: {
                status: req.body.status
            }
        });

        if (details.modifiedCount == 0) {
            return res.status(500).json({
                message: "Some error occured"
            })
        }

        res.status(200).json({message: "Status changed"});
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
}

export const deleteOrder = async (req, res) => {
    try{
        let details = await Order.deleteOne({ order_id: req.body.orderId });

        res.status(200).json({
            message: "Order deleted"
        });
    } catch(err){
        res.status(401).json({
            message: err.message
        })
    }
}
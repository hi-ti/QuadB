import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CartContext } from "../../../Context/AllContext/CartContext";
import { UserContext } from "../../../Context/AllContext/UserContext";
import Faqs from "./Faqs";

function Details({ item, id }) {

  let user = useContext(UserContext);
  let cart = useContext(CartContext);
  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [weight, setWeight] = useState("");
  const [loader, setLoader] = useState(false);
  const [productId, setProductId] = useState();

  const [firebaseUser, setFirebaseUser] = useState();
  const notify = () => toast.success("Added To Cart");
  const usernotfound = () => toast.error("Please Sign In");

  useEffect(() => {
    setProductId(id);
  }, [id]);

  useEffect(() => {
    setData(item);
  }, [item]);

  useEffect(() => {
    if (data && data.details) {
      setWeight(data?.details[0]?.productDetailsId?._id);
    }
  }, [data]);

  useEffect(() => {
    setFirebaseUser(user.user);
  }, [user.user]);

  return (
    <>
      <div className="w-full lg:w-[50%] md:py-16 lg:py-0 md:px-10">
        <h1 className="text-3xl font-black"> {data?.name} </h1>
        <div className="flex flex-col space-y-4 py-7 my-2 mb-5 border-y-2 border-black">
          <div className="flex flex-col sm:flex-row gap-3 font-semibold">
            <FormControl sx={{
              border: "1px solid black",
              background: "white",
              width: { md: "208px", lg: "208px", xl: "208px", sm: "100%", xs: "100%" }
            }} focused={false} className="rounded-full">
              <InputLabel sx={{
                fontWeight: "bold",
                color: ""
              }} id='demo'>{!weight ? "Weight" : ""}</InputLabel>
              <Select value={weight} onChange={(e) => {
                setWeight(e.target.value);
              }} labelId="demo" id="demo" label={!weight ? "Weight" : ""} sx={{
                '.MuiOutlinedInput-notchedOutline': { border: 0, outline: 0 },
                textAlign: "center",
                color: "#A5905Eff",
                fontWeight: "600",
                fontFamily: "Montserrat",
                fontSize: "20px"
              }}>
                {
                  data?.details?.map((item) => {
                    return (
                      <MenuItem key={item?._id} sx={{
                        textAlign: "center",
                        color: "#A5905Eff",
                        fontFamily: "Montserrat",
                        fontSize: "18px"
                      }} value={item?.productDetailsId?._id}>{item?.productDetailsId?.weight}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
            <button onClick={() => {
              if (firebaseUser) {
                if (productId && weight) {
                  if (!loader) {
                    setLoader(true);
                    cart.updateCart(productId, weight, "PUSH").then(() => {
                      notify();
                      cart.setFlag2(true);
                      setLoader(false);
                    }).catch((err) => {
                      toast.error(err.response.data.message);
                      setLoader(false);
                    });
                  }
                }
              } else {
                usernotfound();
              }
            }} className="w-[100%] sm:w-52 border border-black text-white py-4 bg-primary rounded-full">
              {loader ? (
                <div className="lds-dual-ring"></div>
              ) : (
                "Add to cart"
              )}
            </button>
          </div>
          <div>
            <p className="text-md">
              <span className="font-bold">Price:</span> ₹{data?.details?.filter((item) => {
                return item?.productDetailsId?._id === weight
              })[0]?.productDetailsId?.price * quantity}
            </p>
          </div>
        </div>

        {/* div 3 */}
        <div className="flex flex-col space-y-12 break-words">
          <div className="text-md">
            <p>
                lorem ipsum 
            </p>
          </div>

          <div>
            <p className="font-bold">Flavour: Milk</p>
            <p>
              lorem ipsum
            </p>
          </div>

          <div>
            <img src={require("../../../Assets/banner.png")} alt="" />
          </div>
        </div>

        <div className="py-10">
          <Faqs />
          <Faqs />
          <Faqs />
          <Faqs />
        </div>
      </div>
    </>
  );
};

export default Details;

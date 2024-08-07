/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../Context/AllContext/UserContext";
import "../../../styles/index.css";
import { toast } from "react-hot-toast";

const Popup = (props) => {
  let user = useContext(UserContext);
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    user.setLoader(true);
    if (email !== "" && password !== "") {
      await user
        .loginFirebaseUser(email.toLowerCase(), password)
        .then((userCreds) => {
          if (userCreds) {
            user.setUser(userCreds.user);
            user.getMongoUser(userCreds.user);
            navigate("/");
          }
        })
        .catch((error) => {
          if (error.code === "auth/user-disabled") {
            toast.error("User has been disabled");
          } else if (error.code === "auth/user-not-found") {
            toast.error("User not found");
          } else if (error.code === "auth/wrong-password") {
            toast.error("Wrong Password");
          } else if (error.code === "auth/invalid-email") {
            toast.error("Invalid Email");
          } else if (error.code === "auth/weak-password") {
            toast.error("Weak Password");
          } else if (error.code === "auth/email-already-in-use") {
            toast.error("Email already in use");
          } else if (error.code === "auth/operation-not-allowed") {
            toast.error("Operation not allowed");
          } else if (error.code === "auth/argument-error") {
            toast.error("Argument error");
          } else {
            toast.error("Some error occured");
          }
          user.setLoader(false);
        });
      props.data();
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div
      className="fixed bg-[rgba(0,0,0,0.6)] top-0 left-0 right-0 bottom-0 flex items-center justify-center z-30 min-h-[100vh]"
      onClick={props.data}
    >
      <div
        className="w-[80%] sm:w-[70%] md:w-[80%] lg:w-[80%] max-w-[900px] h-[max-content] bg-lion text-black rounded-[20px] overflow-hidden flex flex-col md:flex-row absolute popcon"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="hidden md:block md:w-[45%]">
          <img src={require("../../../Assets/subimg.jpg")} style={{
            height: "100%",
          }} />
        </div>
        <div className="bg-alab py-10 md:py-[48px] p-[24px] w-full md:w-[55%] flex md:flex-col items-center justify-center">
          <div className="w-full md:w-[80%] h-[80%] flex flex-col items-center justify-center gap-[1rem]">
            <p className="font-montserrat text-4xl text-center font-[700] w-[90%] text-black mb-[-2%] tracking-[0.1rem] ">
              Join here
            </p>
            <input
              value={email}
              className="w-full md:w-[100%] lg:w-[80%] rounded-[100px] border-none p-[16px] text-[1rem] outline-none placeholder:text-[1rem] placeholder:font-[500] placeholder:text-black mt-2 "
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="text"
              placeholder="EMAIL"
            ></input>
            <input
              value={password}
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="w-full md:w-[100%] lg:w-[80%] rounded-[100px] border-none p-[16px] text-[1rem] outline-none placeholder:text-[1rem] placeholder:font-[500] placeholder:text-black mb-2 "
              placeholder="PASSWORD"
            ></input>
            <button
              className="w-[40%] bg-[#A5905E] text-white rounded-[50px] text-[16px] border-none p-[8px] "
              onClick={handleSignIn}
            >
              SIGN IN
            </button>
            <div className="w-full text-center text-[#A5905Eff]">
              <span className="mr-[8px]">Don't have an account?</span>
              <button
                className="bg-transparent border-none text-primary text-md font-[600]"
                onClick={() => {
                  props.name();
                  props.data();
                }}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;

/* eslint-disable jsx-a11y/alt-text */
import React, { useRef, useState } from "react";
import subimg from "../../../Assets/sub.jpg";
import { InfoUrl, publicApi } from "../../../Api/Api";
import { toast } from "react-hot-toast";
import axios from "axios";

const Sub = () => {
  const Input = useRef();
  const [loader, setLoader] = useState("");

  return (
    <div id="faq" className="py-32 hidden sm:flex justify-center items-center">
      <div className="w-[80%] max-w-[1200px] flex flex-col lg:flex-row rounded-[20px] overflow-hidden">
        <div className="hidden w-[60%] h-[400px] lg:block overflow-hidden">
          <img
            className="w-[100%] h-[100%] object-center object-cover"
            src={subimg}
            alt=""
          />
        </div>

        <div className="relative rounded-[20px] lg:rounded-[0px] border lg:border-0 flex flex-col lg:flex-row space-y-10 lg:space-y-0 pb-32 lg:pb-0 overflow-hidden bg-bone">
          <div className="text-center pt-[16px] flex flex-col items-center justify-start lg:justify-center space-y-4 text-black z-[14]">
            <h2 className="text-[24px] w-full uppercase lg:mt-[-30%]">
              Subscribe to our newsletter.
            </h2>
            <p className="w-[80%] lg:w-[100%] text-[16px] px-3">
              Get the latest updates on new releases and the hottest trends.
            </p>
          </div>
          <div className="flex flex-col justify-center z-[14]">
            <div className="flex justify-center items-center lg:mt-[30%] lg:ml-[-20%] box-border rounded-[100px] z-[14]">
              <input
                ref={Input}
                className="h-12 w-56 rounded-[100px] border-none outline-none px-[16px] shadow-subsEmail placeholder:text-[1rem] placeholder:font-[540] placeholder:text-black"
                type="email"
                placeholder="Email Address"
              />
              <button
                onClick={() => {
                  if (!loader) {
                    const email = Input.current.value;
                    if (email !== "") {
                      setLoader(true);
                      axios
                        .get(InfoUrl)
                        .then((data) => {
                          publicApi
                            .post("/subscription", {
                              email,
                              latitude: data.data.latitude,
                              longitude: data.data.longitude,
                            })
                            .then((res) => {
                              toast.success(res.data.message);
                              Input.current.value = "";
                              setLoader(false);
                            })
                            .catch((err) => {
                              toast.error(err.response.data.message);
                              setLoader(false);
                            });
                        })
                        .catch(() => {
                          setLoader(false);
                        });
                    }
                  }
                }}
                className="shadow-subsButton h-12 w-[110px] rounded-[100px] ml-[-39px] border-none bg-red text-[#f5f5dc] text-[1rem] "
              >
                Subcsribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sub;

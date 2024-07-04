import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Review from "./Review";
import Sub from "../Pages/Home/components/Sub";

export default function Global({ children }) {
  const route = useLocation().pathname;
  var background;
  if (route === "/about" || route === "/cart") {
    background = "#E3D8CBff";
  } else if (route === "/product") {
    background = "linear-gradient(180deg, #E3D8CBff 0%, #A5905Eff 23.75%)";
  } else if (route === "/profile/account" || route === "/profile/order") {
    background = "rgba(255, 248, 239, 1)";
  }

  const [background2, setBackground2] = useState("transparent");
  const [position, setPosition] = useState("fixed");

  useEffect(() => {
    if (window.pageYOffset === 0 && route === "/") {
      setBackground2("transparent");
    } else {
      setBackground2("white");
    }

    if (route !== "/") {
      setPosition("sticky");
    } else {
      setPosition("fixed");
    }

    window.onscroll = function () {
      if (window.pageYOffset === 0 && route === "/") {
        setBackground2("transparent");
      } else {
        setBackground2("white");
      }
    };
  }, [route, window.pageYOffset]);

  if(route.includes("/admin")){
    return <main>{children}</main>
  }

  return (
    <main
      style={{
        background,
      }}
    >
      <div className="hidden md:block">
        <Header background={background2} position={position} />
      </div>
      {children}
      {(route === "/" || route === "/shop") && <Review />}
      {route === "/" && <Sub />}
      <Footer />
    </main>
  );
}

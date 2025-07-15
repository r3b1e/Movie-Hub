import React from "react";
import Topnav from "../packets/Topnav";
import { useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux'
import Cards from "./Cards";

const Cart = () => {

    const navigate = useNavigate();
    const data = useSelector((state) => state.detail.items)
  return (
    <div>
      <Topnav />
      <h2 className="text-2xl font-semibold mx-10 my-10">
        <span>
          <i
            onClick={() => navigate("/")}
            className="ri-arrow-left-line cursor-pointer hover:bg-sky-700"
          ></i>{" "}
        </span>
        Basket
      </h2>
      <Cards data={data} />
    </div>
  );
};

export default Cart;

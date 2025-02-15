import React from "react";
import Card from "./Card";

function Cards({ data }) {
  return (
    <div className="m-5 flex gap-x-5 gap-y-10 flex-wrap">
      {data.map((v, i) => (
        <Card data={v} key={i} />
      ))}
    </div>
  );
}

export default Cards;

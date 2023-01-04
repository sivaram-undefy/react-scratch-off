import React from "react";
import "./Element.css";

const Element = () => {
  function getData() {
    const x = Math.floor(Math.random() * 100 + 1);
    return `You have won $ ${x}`;
  }

  return (
    <div className="contain">
      <p> {getData()}</p>
    </div>
  );
};

export default Element;

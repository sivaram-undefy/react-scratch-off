import React from "react";

const Element = () => {
  function getData() {
    const x = Math.floor(Math.random() * 100 + 1);
    return `You have won $ ${x}`;
  }

  return (
    <div className="flex flex-column justify-center items-center h-full w-full bg-orange-200">
      <p> {getData()}</p>
    </div>
  );
};

export default React.memo(Element);

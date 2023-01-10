import React from "react";

const Element = (props:any) => {
 

  return (
    <div className="flex flex-column justify-center items-center h-full w-full bg-orange-200">
      <p> {props.data}</p>
    </div>
  );
};

export default Element;

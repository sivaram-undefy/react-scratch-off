import React from "react";

interface Type {
  data: string;
}

const Element = (props: Type) => {
  return (
    <div className="flex flex-column justify-center items-center h-full w-full bg-orange-200">
      <p> {props.data}</p>
    </div>
  );
};

export default Element;

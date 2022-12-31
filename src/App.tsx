import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Card1 from "./Components/Card1/Card1";

import Element from "./Components/Element/Element";

import "./App.css";

function App() {
  function Finisher() {
    alert("You are done here!!");
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="card">
          <p className="pak">Scratch Me!! </p>
          <div className="carding">
            <Card1
              dimension={300}
              percent={60}
              element={<Element />}
              finisher={Finisher}
              radius={20}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

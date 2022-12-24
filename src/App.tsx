import React from "react";
import Navbar from "./Components/Navbar/Navbar";
//import Card1 from "./Components/Card1/Card1";
import Card2 from "./Components/Card2/Card2";


import './App.css'

function App() {


  return (
    <>
    <Navbar />
    <div className="container">
      <div className="card">
        <p className="pak">lesca-react-scratch-card </p>
        <div className="carding">
          //card1 component
        </div>
      </div>
      <div className="card">
      <p className="pak">coming soon </p>
      <div className="carding">
          <Card2 />
        </div>


      </div>
    </div>
  </>
  )
}

export default App

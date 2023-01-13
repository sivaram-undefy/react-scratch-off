import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Card1 from "./Components/Card1/Card1";
import Confetting from "./Components/Confetting/Confetting";
import Element from "./Components/Element/Element";

function App() {
  const [status, setStatus] = useState(false);

  function onDone() {
    setStatus(true);
  }

  function onConfettiComplete() {
    setStatus(false);
  }

  return (
    <>
      <Navbar />
      <Confetting status={status} onConfettiComplete={onConfettiComplete} />
      {
        <div className="flex flex-row flex-wrap justify-around gap-y-5 mb-5 sm:flex-column items-center">
          {[...Array(12).keys()].map((item) => (
            <Card1
              key={item}
              dimension={300}
              percent={60}
              element={<Element data={`You have won $${item+1}`} />}
              onDone={onDone}
              radius={20}
            />
          ))}
        </div>
      }
    </>
  );
}

export default App;

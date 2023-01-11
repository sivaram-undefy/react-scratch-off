import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Card1 from "./Components/Card1/Card1";
import Confetting from "./Components/Confetting/Confetting";
import Element from "./Components/Element/Element";

function App() {
  const [status, setStatus] = useState(false);
  const rand = [
    "Better Luck next time!!",
    "You have won 100$",
    "You have won 50$",
    "You have won 40$",
    "You have won 10$",
    "You have won 20$",
    "You have won 30$",
    "You have won 60$",
  ];

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
          {rand.map((item) => (
            <Card1
              key={item}
              dimension={300}
              percent={60}
              element={<Element data={item} />}
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

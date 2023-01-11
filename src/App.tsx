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

  function getData() {
    const rand = [
      "Better Luck next time!!",
      "You have won 100$",
      "You have won 50$",
      "You have won 40$",
      "You have won 10$",
    ];
    let item = rand[Math.floor(Math.random() * rand.length)];

    return item;
  }

  return (
    <>
      <Navbar />
      <Confetting status={status} onConfettiComplete={onConfettiComplete} />
      <div className="flex flex-row flex-wrap justify-around gap-y-5 mb-5 sm:flex-column items-center">
        {}
        <Card1
          dimension={300}
          percent={60}
          element={<Element data={getData()} />}
          onDone={onDone}
          radius={20}
        />
        <Card1
          class="play"
          dimension={300}
          percent={60}
          element={<Element data={getData()} />}
          onDone={onDone}
          radius={20}
        />
        <Card1
          class="play"
          dimension={300}
          percent={60}
          element={<Element data={getData()} />}
          onDone={onDone}
          radius={20}
        />
        <Card1
          class="play"
          dimension={300}
          percent={60}
          element={<Element data={getData()} />}
          onDone={onDone}
          radius={20}
        />
        <Card1
          class="play"
          dimension={300}
          percent={60}
          element={<Element data={getData()} />}
          onDone={onDone}
          radius={20}
        />
        <Card1
          class="play"
          dimension={300}
          percent={60}
          element={<Element data={getData()} />}
          onDone={onDone}
          radius={20}
        />
        <Card1
          class="play"
          dimension={300}
          percent={60}
          element={<Element data={getData()} />}
          onDone={onDone}
          radius={20}
        />
        <Card1
          class="play"
          dimension={300}
          percent={60}
          element={<Element data={getData()} />}
          onDone={onDone}
          radius={20}
        />
      </div>
    </>
  );
}

export default App;

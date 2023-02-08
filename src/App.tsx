import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Card1 from "./Components/Card1/Card1";
import Confetting from "./Components/Confetting/Confetting";
import Element from "./Components/Element/Element";

interface Info {
  id: string;
  amount: number;
}

function App() {
  const [currentCardId, setCurrentCardId] = useState<string>();
  const [data, setData] = useState<Info[]>([]);

  async function getData() {
    try {
      const res = await fetch("./price.json");
      const info = (await res.json()) as Info[];
      setData(info);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);


  function onDone(id: string) {
    setCurrentCardId(id); 
  }

  function onConfettiComplete(id?: string) {
    if (!id) {
      return;
    }
    setCurrentCardId((prevState) => (prevState === id ? undefined : prevState));
  }

  return (
    <>
      <Navbar />
      <h3>{currentCardId}</h3>
      <Confetting
       key={currentCardId}
        status={Boolean(currentCardId)}
        onConfettiComplete={onConfettiComplete}
        id={currentCardId}
      />
      {
        <div className="flex flex-row flex-wrap justify-around gap-y-5 mb-5 sm:flex-column items-center ">
          {data.map((item) => (
            <Card1
              key={item.id}
              id={item.id}
              dimension={300}
              percent={60}
              element={<Element data={`You have won $${item.amount}`} />}
              onDone={() => onDone(item.id)}
              radius={20}
            />
          ))}
        </div>
      }
    </>
  );
}

export default App;

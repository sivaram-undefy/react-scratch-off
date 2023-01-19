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
  const [cardIds, setCardIds] = useState<string[]>([]);
  const [data, setData] = useState<Info[]>([]);
  const [status, setStatus] = useState(false);

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

  useEffect(() => {
    console.log(cardIds);
  }, [cardIds]);

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
        <div className="flex flex-row flex-wrap justify-around gap-y-5 mb-5 sm:flex-column items-center ">
          {data.map((item) => (
            <Card1
              onMouseEnter={() =>
                setCardIds((current) => [...current, item.id])
              }
              onMouseLeave={() =>
                setCardIds((current) =>
                  current.filter((_, index) => index !== 0)
                )
              }
              key={item.id}
              dimension={300}
              percent={60}
              element={<Element data={`You have won $${item.amount}`} />}
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

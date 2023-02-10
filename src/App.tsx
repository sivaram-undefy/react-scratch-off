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
  //Local storage initial value and persistor
  const selectedValue = localStorage.getItem("selected");
  let selected: string[];
  try {
    selected = selectedValue ? JSON.parse(selectedValue) : [];
  } catch (e) {
    selected = [];
  }

  //State variables
  const [data, setData] = useState<Info[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>(selected);
  const [currentCardId, setCurrentCardId] = useState<string>();

  //API call function
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
    localStorage.setItem("selected", JSON.stringify(selectedIds));
  }, [selectedIds]);

  function onDone(id: string) {
    setCurrentCardId(id);
    if (!selectedIds.includes(id)) {
      setSelectedIds((prevState) => prevState.concat(id));
    }
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
              isRevealed={selectedIds.includes(item.id)}
              percent={70}
              element={<Element data={`You have won $${item.amount}`} />}
              onDone={() =>
                selectedIds.includes(item.id) ? null : onDone(item.id)
              }
              radius={20}
            />
          ))}
        </div>
      }
    </>
  );
}

export default App;

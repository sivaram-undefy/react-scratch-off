import { useEffect, useState } from "react";

import Confetti from "react-confetti";

function Confetting(props: any) {
  const [comp, setComp] = useState(false);

  const [Dimension, setDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const detectSize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, []);

  useEffect(() => {
    if (comp) {
      props.onConfettiComplete();
      setComp(false);
    }
  }, [comp]);

  function setConf() {
    setComp(true);
  }

  return (
    <div className="fixed inset-0 z-0">
      {props.status ? (
        <Confetti
          width={Dimension.width}
          height={Dimension.height}
          colors={["grey", "blue", "orange"]}
          numberOfPieces={200}
          recycle={false}
          onConfettiComplete={setConf}
        />
      ) : null}
    </div>
  );
}

export default Confetting;

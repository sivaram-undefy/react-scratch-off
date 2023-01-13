import { useEffect, useState } from "react";

import Confetti from "react-confetti";

interface Type {
  status: boolean;
  onConfettiComplete: () => void;
}

function Confetting(props: Type) {
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

  return (
    <div className="fixed inset-0 z-0">
      {props.status ? (
        <Confetti
          width={Dimension.width}
          height={Dimension.height}
          colors={["grey", "blue", "orange"]}
          numberOfPieces={200}
          recycle={false}
          onConfettiComplete={() => props.onConfettiComplete()}
        />
      ) : null}
    </div>
  );
}

export default Confetting;

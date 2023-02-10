import { useEffect, useState } from "react";

import Confetti from "react-confetti";

interface ConfettiProps {
  status: boolean;
  onConfettiComplete: (id?: string) => void;
  id: string | undefined;
}

function Confetting(props: ConfettiProps) {
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
          id={props.id}
          width={Dimension.width}
          height={Dimension.height}
          colors={["grey", "blue", "orange"]}
          numberOfPieces={200}
          recycle={false}
          onConfettiComplete={() => props.onConfettiComplete(props.id)}
        />
      ) : null}
    </div>
  );
}

export default Confetting;

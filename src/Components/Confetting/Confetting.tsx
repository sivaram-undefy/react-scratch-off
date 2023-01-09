import { useEffect, useState } from "react";

import Confetti from "react-confetti";

function Confetting(props: any) {
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
  }, [Dimension]);

  return (
    <div>
      {props.status ? (
        <Confetti
          width={Dimension.width}
          height={Dimension.height}
          colors={["grey", "blue"]}
          run={props.status}
          onConfettiComplete={() => {}}
          numberOfPieces={400}
          recycle={false}
        />
      ) : null}
    </div>
  );
}

export default Confetting;

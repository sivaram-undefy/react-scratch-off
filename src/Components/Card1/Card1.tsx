import { useState, useRef, useEffect } from "react";

import image from "../../assets/Images/reel.png";

interface Card1Props {
  onDone: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  element: JSX.Element;
  radius: number;
  dimension: number;
  percent: number;
}

const Card1 = (props: Card1Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [totalPixels, setTotalPixels] = useState<number>(0);

  const [isDrawing, setIsDrawing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (ctx) {
        const img = new Image();
        img.src = image;
        img.className = "trial";
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          contextRef.current = ctx;
          const pixelData = ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          ).data;
          const totalPixel = pixelData.reduce((a, b) => a + b, 0);
          setTotalPixels(totalPixel);
        };
      }
    }
  }, []);

  useEffect(() => {
    if (isDone) {
      props.onDone();
    }
  }, [isDone]);

  const getPercentage = () => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (ctx) {
        const pixelData = ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        ).data;
        const amountUnscratched = pixelData.reduce((a, b) => a + b, 0);
        const avg = Math.round((amountUnscratched / totalPixels) * 100);

        if (avg < props.percent) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          setIsDone(true);
        }
      }
    }
  };

  const handleMouseDown = (e: any) => {
    const { offsetX, offsetY } = e;
    if (contextRef?.current) {
      contextRef.current.beginPath();

      contextRef.current.moveTo(offsetX, offsetY);

      setIsDrawing(true);
      getPercentage();
    }
  };

  const handleMouseUp = () => {
    if (contextRef?.current) {
      contextRef.current.closePath();

      setIsDrawing(false);
      getPercentage();
    }
  };

  const handleMouseOut = () => {
    setIsDrawing(false);
    getPercentage();
  };

  const handleMouseMove = (e: any) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const ctx = contextRef.current;
    if (isDrawing && ctx) {
      ctx.beginPath();

      ctx.globalCompositeOperation = "destination-out";

      ctx.arc(offsetX, offsetY, props.radius, 0, Math.PI * 2, false);

      ctx.fill();
      getPercentage();
    }
  };

  const handleTouchStart = (e: any) => {
    var rect = e.target.getBoundingClientRect();
    var x = e.targetTouches[0].clientX - rect.left;
    var y = e.targetTouches[0].clientY - rect.top;
    if (contextRef?.current) {
      contextRef.current.beginPath();

      contextRef.current.moveTo(x, y);

      setIsDrawing(true);
      getPercentage();
    }
  };

  const handleTouchmove = (e: any) => {
    var rect = e.target.getBoundingClientRect();
    var x = e.targetTouches[0].clientX - rect.left;
    var y = e.targetTouches[0].clientY - rect.top;
    const ctx = contextRef.current;
    if (isDrawing && ctx) {
      ctx.beginPath();

      ctx.globalCompositeOperation = "destination-out";

      ctx.arc(x, y, props.radius, 0, Math.PI * 2, false);

      ctx.fill();

      getPercentage();
    }
  };

  return (
    <div
      className={
        props.cardId == props.setCardId
          ? "relative"
          : "relative pointer-events-none"
      }
      style={{ width: props.dimension, height: props.dimension }}
    >
      {!isDone ? (
        <canvas
          className="absolute bg-orange-500 shadow-md"
          width={props.dimension}
          height={props.dimension}
          onMouseEnter={props.onMouseEnter}
          onMouseLeave={props.onMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseOut={handleMouseOut}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleMouseUp}
          onTouchMove={handleTouchmove}
          ref={canvasRef}
        />
      ) : null}
      <div
        className="shadow-2xl"
        style={{ width: props.dimension, height: props.dimension }}
      >
        {props.element}
      </div>
    </div>
  );
};

export default Card1;

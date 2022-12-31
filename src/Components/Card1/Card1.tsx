import { useState, useRef, useEffect } from "react";
import "./Card1.css";
import image from "../../assets/Images/reel.png";


const Card1 = (props: any) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [totalPixels, setTotalPixels] = useState<number>(0);

  const [isDrawing, setIsDrawing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const img = new Image();
        img.src = image;
        img.onload = () => {
          ctx.drawImage(img, 0, 0, 300, 300);
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
  }, [isDone]);

  const getPercentage = () => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d");
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
          props.finisher();
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
    var x = e.targetTouches[0].pageX - rect.left;
    var y = e.targetTouches[0].pageY - rect.top;
    if (contextRef?.current) {
      contextRef.current.beginPath();

      contextRef.current.moveTo(x, y);

      setIsDrawing(true);
      getPercentage();
    }
  };

  const handleTouchmove = (e: any) => {
    var rect = e.target.getBoundingClientRect();
    var x = e.targetTouches[0].pageX - rect.left;
    var y = e.targetTouches[0].pageY - rect.top;
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
      className="play"
      style={{ width: props.dimension, height: props.dimension }}
    >
      {!isDone ? (
        <canvas
          id="canvas"
          width={props.dimension}
          height={props.dimension}
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
        className="content"
        style={{ width: props.dimension, height: props.dimension }}
      >
        {props.element}
      </div>
    </div>
  );
};

export default Card1;

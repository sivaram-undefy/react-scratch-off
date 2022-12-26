import React, { useState, useRef, useEffect } from 'react';
import Image from "../../assets/Images/scratch-card.jpg";
import "./Card1.css";

const Card1 = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);

    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (canvas) {

            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.fillStyle = "grey";
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(300, 0);
                ctx.lineTo(0, 100000);


                ctx.closePath();
                ctx.fill();

                contextRef.current = ctx;
            }
        }
    }, []);

    const handleMouseDown = (e: any) => {
        const { offsetX, offsetY } = e;
        if (contextRef?.current) {

            contextRef.current.beginPath();

            contextRef.current.moveTo(offsetX, offsetY);

            setIsDrawing(true);
        }
    };

    const handleMouseUp = () => {
        if (contextRef?.current) {


            contextRef.current.closePath();

            setIsDrawing(false);
        }
    };

    const handleMouseOut = () => {
        setIsDrawing(false);
    };

    const handleMouseMove = (e: any) => {
        const { offsetX, offsetY } = e.nativeEvent;
        const ctx = contextRef.current;
        if (isDrawing && ctx) {

            ctx.beginPath();

            ctx.globalCompositeOperation = "destination-out";

            ctx.arc(offsetX, offsetY, 16, 0, Math.PI * 2, false);

            ctx.fill();
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

            ctx.arc(x, y, 16, 0, Math.PI * 2, false);

            ctx.fill();
        }
    };

    return (
        <canvas
            id="canvas"
            width="300"
            height="300"
            style={{
                backgroundImage: `url(${Image})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseOut={handleMouseOut}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleMouseUp}
            onTouchMove={handleTouchmove}
            ref={canvasRef}
        />
    );
};

export default Card1;

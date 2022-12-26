import React, { useState, useRef, useEffect } from 'react';
import Image from "../../assets/Images/scratch-card.jpg";
import "./Card1.css";

function Card1(props: any) {

    const card = useRef<HTMLCanvasElement>(null);

    const [status, setStatus] = useState({
        isDrawing: false,
        startX: 0,
        startY: 0,

    });

    useEffect(() => {
        const canvas = card.current;

        const context = canvas?.getContext('2d');

        canvas?.addEventListener('mousedown', scratchStart);
        canvas?.addEventListener('mousemove', scratch);
        canvas?.addEventListener('mouseup', scratchEnd);

        canvas?.addEventListener("touchstart", scratchStart);
        canvas?.addEventListener("touchmove", scratch);
        canvas?.addEventListener("touchend", scratchEnd);

        if (context) {
            context.fillStyle = '#ddd';
            context.fillRect(0, 0, 300, 300);
            context.lineWidth = 60;
            context.lineJoin = "round";

        }






    }, [])


    const scratchStart = (e: any) => {
        const { layerX, layerY } = e;

        setStatus({
            isDrawing: true,
            startX: layerX,
            startY: layerY
        });
    };

    const scratchEnd = (e: any) => {
        setStatus({
            ...status,
            isDrawing: false,

        });
    };

    const scratch = (e: any) => {
        const { layerX, layerY } = e;
        const context = card.current?.getContext("2d");


        if (status.isDrawing && context) {
            context.globalCompositeOperation = "destination-out";
            context.beginPath();
            context.moveTo(status.startX, status.startY);
            context.lineTo(layerX, layerY);
            context.closePath();
            context.stroke();

            setStatus({
                ...status,
                startX: layerX,
                startY: layerY
            });





        } else {
            return;
        }





    }













    return (
        <canvas ref={card} id="canvas" />








    )

}

export default Card1;
import React from 'react';
import ScratchCard from "lesca-react-scratch-card";
import Image from "../../assets/Images/scratch-card.jpg";
import "./Card1.css";

function Card1(props:any){
return(

    <ScratchCard
    cover={Image}
    percent={60}
    width={300}
    height={300}
    onComplete={() => {
      alert("You are done here.. ");
      window.location.reload();
    }}
  >
    <div className="content">
      <p>{props.msg}</p>
    </div>
  </ScratchCard>
)
}

export default Card1;
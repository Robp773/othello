import React from "react";
export default function Box(props) {
  return (
    <div className={`box ${props.darkBackground ? "box--even" : "box--odd"}`}>
        <div className='hidden-position'>{props.position}</div>
      <div className={props.pieceColor ? `piece-${props.pieceColor}` : "piece-empty"}></div>
    </div>
  );
}

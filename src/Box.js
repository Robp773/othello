import React from "react";
export default function Box(props) {
  return (
    <div
      onClick={() => props.handleBoxClick(props.position)}
      className={`box ${props.darkBackground ? "box--even" : "box--odd"} ${props.border ? "border" : null}`}
    >
      <div className="hidden-position">{props.position}</div>
      <div className={props.pieceColor ? `piece-${props.pieceColor}` : "piece-empty"} />
    </div>
  );
}

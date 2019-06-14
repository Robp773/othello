import React from "react";
import Box from "./Box";
import "./App.css";

export default class App extends React.Component {
  constructor() {
    super();
    let initialBoxes = [];
    let darkBackground = true;

    for (let i = 0; i < 64; i++) {
      let boxObj = { pieceColor: null, position: i, isBorder: false };

      // top and bottom board borders
      if (i - 8 < 0 || i + 8 > 63) {
        boxObj.isBorder = true;
      }

      // right side borders
      if ((i + 1) % 8 === 0) {
        boxObj.isBorder = true;
      }

      // every new row of 8x8 board needs to start with a different background
      // color than rows above and below
      if (i % 8 === 0) {
        // toggle previously set color an extra time to get new color on row
        darkBackground = !darkBackground;
        boxObj.darkBackground = darkBackground;
        // change color for next box
        darkBackground = !darkBackground;
        // left side borders
        boxObj.isBorder = true;
      } else {
        boxObj.darkBackground = darkBackground;
        darkBackground = !darkBackground;
      }

      initialBoxes.push(boxObj);
    }
    this.state = { boxes: initialBoxes, turn: "white" };
    this.handleBoxClick = this.handleBoxClick.bind(this)
  }

  handleBoxClick(position) {
    let boxes = this.state.boxes;
    boxes[position].pieceColor = this.state.turn;
    let turn = this.state.turn === "white" ? "black" : "white";
    this.setState({ boxes, turn });
  }

  render() {
    return (
      <div className="App">
        <h1>Othello</h1>
        <h2>Turn: {(this.state.turn).toUpperCase()}</h2>
        <div className="board">
          {this.state.boxes.map((box, index) => {
            return <Box handleBoxClick={this.handleBoxClick} key={index} {...box} />;
          })}
        </div>
      </div>
    );
  }
}

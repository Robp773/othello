import React from "react";
import Box from "./Box";
import "./App.css";
import chainFinder from "./chainFinder";

export default class App extends React.Component {
  constructor() {
    super();
    let initialBoxes = [];
    let darkBackground = true;

    for (let i = 0; i < 64; i++) {
      let boxObj = { pieceColor: null, position: i, border: [] };

      // top and bottom board borders
      if (i - 8 < 0) {
        boxObj.border.push("top");
      }
      if (i + 8 > 63) {
        boxObj.border.push("bottom");
      }
      // right side borders
      if ((i + 1) % 8 === 0) {
        boxObj.border.push("right");
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
        boxObj.border.push("left");
      } else {
        boxObj.darkBackground = darkBackground;
        darkBackground = !darkBackground;
      }

      initialBoxes.push(boxObj);
    }
    this.state = { boxes: initialBoxes, turn: "white" };
    this.handleBoxClick = this.handleBoxClick.bind(this);
  }

  handleBoxClick(position) {
    let boxes = chainFinder(this.state.boxes, this.state.turn, position);
    // return
    let turn = this.state.turn === "white" ? "black" : "white";
    if (boxes) {
      this.setState({ boxes, turn });
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Othello</h1>
        <h2>Turn: {this.state.turn.toUpperCase()}</h2>
        <div className="board">
          {this.state.boxes.map((box, index) => {
            return <Box handleBoxClick={this.handleBoxClick} key={index} {...box} />;
          })}
        </div>
      </div>
    );
  }
}

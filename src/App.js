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
      let boxObj = { pieceColor: null, position: i, edges: [] };

      // top borders
      if (i - 8 < 0) {
        boxObj.edges.push(-9, -8, -7);
      }

      // bottom borders
      if (i + 8 > 63) {
        boxObj.edges.push(9, 8, 7);
      }

      // right borders
      if ((i + 1) % 8 === 0) {
        boxObj.edges.push(1, 9)
      }

      // every new row of 8x8 board needs to start with a different background
      // color than rows above and below
      if (i % 8 === 0) {
        // toggle previously set color an extra time to get new color on row
        darkBackground = !darkBackground;
        boxObj.darkBackground = darkBackground;
        // change color for next box
        darkBackground = !darkBackground;
        // left  borders

        boxObj.edges.push(-1, -9)
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

    if (this.state.boxes[position].pieceColor) {
      alert('piece already placed')
      return
    }

    this.state.boxes[position].pieceColor = this.state.turn
    let boxes = this.state.boxes

    chainFinder(this.state.boxes, this.state.turn).then((boxes) => {

      this.setState({ boxes, turn: this.state.turn === "white" ? "black" : "white" });
    })

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

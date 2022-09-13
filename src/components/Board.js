import React from "react";
import Square from "./Square.js";
import { calculatePos } from "../utils.js";

export default class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    let matrix = [];
    for (let row = 0; row < 3; row++) {
      let currRow = [];
      for (let col = 0; col < 3; col++) {
        console.log(col + " " + row * col);
        currRow.push(this.renderSquare(calculatePos(col, row)));
      }
      matrix.push(<div key={row} className="board-row"> {currRow} </div>);
    }

    return <div>{matrix}</div>;
  }
}

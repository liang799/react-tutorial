import React from "react";
import Square from "./Square.js";

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
    const Rows = () => {
      let array = [];
      for (let row = 0; row < 9; row += 3) {
        const currRow = (
          <div key={row} className="board-row">
            {this.renderSquare(row)}
            {this.renderSquare(row + 1)}
            {this.renderSquare(row + 2)}
          </div>
        );
        array.push(currRow);
      }
      return array;
    };

    return (
      <div>
        <Rows />
      </div>
    );
  }
}

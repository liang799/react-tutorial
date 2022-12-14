import React from "react";
import Board from "./Board.js";
import { calculateWinner, getCoordinates } from "../utils.js";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          coordinates: Array(2).fill(null),
        },
      ],
      xIsNext: true,
      isAsc: true,
      stepNumber: 0,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);
    const squares = current.squares.slice();
    const coordinates = getCoordinates(i);
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          coordinates: coordinates,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    /* class, index */
    let moves = history.map((step, move) => {
      console.log(step);
      let desc = move
        ? "Go to move #" + move + " (" + step.coordinates + ")"
        : "Go to game start";
      if (move === this.state.stepNumber) {
        desc = <b>{desc}</b>;
      }
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let arrow = "⬇️";
    if (!this.state.isAsc) {
      moves.reverse();
      arrow = "⬆️";
    }

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else if (this.state.stepNumber === 9) {
      status = "Draw!";
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        <div>
          <button
            onClick={() => this.setState({ isAsc: !this.state.isAsc })}
          >
            Sort By: {arrow}
          </button>
        </div>
      </div>
    );
  }
}

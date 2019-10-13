import React, { useState } from 'react';
import '../styles/index.css'
import Square from './Square';
import GameController from "../GameController";

function Grid(props) {

  const [squares, setSquares] = useState(props.squares);

  let posMatrix = setMatrix(squares);
  let gameController = new GameController(posMatrix);

  return(
    <div id={"squares-grid"} className={"container"}>
      {squares.map((square) => {
        return(
            <Square square={square} onSquareClick={MovePiece} key={square.id} />
        );
      })}
    </div>
  );

  // set background matrix, transition, and win condition prior to checking adjacent
  function MovePiece(square){
    let tempArr = Array.from(squares).map(square => ({...square}));
    let clickedIndex = squares.indexOf(square);
    let emptyIndex = squares.findIndex(square => square.id === -1);

    [tempArr[clickedIndex].xPos, tempArr[emptyIndex].xPos] = [tempArr[emptyIndex].xPos, tempArr[clickedIndex].xPos];
    [tempArr[clickedIndex].yPos, tempArr[emptyIndex].yPos] = [tempArr[emptyIndex].yPos, tempArr[clickedIndex].yPos];

    setSquares(tempArr);
  }
}

function setMatrix(squares){
  let matrix = [];

  squares.forEach(square => {
    matrix.push(square.id);
  });

  return matrix;
}

export default Grid;
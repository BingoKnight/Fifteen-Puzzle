import React from 'react';
import '../styles/index.css'
import Square from './Square';

let boardStatus = false;

function Grid(props) {

  return(
    <div id={"squares-grid"} className={"container"}>
      {props.squares.map((square) => {
        return(
            <Square square={square} onSquareClick={MovePiece} key={square.id} squarelist={props.squares} />
        );
      })}
    </div>
  );

  function MovePiece(square){

    let clickedIndex = props.squares.indexOf(square);
    let emptyIndex = props.squares.findIndex(square => square.id === -1);

    // for easy win condition, comment out adjacency validation below
    // if(!props.game.isAdjacent(clickedIndex, emptyIndex) || !boardStatus) return;

    let tempArr = Array.from(props.squares).map(square => ({...square}));
    [tempArr[clickedIndex].id, tempArr[emptyIndex].id] = [tempArr[emptyIndex].id, tempArr[clickedIndex].id];

    props.game.UpdateMatrix(clickedIndex, emptyIndex, props.setIsActive);
    props.setSquares(tempArr);
    props.setMoves(props.moves+1);
  }
}

export const setBoardStatus = (status) =>{
  boardStatus = status;
}

export default Grid;
import React from 'react';
import '../styles/index.css'
import Square from './Square';

function Grid(props) {

  return(
    <div class="d-flex justify-content-center container">
      {props.squares.map((square) => {
        return(
          <Square square={square} />
        );
      })}
    </div>
  );   
}

export default Grid;
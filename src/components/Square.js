import React from 'react';
import styled from 'styled-components';
import '../styles/index.css';

function Square(props){

  let xDist = 100 * props.square.xPos;
  let yDist = 100 * props.square.yPos;

  const Tile = styled.div`
    left: ${xDist}px;
    top: ${yDist}px;
  `;

  if(props.square.id !== -1)
    return(
      <Tile id={"tile"} onClick={() => props.onSquareClick(props.square)}>
        <span>{props.square.id}</span>
      </Tile>
    );
  else
    return(
        <div />
    );
}

export default Square;
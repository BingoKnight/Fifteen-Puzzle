import React from 'react';
import '../styles/index.css';
import styled from 'styled-components';

function Square(props){

  let xDist = 90 * props.xPos;
  let yDist = 90 * props.yPos;

  const Tile = styled.div`
    left: ${xDist}px;
    top: ${yDist}px;
  `;

  return(
    <Tile id="square">

    </Tile>
  );
}

export default Square;
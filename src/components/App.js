import React, {useState} from 'react';
import '../styles/App.css';
import Grid from './Grid';
import Header from './Header';
import Footer from './Footer';
import WinModal from "./WinModal";
import NavBar from './NavBar';
import GameController from '../GameController.js'
const $ = require('jquery');

function App() {

  const [squares, setSquares] = useState(shuffle(InitializeGame()));
  const [moves, setMoves] = useState(0);
  const [time, setTimer] = useState(0);

  const gameController = new GameController(squares);
  gameController.setMatrix(squares);

  return (
    <div className="App">
      <WinModal PlayAgain={()=>ResetGame(setSquares)} />
      <NavBar moves={moves} time={time} setTimer={setTimer}/>
      <Header moves={moves} time={time} setTimer={setTimer}/>
      <Grid id={'grid'} squares={squares} setSquares={setSquares} game={gameController} setMoves={setMoves}/>
      <Footer />
    </div>
  );
}

function InitializeGame(){
  let yPos = 0;

  let squares = [];

  for(let i = 0; i < 16; i++){

    let id = (i !== 15) ? i + 1 : -1;
    let xPos = i % 4;
    if(i > 0 && xPos === 0)
      yPos++;

    squares[i] = {
      id,
      xPos,
      yPos
    }
  }

  return squares;
}

function shuffle(squares){
  let curr = squares.length;
  let tempId, rand;

  while (0 !== curr) {
    rand = Math.floor(Math.random() * curr);
    curr -= 1;
    tempId = squares[curr].id;
    squares[curr].id = squares[rand].id;
    squares[rand].id = tempId;
  }
  return squares;
}

function ResetGame(setSquares){
  $('#modal').css('display', 'none');

  const squares = (shuffle(InitializeGame()));
  const gameController = new GameController(squares);

  gameController.setMatrix(squares);
  setSquares(squares);
}

export default App;

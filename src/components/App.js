import React, {useState, useEffect, useRef, useContext, useReducer} from 'react';
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
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  function reset(){
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
        interval = setInterval(() => {
            setSeconds(seconds => seconds + 1);
        }, 1000);
    } else if (!isActive && seconds !== 0) {
        clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  function ResetGame(){
    $('#modal').css('display', 'none');
    
    const squares = (shuffle(InitializeGame()));

    const gameController = new GameController(squares);
  
    gameController.setMatrix(squares);
    setSquares(squares);
    setMoves(0);
    setSeconds(0);
    setIsActive($('#pause-btn').hasClass('disabled') ? false : true);
  }

  function StartEasyMode(){
    const squares = (offset(InitializeGame()));
    const gameController = new GameController(squares);
    gameController.setMatrix(squares);
    setSquares(squares);
    setMoves(0);
    setSeconds(0);
    setIsActive($('#pause-btn').hasClass('disabled') ? false : true);
  }

  const gameController = new GameController(squares);
  gameController.setMatrix(squares);

  return (
    <div className="App">
      <WinModal time={seconds} moves={moves} PlayAgain={()=>ResetGame(null)}/>
      <NavBar seconds={seconds} setSeconds={setSeconds} moves={moves} setMoves={setMoves} isActive={isActive} setIsActive={setIsActive} GenerateGame={ResetGame} StartEasyMode={StartEasyMode} />
      <Header moves={moves} />
      <Grid id={'grid'} setIsActive={setIsActive} squares={squares} setSquares={setSquares} game={gameController} setMoves={setMoves} moves={moves}/>
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

function offset(squares){
  let offSetVar = Math.floor(Math.random() * 2);
  if(offSetVar === 1){
    [squares[15].id, squares[14].id] = [squares[14].id, squares[15].id]
  } else {
    for(let i = squares.length - 1; i > 12; i--){
      [squares[i].id, squares[i-1].id] = [squares[i-1].id, squares[i].id]
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

export default App;

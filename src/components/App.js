import React, {useEffect, useState} from 'react';
import '../styles/App.css';
import Grid, { setBoardStatus } from './Grid';
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

    function HardGame() {

        const squares = (shuffle(InitializeGame()));


        $('#difficulty-toggle').removeClass('disabled');
        $('#difficulty-toggle').removeClass('btn-success');
        $('#difficulty-toggle').addClass('btn-danger');
        $('#difficulty-toggle').text('Hard Mode');

        return squares;
    }

    function EasyGame() {

        const squares = (offset(InitializeGame()));

        $('#difficulty-toggle').removeClass('disabled');
        $('#difficulty-toggle').addClass('btn-success');
        $('#difficulty-toggle').removeClass('btn-danger');
        $('#difficulty-toggle').text('Easy Mode');

        return squares;
    }

    function ResetGame() {

        $('#modal').css('display', 'none');
        let squares;

        if ($('#difficulty-toggle').hasClass('btn-success')) {
            squares = EasyGame();
        } else {
            squares = HardGame();
        }

        const gameController = new GameController(squares);

        gameController.setMatrix(squares);
        setSquares(squares);
        setMoves(0);
        setSeconds(0);
        setIsActive(false);

        $('#pause-btn').text('Resume');
        $('#pause-btn').addClass('disabled');
        $('#pause-btn').addClass('paused');
        $('#pause-btn').removeClass('playing');

        $('#game-btn').removeClass('running');
        $('#game-btn').addClass('idle');
        $('#game-btn').text('Start Game');

        setBoardStatus(false);
    }

    function ToggleMode() {
        if (!$('#difficulty-toggle').hasClass('disabled'))
            if ($('#difficulty-toggle').hasClass('btn-danger')) {
                $('#difficulty-toggle').removeClass('btn-danger').addClass('btn-success');
                ResetGame();
            } else {
                $('#difficulty-toggle').removeClass('btn-success').addClass('btn-danger');
                ResetGame();
            }
    }

    const gameController = new GameController(squares);
    gameController.setMatrix(squares);

    return (
        <div className="App">
            <WinModal time={seconds} moves={moves} PlayAgain={() => ResetGame()}/>
            <NavBar seconds={seconds} setSeconds={setSeconds} moves={moves} setMoves={setMoves} isActive={isActive}
                    setIsActive={setIsActive} GenerateGame={ResetGame} ToggleMode={ToggleMode}/>
            <Header moves={moves}/>
            <Grid id={'grid'} setIsActive={setIsActive} squares={squares} setSquares={setSquares} game={gameController}
                  setMoves={setMoves} moves={moves}/>
            <Footer/>
        </div>
    );
}

function InitializeGame() {
    let yPos = 0;
    let squares = [];

    for (let i = 0; i < 16; i++) {

        let id = (i !== 15) ? i + 1 : -1;
        let xPos = i % 4;
        if (i > 0 && xPos === 0)
            yPos++;

        squares[i] = {
            id,
            xPos,
            yPos
        }
    }
    return squares;
}

function offset(squares) {
    let offSetVar = Math.floor(Math.random() * 2);
    if (offSetVar === 1) {
        [squares[15].id, squares[14].id] = [squares[14].id, squares[15].id]
    } else {
        for (let i = squares.length - 1; i > 12; i--) {
            [squares[i].id, squares[i - 1].id] = [squares[i - 1].id, squares[i].id]
        }
    }
    return squares;
}

function shuffle(squares) {
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

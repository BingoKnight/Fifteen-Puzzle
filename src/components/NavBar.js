import React, {useEffect} from 'react';
import '../styles/index.css';
import { setBoardStatus } from './Grid';
const $ = require('jquery');

// TODO: send move count and timer to win on win
// TODO: pause timer on win
// TODO: reset timer on new game from win
function NavBar(props){

    

    function ToggleGame(){
        if($('#game-btn').hasClass('idle')){
            $('#game-btn').removeClass('idle');
            $('#game-btn').addClass('running');
            $('#game-btn').text('End Game');
            TogglePause('play');
            setBoardStatus(true);
            props.setIsActive(true);
        } else {
            $('#game-btn').removeClass('running');
            $('#game-btn').addClass('idle');
            $('#game-btn').text('Start Game');
            TogglePause('pause');
            props.setSeconds(0);
            props.setMoves(0);
            setBoardStatus(false);
            props.setIsActive(false);
            props.GenerateGame();
        }
    }

    function TogglePause(status){
        if(status){
            if(status === 'play'){
                $('#pause-btn').removeClass('disabled');
                $('#pause-btn').removeClass('paused');
                $('#pause-btn').addClass('playing');
                $('#pause-btn').text('Pause');
                props.setIsActive(true);
                setBoardStatus(true);
            } else {
                $('#pause-btn').addClass('disabled');
                $('#pause-btn').addClass('paused');
                $('#pause-btn').removeClass('playing');
                $('#pause-btn').text('Resume');
                props.setIsActive(false);
                setBoardStatus(false);
            }
        } else if(!$('#pause-btn').hasClass('disabled')) {
            if($('#pause-btn').hasClass('paused')){
                $('#pause-btn').removeClass('paused');
                $('#pause-btn').addClass('playing');
                $('#pause-btn').text('Pause');
                props.setIsActive(true);
                setBoardStatus(true);
            } else {
                $('#pause-btn').addClass('paused');
                $('#pause-btn').removeClass('playing');
                $('#pause-btn').text('Resume');
                props.setIsActive(false);
                setBoardStatus(false);
            }
        }
    }

    return(
        <nav className="navbar navbar-expand-xl align-content-end" id={"navbar"}>
            <div className="container-fluid">
                <ul className="nav navbar-nav" id={"action-buttons"}>
                    <li><button id={'game-btn'} className="btn btn-primary idle" onClick={()=>ToggleGame()}>Start Game</button></li>
                    <li><button id={'pause-btn'} className="btn btn-secondary paused disabled" onClick={()=>TogglePause(null)}>Resume</button></li>
                    <li><button id={'easy-btn'} className="btn btn-success" onClick={props.StartEasyMode}>Easy Mode</button></li>
                </ul>
                <ul className="nav navbar-nav navbar-right" id={"counters"}>
                    <li>Moves:<span>{props.moves}</span></li>
                    <li>Timer:<span>{props.seconds}</span></li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
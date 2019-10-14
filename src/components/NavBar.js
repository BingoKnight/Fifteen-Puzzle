import React, {useState, useEffect, useRef} from 'react';
import '../styles/index.css';
const $ = require('jquery');

// TODO: move count
// TODO: send move count and timer to win on win
// TODO: pause timer on win
// TODO: reset game on start
function NavBar(props){

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

    function ToggleGame(){
        if($('#game-btn').hasClass('idle')){
            $('#game-btn').removeClass('idle');
            $('#game-btn').addClass('running');
            $('#game-btn').text('End Game');
            TogglePause('play');
            setIsActive(true);
        } else {
            $('#game-btn').removeClass('running');
            $('#game-btn').addClass('idle');
            $('#game-btn').text('Start Game');
            TogglePause('pause');
            setSeconds(0);
            setIsActive(false);
        }
    }

    function TogglePause(status){
        if(status){
            if(status === 'play'){
                $('#pause-btn').removeClass('disabled');
                $('#pause-btn').removeClass('paused');
                $('#pause-btn').addClass('playing');
                $('#pause-btn').text('Pause');
                setIsActive(true);
            } else {
                $('#pause-btn').addClass('disabled');
                $('#pause-btn').addClass('paused');
                $('#pause-btn').removeClass('playing');
                $('#pause-btn').text('Resume');
                setIsActive(false);
            }
        } else if(!$('#pause-btn').hasClass('disabled')) {
            if($('#pause-btn').hasClass('paused')){
                $('#pause-btn').removeClass('paused');
                $('#pause-btn').addClass('playing');
                $('#pause-btn').text('Pause');
                setIsActive(true);
            } else {
                $('#pause-btn').addClass('paused');
                $('#pause-btn').removeClass('playing');
                $('#pause-btn').text('Resume');
                setIsActive(false);
            }
        }
    }

    return(
        <nav className="navbar navbar-expand-xl align-content-end" id={"navbar"}>
            <div className="container-fluid">
                <ul className="nav navbar-nav" id={"action-buttons"}>
                    <li><button id={'game-btn'} className="btn btn-primary idle" onClick={()=>ToggleGame()}>Start Game</button></li>
                    <li><button id={'pause-btn'} className="btn btn-secondary paused disabled" onClick={()=>TogglePause(null)}>Resume</button></li>
                </ul>
                <ul className="nav navbar-nav navbar-right" id={"counters"}>
                    <li>Moves:<span>{props.moves}</span></li>
                    <li>Timer:<span>{seconds}</span></li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
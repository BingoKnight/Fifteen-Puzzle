import React from 'react';
import '../styles/index.css';

function WinModal(props) {
    return(
        <div id={"modal"}>
            <div id={"modal-container"}>
                <div id={"modal-header"}>
                    Congrats, You Win!
                </div>
                <div id={"modal-content"}>
                  You did it in {props.moves} moves!<br />
                  It took you {props.time} seconds!
                </div>
                <div id={"model-footer"}>
                  <button className="btn btn-primary" onClick={props.PlayAgain}>Play Again</button>
                </div>
            </div>
        </div>
    )
}

export default WinModal;
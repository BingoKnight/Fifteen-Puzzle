import React from 'react';
import '../styles/index.css';

//TODO: add move count and completion time to modal
function WinModal(props) {

    return(
        <div id={"modal"}>
            <div id={"modal-container"}>
                <div id={"modal-header"}>
                    Congrats, You Win!
                </div>
                <div id={"modal-content"}>
                    <button className="btn btn-primary" onClick={props.PlayAgain}>Play Again</button>
                </div>
            </div>
        </div>
    )
}

export default WinModal;
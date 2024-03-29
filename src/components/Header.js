import React from 'react';
import '../styles/index.css';

function Header() {
    return (
        <div>
            <div id="container">
                <h2>Fifteen Puzzle</h2>
                <div id="instructions">
                    The goal of this game is to get the numbers positioned in order but you can only move pieces
                    into the empty space. You win the game when all pieces are in order and the empty space is at
                    the end. As you progress through the game pieces will turn blue if they are in the right spot
                    or become orange if they are not.
                </div>
            </div>
        </div>
    );
}

export default Header
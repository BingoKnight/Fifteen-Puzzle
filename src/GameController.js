import React, { Component } from 'react';

class GameController extends Component{

    constructor(matrix){
        super(matrix);
         this.state ={
             matrix
         };
    };

    UpdateMatrix = (clicked, empty) => { // some values not in right spot, could be initialization
        [this.state.matrix[clicked], this.state.matrix[empty]] = [this.state.matrix[empty], this.state.matrix[clicked]];
        console.log(this.state.matrix);
    }
}

export default GameController;
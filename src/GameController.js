const $ = require('jquery');

export default class GameController {

    constructor(props){
        this.state = {
            matrix: this.setMatrix(props),
            status: false
        }
    }

    UpdateMatrix = (clicked, empty) => { // some values not in right spot, could be initialization
        [this.state.matrix[clicked], this.state.matrix[empty]] = [this.state.matrix[empty], this.state.matrix[clicked]];

        if(this.isGameWon()){
            $('#modal').css('display', 'block');
        }
    }

    setMatrix = squares => {
        let matrix = []
        squares.forEach(square => {
            matrix.push(square.id);
        });
        return matrix;
    }

    isGameWon = () =>{
        let status = true;
        this.state.matrix.forEach((id, index) => {
            if(index + 1 !== id && index < 15) {
                status =  false;
            }
        });
        this.state.status = status;
        return status;
    }

    isAdjacent = (clicked, empty) =>{
        let adjacents = [empty - 1, empty + 1, empty - 4, empty + 4]

        let i = adjacents.length;
        while(i--){
            if(adjacents[i] < 0 || adjacents[i] > 15)
                adjacents.splice(i, 1);
        }

        return adjacents.includes(clicked);
    }

    GameIsRunning = () =>{
        return this.state.status;
    }
}
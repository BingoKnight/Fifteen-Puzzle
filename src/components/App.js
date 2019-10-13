import React from 'react';
import '../styles/App.css';
import Grid from './Grid';
import Header from './Header';
import Footer from './Footer';

function App() {

  let squares = [];

  let yPos = 0;

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

  squares = shuffle(squares);

  return (
    <div className="App">
      <Header />
      <Grid id={'grid'} squares={squares} />
      <Footer />
    </div>
  );
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

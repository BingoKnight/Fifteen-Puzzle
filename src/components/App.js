import React from 'react';
import '../styles/App.css';
import Grid from './Grid';
import Header from './Header';
import Footer from './Footer';

function App() {

  let squares = [];

  let yPos = 0;

  for(let i = 0; i < 15; i++){

    let id = i + 1;
    let xPos = i % 4;
    if(i > 0 && xPos == 0)
      yPos++;

    squares[i] = {
      id,
      xPos,
      yPos
    }
  }

  return (
    <div className="App">
      <Header />
      <Grid squares={squares} />
      <Footer />
    </div>
  );
}

export default App;

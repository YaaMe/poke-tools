import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './custom.css';
import { ThemeProvider, Button } from 'react-bootstrap';
import { BattlePokedex } from './tools/data/pokedex';
import { findDex } from './tools/dex';


function App() {
  const target = 'blastoise';
  // console.log(BattlePokedex[target])
  console.log(findDex(target));
  return (
    <div className="App">
      item make & dex show
      <Button variant="ice">test</Button>
    </div>
  );
}

export default App;

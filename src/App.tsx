import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BattlePokedex } from './tools/data/pokedex';
import { findDex } from './tools/dex';


function App() {
  const target = 'blastoise';
  // console.log(BattlePokedex[target])
  console.log(findDex(target));
  return (
    <div className="App">
      item make & dex show
    </div>
  );
}

export default App;

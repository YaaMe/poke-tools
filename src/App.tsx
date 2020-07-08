import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './custom.css';
import {
  Button,
  ProgressBar,
  Badge
} from 'react-bootstrap';
import { BattlePokedex } from './tools/data/pokedex';
import { findDex } from './tools/dex';
import Cramo from './containers/Cramo';

/* <Button variant="bug">test button</Button>
 * <Badge variant="bug">test badge</Badge>
 * <ProgressBar striped variant="success" now={50}/>
 * <ProgressBar striped variant="dragon" now={50}/>
 * <ProgressBar variant="ice" now={50}/> */
function App() {
  const target = 'blastoise';
  // console.log(BattlePokedex[target])
  console.log(findDex(target));
  return (
    <div className="App">
      <Cramo/>
    </div>
  );
}

export default App;

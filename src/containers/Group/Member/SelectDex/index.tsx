import React from 'react';
import { Table } from 'react-bootstrap';

const url = `url(https://play.pokemonshowdown.com/sprites/pokemonicons-sheet.png?v2) no-repeat scroll -0px -0px`

const mapDexSum = () => {
  return (
    <tr>
      <td>1</td>
      <td>1</td>
      <td>2 3</td>
      <td>1</td>
      <td>2</td>
      <td>3</td>
      <td>4</td>
      <td>5</td>
      <td>6</td>
      <td>10</td>
    </tr>
  )
}

const SelectDex = () => {
  const dexs = [0,0,0,0];
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>name</th>
            <th>types</th>
            <th>abilities</th>
            <th>HP</th>
            <th>Atk</th>
            <th>Def</th>
            <th>SpA</th>
            <th>SpD</th>
            <th>Spe</th>
            <th>BST</th>
          </tr>
        </thead>
        <tbody>
          {dexs.map(dex => mapDexSum(dex))}
        </tbody>
      </Table>
    </div>
  )
}

export default SelectDex;

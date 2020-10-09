import React from 'react';
import { Table } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { findDex, getSwShDex } from 'tools/dex';
import {BattlePokedex} from 'tools/data/pokedex';
import { Dex } from 'tools/sim/dex';
// import { Dex, toID } from 'tools/battle-dex';
const toID = Dex.getId;

const url = `url(https://play.pokemonshowdown.com/sprites/pokemonicons-sheet.png?v2) no-repeat scroll -0px -0px`
const resourcePrefix = 'https://play.pokemonshowdown.com/';

const getPokeIconNum = (id, isFemale, facingLeft) => {
  let num = 0;
  num = findDex(id).num;
  if (num < 0 || num > 890) num = 0;
  /* if (isFemale) {
		 if (['unfezant', 'frillish', 'jellicent', 'meowstic', 'pyroar'].includes(id)) {
		 num = BattlePokemonIconIndexes[id + 'f'];
		 }
	   }
	   if (facingLeft) {
		 if (BattlePokemonIconIndexesLeft[id]) {
		 num = BattlePokemonIconIndexesLeft[id];
		 }
	   } */
  return num;
}
const getPokeIcon = (id) => {
  let num = getPokeIconNum(id);
  let top = Math.floor(num / 12) * 30;
	let left = (num % 12) * 40;
  // let fainted = ((pokemon as Pokemon | ServerPokemon)?.fainted ? `;opacity:.3;filter:grayscale(100%) brightness(.5)` : ``);
  // return `background:transparent url(${Dex.resourcePrefix}sprites/pokemonicons-sheet.png?g8) no-repeat scroll -${left}px -${top}px${fainted}`;
  return `transparent url(${resourcePrefix}sprites/pokemonicons-sheet.png?v2) no-repeat scroll -${left}px -${top}px`;
}


const mapDexSummary = (pokemon) => {
  const id = toID(pokemon.name)
  const x = pokemon.abilities[0];// TODO 0 1 H S
  const h = pokemon.abilities.H;
  const { hp, atk, def, spa, spd, spe } = pokemon.baseStats;

  return (
    <tr>
      <td style={{display: 'flex'}}><span style={{
        display: 'inline-block',
        height: '30px',
        width: '40px',
        background: getPokeIcon(id)}}/><label>{pokemon.name}</label></td>
      <td>{pokemon.types}</td>
      <td>{x} {h}</td>
      <td>{hp}</td>
      <td>{atk}</td>
      <td>{def}</td>
      <td>{spa}</td>
      <td>{spd}</td>
      <td>{spe}</td>
      <td>{hp + atk + def + spa + spd + spe}</td>
    </tr>
  )
}


const SelectDex = () => {
  // getPokemonIconNum
  // const team = ['venusaur']
  // const dex = findDex('venusaur');
  // const list = [dex, dex, dex, dex];
  const list = getSwShDex();
  const columns = [{
    dataField: 'name',
    text: 'name',
    formatter: (name, row) => {
      const id = toID(name)
      return (
        <div>
          <span style={{
            display: 'inline-block',
            height: '30px',
            width: '40px',
            background: getPokeIcon(id)}}/><label>{name}</label>
        </div>
      )
    }
  }, {
    dataField: 'types',
    text: 'types',
  }, {
    dataField: 'abilities',
    text: 'abilities',
    formatter: (abilities, pokemon) => {
      const x = abilities[0];// TODO 0 1 H S
      const h = abilities.H;
      return (<span>{x} {h}</span>)
    }
  }, {
    dataField: 'baseStats.hp',
    text: 'HP',
  }, {
    dataField: 'baseStats.atk',
    text: 'Atk',
  }, {
    dataField: 'baseStats.def',
    text: 'Def',
  }, {
    dataField: 'baseStats.spa',
    text: 'SpA',
  }, {
    dataField: 'baseStats.spd',
    text: 'SpD',
  }, {
    dataField: 'baseStats.spe',
    text: 'Spe',
  }, {
    dataField: 'baseStats',
    text: 'BST',
    formatter: (baseStats, row) => {
      const { hp, atk, def, spa, spd, spe } = baseStats;
      return <span>{hp + atk + def + spa + spd + spe}</span>
    }
  }];
  // let num = dex.num;
  // console.log(getPokeIcon(toID(dex.name)))
  return (
    <BootstrapTable bootstrap4 keyField="name" data={list} columns={ columns }/>
  )
  /* return (
   *   <div>
   *     <Table>
   *       <thead>
   *         <tr>
   *           <th>name</th>
   *           <th>types</th>
   *           <th>abilities</th>
   *           <th>HP</th>
   *           <th>Atk</th>
   *           <th>Def</th>
   *           <th>SpA</th>
   *           <th>SpD</th>
   *           <th>Spe</th>
   *           <th>BST</th>
   *         </tr>
   *       </thead>
   *       <tbody>
   *         {list.map(dex => mapDexSummary(dex))}
   *       </tbody>
   *     </Table>
   *   </div>
   * ) */
}

export default SelectDex;

import React, {Fragment, useState} from 'react';
import {
  ButtonGroup,
  Button,
  Table
} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { findDex, getSwShDex } from 'tools/dex';
import { BattlePokedex } from 'tools/data/pokedex';
import { Dex } from 'tools/sim/dex';
// import { Dex, toID } from 'tools/battle-dex';
import { type_order, resourcePrefix } from 'tools/constants';
const toID = Dex.getId;

const Type = ({type}) => (<img src={`${resourcePrefix}/sprites/types/${type}.png`}/>);
const TypeFilter = ({type}) => {
  return (<div><Type type={type}/></div>)
}


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

const bst = ({hp, atk, def, spa, spd, spe}) => (hp + atk + def + spa + spd + spe);

const SelectDex = () => {
  // getPokemonIconNum
  let list = getSwShDex();
  const [isAndLogic, setLogic] = useState(true);
  const [type_filter, setFilter] = useState([]);
  const [sortInfo = [], setSortInfo] = useState([]);
  const [sortAttr = 'num', isAsc] = sortInfo;
  const markInfo = (attr) => setSortInfo([attr, sortAttr === attr ? !isAsc : true]);
  const switchFilter = (type) => {
    let i = type_filter.indexOf(type);
    if (i > -1) {
      type_filter.splice(i, 1);
      setFilter([...type_filter]);
    } else {
      setFilter([...type_filter, type]);
    }
  }

  // let num = dex.num;
  // console.log(getPokeIcon(toID(dex.name)))
  if (type_filter.length) {
    list = list.filter(dex => {
      let flag = false;
      if (isAndLogic) {
        if (type_filter.length > 2) return false;
        if (type_filter.length === 2) {
          return dex.types.includes(type_filter[0]) && dex.types.includes(type_filter[1]);
        }
      }
      dex.types.forEach(type => {
        if (type_filter.includes(type)) {
          flag = true;
        }
      });
      return flag;
    })
  }
  list.sort((a, b) => {
    if (sortAttr === 'num') {
      return (b[sortAttr] - a[sortAttr]) * (isAsc ? 1 : -1);
    }
    if (sortAttr === 'bst') {
      return (bst(b.baseStats) - bst(a.baseStats)) * (isAsc ? 1 : -1);
    }
    return (b.baseStats[sortAttr] - a.baseStats[sortAttr]) * (isAsc ? 1 : -1);
  });

  return (
    <Fragment>
      <div style={{display: 'flex'}}>
        <Button variant="outline-primary"
                onClick={e => setLogic(!isAndLogic)}
        >{isAndLogic ? "&&" : "||" }filters:</Button>
        {type_filter.map(type => (
          <div style={{
            height: '14px',
            padding: '0 5px',
          }}
               onClick={e => switchFilter(type)}>
            <Type type={type}/>
          </div>))}{type_filter.length ? <span> | </span> : <span/>}
        {type_order
          .filter(type => !type_filter.includes(type))
          .map(type => (
            <div style={{
              height: '14px',
              padding: '0 5px',
              filter: 'grayscale(1)',
            }}
                 onClick={e => switchFilter(type)}>
              <Type type={type}/>
            </div>))}
      </div>
      <div>
        <Table>
          <thead>
            <tr>
              <th onClick={e => markInfo('num')}>name</th>
              <th>types</th>
              <th>abilities</th>
              <th onClick={e => markInfo('hp')}>HP</th>
              <th onClick={e => markInfo('atk')}>Atk</th>
              <th onClick={e => markInfo('def')}>Def</th>
              <th onClick={e => markInfo('spa')}>SpA</th>
              <th onClick={e => markInfo('spd')}>SpD</th>
              <th onClick={e => markInfo('spe')}>Spe</th>
              <th onClick={e => markInfo('bst')}>BST</th>
            </tr>
          </thead>
          <tbody>
            {list.map(dex => mapDexSummary(dex))}
          </tbody>
        </Table>
      </div>
    </Fragment>
  )
        }
  // <BootstrapTable bootstrap4 keyField="name" data={list} columns={ columns }/>
  /* const columns = [{
   *   dataField: 'name',
   *   text: 'name',
   *   formatter: (name, row) => {
   *     const id = toID(name)
   *     return (
   *       <div>
   *         <span style={{
   *           display: 'inline-block',
   *           height: '30px',
   *           width: '40px',
   *           background: getPokeIcon(id)}}/><label>{name}</label>
   *       </div>
   *     )
   *   }
   * }, {
   *   dataField: 'types',
   *   text: 'types',
   *   formatter: (types, row) => {
   *     return (
   *       <div>
   *         {types.map(type => (<Type type={type}/>))}
   *       </div>
   *     )
   *   },
   *   headerEvents: {
   *     onClick: (e, column, index) => {
   * 
   *     }
   *   },
   * }, {
   *   dataField: 'abilities',
   *   text: 'abilities',
   *   formatter: (abilities, pokemon) => {
   *     const x = abilities[0];// TODO 0 1 H S
   *     const h = abilities.H;
   *     return (<span>{x} {h}</span>)
   *   },
   *   headerEvents: {
   *     onClick: (e, column, index) => {
   *     }
   *   },
   * }, {
   *   dataField: 'baseStats.hp',
   *   text: 'HP',
   *   sort: true,
   * }, {
   *   dataField: 'baseStats.atk',
   *   text: 'Atk',
   *   sort: true,
   * }, {
   *   dataField: 'baseStats.def',
   *   text: 'Def',
   *   sort: true,
   * }, {
   *   dataField: 'baseStats.spa',
   *   text: 'SpA',
   *   sort: true,
   * }, {
   *   dataField: 'baseStats.spd',
   *   text: 'SpD',
   *   sort: true,
   * }, {
   *   dataField: 'baseStats.spe',
   *   text: 'Spe',
   *   sort: true,
   * }, {
   *   dataField: 'baseStats',
   *   text: 'BST',
   *   sort: true,
   *   sortFunc: (a, b, order, dataField) => {
   *     return order === 'asc' ? bst(b) - bst(a) : bst(a) - bst(b);
   *   },
   *   formatter: (baseStats, row) => {
   *     let { hp, atk, def, spa, spd, spe } = baseStats;
   *     return <span>{hp + atk + def + spa + spd + spe}</span>
   *   }
   * }]; */
  export default SelectDex;

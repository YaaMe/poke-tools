import React, {Fragment, useState} from 'react';
import {
  ButtonGroup,
  Button,
  InputGroup,
  Form,
  FormControl,
  Table
} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { Type } from 'components';
import { findDex, getSwShDex } from 'tools/dex';
import { BattlePokedex } from 'tools/data/pokedex';
import { Dex } from 'tools/sim/dex';
import { getPokeIcon, toPokeID } from 'tools/tricks';
import { type_order } from 'tools/constants';


const TypeFilter = ({type}) => {
  return (<div><Type type={type}/></div>)
}


const mapDexSummary = (pokemon, onSelect) => {
  const id = toPokeID(pokemon.name)
  const x = pokemon.abilities[0];// TODO 0 1 H S
  const h = pokemon.abilities.H;
  const { hp, atk, def, spa, spd, spe } = pokemon.baseStats;

  return (
    <tr onClick={e => onSelect({dex: pokemon, detail: {}})}>
      <td style={{display: 'flex'}}><span style={{
        display: 'inline-block',
        height: '30px',
        width: '40px',
        background: getPokeIcon(id, pokemon.num)}}/><label>{pokemon.name}</label></td>
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

const SelectDex = ({ onSelect }) => {
  // getPokemonIconNum
  let list = getSwShDex();
  const [isAndLogic, setLogic] = useState(true);
  const [type_filter, setFilter] = useState([]);
  const [search, setSearch] = useState('');
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

  const onSearch = e => {
    console.log(e.target.value);
    setSearch(e.target.value);
  }

  // let num = dex.num;
  if (type_filter.length || search !== '') {
    list = list.filter(dex => {
      const filter_on_type = function(dex, type_filter) {
        if (!type_filter.length) return true;
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
      }
      const filter_on_search = function(dex, search) {
        if(!search) return true;
        return dex.name.toLowerCase().includes(search.toLowerCase())
            || JSON.stringify(dex.abilities).toLowerCase().includes(search.toLowerCase())
      }
      let flag = filter_on_search(dex, search);
      console.log(flag);
      if (flag) {
        flag = filter_on_type(dex, type_filter);
      }
      return flag
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
      <div>
        <InputGroup className="mb-3">
          <FormControl
            controlid="search"
            placeholder="search pokemon name or abilities"
            onChange={onSearch}
          />
        </InputGroup>
      </div>
      <div style={{display: 'flex'}}>
        <Form.Check
          type="switch"
          id="filter_type"
          label={`${isAndLogic ? 'match' : 'include'} type: `}
          value={isAndLogic}
          onChange={e => setLogic(!isAndLogic)}
        />
        {/* <Button variant="outline-primary"
            onClick={e => setLogic(!isAndLogic)}
            >{isAndLogic ? "&&" : "||" }filters:</Button> */}
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
            {list.map(dex => mapDexSummary(dex, onSelect))}
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

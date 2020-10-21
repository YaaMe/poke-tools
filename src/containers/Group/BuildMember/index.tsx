import React, { Fragment, useReducer } from 'react';
import {
  Row, Col,
  Button
} from 'react-bootstrap';
import InfoArea from './InfoArea';
import DexInfo from './DexInfo';
import { BattlePokedex } from 'tools/data/pokedex';
import { findDex } from 'tools/dex';
import { Dex } from 'tools/sim/dex';
import { getPokeIcon, toPokeID } from 'tools/tricks';

const reducer = function(state, action) {
  switch (action.type) {
    case 'select': return {
      ...state,
      index: action.data,
      info: {
        page: '',
      },
    }
    case 'update':
      state.members[state.index] = action.data;
      return {...state};
    case 'info':
      return {...state, info: action.data };
    default: return state;
  }
  return state
}
const mapMember = (member, i, onSelect) => {
  if (member) {
    const id = toPokeID(member.name);
    return <Button variant="outline-primary" onClick={e => onSelect(i)}>
      <div style={{
        display: 'inline-block',
        height: '30px',
        width: '40px',
        background: getPokeIcon(id, member.num)
      }}></div>
    </Button>
  }
  return <Button variant="outline-primary" onClick={e => onSelect(i)}>
    <div style={{
      height: '30px',
      width: '40px',
    }}>+</div>
  </Button>
}

const BuildMember = () => {
  const target = 'blastoise';
  // console.log(BattlePokedex[target])
  const targets = ['blastoise', 'venusaur', 'butterfree', 'beedrill', '', '']
  let team = targets.map(id => ({
    detail: {},
    dex: findDex(id)
  }));
  const [{index, members, info}, dispatch] = useReducer(reducer, {
    index: 0,
    info: {
      page: ''
    },
    members: team,
  })

  const switchInfo = data => dispatch({type: 'info', data})
  const onSelect = data => {
    dispatch({type: 'select', data});
  }
  const onUpdateMember = data => {
    dispatch({type: 'update', data});
  }

  return (
    <Fragment>
      <Row>
        <Col md={{span: 12}}>
          {members.map((member, i) => mapMember(member.dex, i, onSelect))}
        </Col>
      </Row>
      <DexInfo member={members[index]} updateMember={onUpdateMember} switchInfo={switchInfo} />
      <Row>
        <Col>
          <InfoArea member={members[index]} info={info} updateMember={onUpdateMember}/>
        </Col>
      </Row>
    </Fragment>
  )
}

export default BuildMember;

import React, {Fragment, useState, useReducer} from 'react';
import {
  Container,
  Row, Col,
  Button
} from 'react-bootstrap';
import Member from './Member';
import { BattlePokedex } from 'tools/data/pokedex';
import { findDex } from 'tools/dex';
import { Dex } from 'tools/sim/dex';
import {PokemonRanking} from './Env';
import { getPokeIcon } from 'tools/tricks';
const toID = Dex.getId;

const mapMember = (member, i, onSelect) => {
  if (member) {
    const id = toID(member.name);
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

const reducer = function(state, action) {
  switch (action.type) {
    case 'select': return {
      ...state,
      index: action.data,
    }
    case 'update':
      state.members[state.index] = action.data;
      return {...state};
    default: return state;
  }
  return state
}

const Group = () => {
  const target = 'blastoise';
  // console.log(BattlePokedex[target])
  const targets = ['blastoise', 'venusaur', 'butterfree', 'beedrill', '', '']
  let team = targets.map(id => findDex(id));
  const [{index, members}, dispatch] = useReducer(reducer, {
    index: 0,
    members: team
  })

  const onSelect = data => {
    dispatch({type: 'select', data});
  }
  const onUpdateMember = data => {
    dispatch({type: 'update',data});
  }

  return (
    <Container fluid={true}>
      <Row style={{paddingTop: 10}}>
        <Col md={{span: 3, offset: 0}}><PokemonRanking /></Col>
        <Col md={{span: 6, offset: 0}}>
          <Row>
            <Col>
              {members.map((member, i) => mapMember(member, i, onSelect))}
            </Col>
          </Row>
          <Row>
            <Col>
              <Member dex={members[index]} onSelect={onUpdateMember}/>
            </Col>
          </Row>
        </Col>
        <Col md={{span: 3, offset: 0}}>anlyz</Col>
      </Row>
    </Container>
  );
}

export default Group;

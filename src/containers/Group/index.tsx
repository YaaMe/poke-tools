import React, {Fragment, useState} from 'react';
import {
  Container,
  Row, Col,
  Button
} from 'react-bootstrap';
import Member from './Member';
import { BattlePokedex } from 'tools/data/pokedex';
import { findDex } from 'tools/dex';
import {PokemonRanking} from './Env';

const mapMember = (member, onSelect) => {
  return <Button variant="outline-primary" onClick={e => onSelect(member)}>+</Button>
}

const Group = () => {
  const target = 'blastoise';
  // console.log(BattlePokedex[target])
  const targets = ['blastoise', 'venusaur', 'butterfree', 'beedrill', '', '']
  console.log(findDex(target));
  let members = targets.map(id => findDex(id));
  const [dex, setDex] = useState(undefined);

  const onSelect = m => setDex(m);
  return (
    <Container>
      <Row>
        <Col md={{span: 1, offset: 0}}><PokemonRanking /></Col>
        <Col md={{span: 10, offset: 0}}>
          <Row>
            <Col>
              {members.map(member => mapMember(member, onSelect))}
            </Col>
          </Row>
          <Row>
            <Col>
              <Member dex={dex} />
            </Col>
          </Row>
        </Col>
        <Col md={{span: 1, offset: 0}}>anlyz</Col>
      </Row>
    </Container>
  );
}

export default Group;

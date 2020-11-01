import React from 'react';
import {
  Container,
  Row, Col,
} from 'react-bootstrap';
import { PokemonRanking } from './Ranking';
import BuildMember from './BuildMember';


const Group = () => {
  return (
    <Container fluid={true}>
      <Row style={{paddingTop: 10}}>
        <Col md={{span: 3, offset: 0}}>
          <PokemonRanking />
        </Col>
        <Col md={{span: 6, offset: 0}}>
          <BuildMember/>
        </Col>
        <Col md={{span: 3, offset: 0}}>anlyz</Col>
      </Row>
    </Container>
  );
}

export default Group;

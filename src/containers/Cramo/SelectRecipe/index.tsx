import React, {useState} from 'react';
import {
  Container,
  Row, Col,
  InputGroup,
  FormControl,
  ListGroup,
  Button,
  ProgressBar,
} from 'react-bootstrap';

const md = {
  span: 4,
  offset: 4
}

import cram_table from 'tools/data/cram_table';

const type_order = [
  'Normal',
  'Psychic',
  'Fighting',
  'Poison',
  'Rock',
  'Steel',
  'Water',
  'Electric',
  'Grass',
  'Bug',
  'Fire',
  'Ghost',
  'Ice',
  'Dark',
  'Dragon',
  'Flying',
  'Ground',
  'Fairy',
];

let recipes = [];
type_order.forEach(type => recipes = [
  ...recipes, ...cram_table[type].map(item => ({...item, type: type.toLowerCase()}))
]);

const renderItem = (item, onSelect, i) => {
  const {
    type,
    img_url,
    item_name,
    tr_name, tr_no
  } = item;
  return (
    <ListGroup.Item key={i} action
                    variant={type} onClick={e => onSelect(item)}>
      {item_name || tr_name}
    </ListGroup.Item>
  )
};

const SelectRecipe = ({onSelect}) => {
  return (
    <Container>
      <Row>
        <Col md={md}>
          table
        </Col>
      </Row>
      <Row>
        <Col md={md}>
          {/* <InputGroup className="mb-3">
              <FormControl
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              />
              <InputGroup.Append>
              <Button variant="outline-secondary">Search</Button>
              </InputGroup.Append>
              </InputGroup> */}
        </Col>
      </Row>
      <Row>
        <Col md={md}>
          <ListGroup>
            {recipes.map((recipe, i) => renderItem(recipe, onSelect, i))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
};

export default SelectRecipe;

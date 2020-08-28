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
  const [{target}, setTarget] = useState({target: ''});
  const onChange = e => {
    setTarget({target: e.target.value})
  }
  let filterRecipes = recipes;
  if (target) {
    filterRecipes = recipes.filter(recipe => JSON.stringify(recipe).includes(target))
  }
  return (
    <Container>
      <Row>
      </Row>
      <Row>
        <Col md={md}>
          <InputGroup className="mb-3">
            <FormControl
              controlid="item"
              placeholder="search item name"
              onChange={onChange}
            >
            </FormControl>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col md={md}>
          <ListGroup>
            {filterRecipes.map((recipe, i) => renderItem(recipe, onSelect, i))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
};

export default SelectRecipe;

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
  span: 10,
  offset: 2
}
const lf = {
  span: 2,
}
import cram_point from '../../tools/data/cram_point';
import cram_table from '../../tools/data/cram_table';

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
let recipes_point = [];
type_order.forEach(type => recipes_point = [
  ...recipes_point, ...cram_point[type].map(item => ({...item, type: type.toLowerCase()}))
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
const renderRecipe = (item, onSelect, i) => {
  const {
    type,
    img_url,
    name,
    point,
  } = item;
  return (
    <ListGroup.Item key={i} action
                    variant={type} onClick={e => onSelect(item)}>
      {name}: {point}
    </ListGroup.Item>
  )
};

const SelectRecipe = ({recipes, onSelect}) => {
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

const CookRecipe = ({recipe = {}}) => {
  const { type, hit_range: [min, max] } = recipe;
  let [stack, setStack] = useState([]);
  let sum_point = 0;
  stack.forEach(({point}) => sum_point += point);
  const onSelect = (recipe) => {
    if (stack.length < 4) {
      setStack([...stack, recipe]);
    }
  };
  const onCancel = (target) => {
    setStack(stack.filter(recipe => recipe.name !== target.name));
  }
  let selectable_recipes = recipes_point.filter((recipe) => {
    if (stack.length == 0) {
      return recipe.type == type;
    } else if (stack.length == 3) {
      return recipe.point >= min - sum_point && recipe.point <= max - sum_point;
    } else if (stack.length >= 4) {
      return false;
    } else {
      return recipe.point <= (max - sum_point);
    }
  });
  return (
    <Container>
      <Row>
        <Col md={md}>
          Range: {min} ~ {max}
          <ProgressBar striped variant={type} now={(100 * sum_point)/max} label={sum_point}/>
        </Col>
      </Row>
      <Row>
        <Col md={lf}>
          <ListGroup>
            {stack.map((recipe, i) => renderRecipe(recipe, onCancel, i))}
          </ListGroup>
        </Col>
        <Col md={md}>
          <ListGroup>
            {selectable_recipes.map((recipe, i) => renderRecipe(recipe, onSelect, i))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

const renderContainer = ({page, target}, items, onSelect) => {
  switch (page) {
    case 'cooking': return <CookRecipe recipe={target}/>;
    default: return <SelectRecipe recipes={items} onSelect={onSelect}/>
  }
}

const Cramo = () => {
  let items = [];
  const [state, setState] = useState({
    page: "",
    target: {},
  });
  type_order.forEach(type => items = [
    ...items, ...cram_table[type].map(item => ({...item, type: type.toLowerCase()}))
  ]);

  const onSelect = (item) => {
    console.log('set state', item)
    setState({
      page: 'cooking',
      target: item,
    });
  };
  return (
    <div>
      {renderContainer(state, items, onSelect)}
    </div>
  );
}
/* <ListGroup.Item>
 * Cras justo odio
 * </ListGroup.Item>
 * <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
 * <ListGroup.Item>
 * Morbi leo risus
 * </ListGroup.Item>
 * <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item> */
export default Cramo;

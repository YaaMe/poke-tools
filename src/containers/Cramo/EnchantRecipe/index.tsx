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
import cram_point from 'res/cramo/cram_point';
import { packId } from 'tools/tricks';
import { type_order } from 'tools/constants';

const md = {
  span: 4,
  offset: 2
}
const lf = {
  span: 4,
}

let recipes_point = [];
type_order.forEach(type => recipes_point = [
  ...recipes_point, ...cram_point[type].map(item => ({...item, type: type.toLowerCase()}))
]);


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


const EnchantRecipe = ({recipe = {}, onBack}) => {
  const { type, hit_range: [min, max] } = recipe;
  let [stack, setStack] = useState([]);
  let sum_point = 0;
  stack.forEach(({point}) => sum_point += point);
  const onSelect = (recipe) => {
    if (stack.length < 4) {
      setStack([...stack, packId(recipe)]);
    }
  };
  const onCancel = (target) => {
    setStack(stack.filter(recipe => recipe.uuid !== target.uuid));
  }
  let point_set = new Set();
  recipes_point.forEach((recipe) => point_set.add(recipe.point));
  let selectable_recipes = recipes_point.filter((recipe) => {
    if (stack.length == 0) {
      return recipe.type == type;
    } else if (stack.length == 2) {
      let check = false;
      let assume = sum_point + recipe.point;
      point_set.forEach(point => {
        if (!check) {
          check = point >= min - assume && point <= max - assume;
        }
      })
      return check;
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
        <Col md={{
          span: 4,
          offset: 4
        }}>
          Range: {min} ~ {max}
          <ProgressBar striped variant={type} now={(100 * sum_point)/max} label={sum_point}/>
        </Col>
      </Row>
      <Row>
        <Col md={{
          span: 4,
        }}>
          <ListGroup>
            {stack.map((recipe, i) => renderRecipe(recipe, onCancel, i))}
          </ListGroup>
        </Col>
        <Col md={{
          span: 4,
        }}>
          <ListGroup>
            {selectable_recipes.map((recipe, i) => renderRecipe(recipe, onSelect, i))}
          </ListGroup>
        </Col>
        <Col md={{
          span: 4,
        }}>
          <Button onClick={onBack}>back</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default EnchantRecipe;

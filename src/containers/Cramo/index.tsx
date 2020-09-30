import React, {Fragment, useState} from 'react';
import {
  Container,
  Row, Col,
  InputGroup,
  FormControl,
  ListGroup,
  Button,
  ProgressBar,
} from 'react-bootstrap';

import SelectRecipe from './SelectRecipe';
import EnchantRecipe from './EnchantRecipe';

const renderContainer = ({page, target}, onSelect, onBack) => {
  switch (page) {
    case 'enchant': return <EnchantRecipe recipe={target} onBack={onBack} />;
    default: return <SelectRecipe onSelect={onSelect}/>
  }
}

const Cramo = () => {
  const [state, setState] = useState({
    page: "",
    target: {},
  });

  const onSelect = (item) => {
    setState({
      page: 'enchant',
      target: item,
    });
  };
  const onBack = () => {
    setState({
      page: "",
      target: {}
    });
  };
  return (
    <Fragment>
      {renderContainer(state, onSelect, onBack)}
    </Fragment>
  );
}

export default Cramo;

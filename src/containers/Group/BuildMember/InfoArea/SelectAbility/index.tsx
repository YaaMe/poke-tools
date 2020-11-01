import React from 'react';

import { ListGroup } from 'react-bootstrap';

const mapAbility = (ability, member, onSelect, i) => {
  return (
    <ListGroup.Item key={i} onClick={e => onSelect({
      ...member,
      detail: {...member.detail, ability}
    })}>
      <label>{ability}</label>
    </ListGroup.Item>
  )
}

const SelectAbility = ({ member, onSelect }) => {
  let { detail, dex } = member;
  let abilities = Object.keys(dex.abilities).map(key => dex.abilities[key]);
  return (
    <ListGroup>
      {abilities.map((ability, i) => mapAbility(ability, member, onSelect, i))}
    </ListGroup>
  )
};

export default SelectAbility;

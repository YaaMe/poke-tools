import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { BattleItems } from 'tools/data/items';
import { getItemIcon } from 'tools/tricks';
import { toPokeID } from 'tools/tricks';

const items = Object.keys(BattleItems);

const mapItem = (name, member, onSelect) => {
  let item = BattleItems[name];
  return (
    <ListGroup.Item onClick={e => onSelect({
      ...member,
      detail: {...member.detail, item: name},
    })}>
      <div style={{
      height: '24px',
      width: '24px',
      background: getItemIcon(item.name)
      }}/><label>{item.name}</label>
    </ListGroup.Item>
  )
};

const SelectItem = ({ member, onSelect }) => {
  // let list = items.filter(item => toPokeID(item.name).includes())
  // TODO item search
  let list = items;
  return (
    <div>
      <ListGroup>
        {list.map(item => mapItem(item, member, onSelect))}
      </ListGroup>
    </div>
  );
};

export default SelectItem;

import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { BattleItems } from 'tools/data/items';
import { getItemIcon } from 'tools/tricks';

const items = Object.keys(BattleItems);

const mapItem = name => {
  let item = BattleItems[name];
  return (
    <ListGroup.Item>
      <div style={{
      height: '24px',
      width: '24px',
      background: getItemIcon(item.name)
      }}/><div>{item.name}</div>
    </ListGroup.Item>
  )
};

const SelectItem = () => {
  return (
    <div>
      <ListGroup>
        {items.map(item => mapItem(item))}
      </ListGroup>
    </div>
  );
};

export default SelectItem;

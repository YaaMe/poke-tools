import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { toPokeID } from 'tools/tricks';
import { Learnsets as BattleLearnsets } from 'res/showdown/data/learnsets';

const pushMove = (moveSlot, move) => {
  if (moveSlot.length < 4) {
    return [...moveSlot, move]
  }
}

const mapMove = (move, member, onSelect, slot = 0) => {
  return (
    <ListGroup.Item onClick={e => {
      let moveSlot = [...member.detail.moveSlot];
      moveSlot[slot] = move;
      return onSelect({
      ...member,
      detail: { ...member.detail, moveSlot }
    })}}>
      <label>{move}</label>
    </ListGroup.Item>
  )
};

const SelectMove = ({member, onSelect, slot}) => {
  const id = toPokeID(member.dex.name);
  let { learnset } = BattleLearnsets[id];
  let moves = Object.entries(learnset).filter(([key, value]) => {
    return value[0].indexOf('8') > -1
  }).map(([key, value]) => key);

  return (
    <ListGroup>
      {moves.map(move => mapMove(move, member, onSelect, slot))}
    </ListGroup>
  );
};

export default SelectMove;

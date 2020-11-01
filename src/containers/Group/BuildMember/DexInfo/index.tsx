import React, { Fragment } from 'react';
import {
  Row, Col,
  ButtonGroup,
  Button,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import { Type } from 'components';
import { getPokeDexImg, toPokeID, getItemIcon } from 'tools/tricks';
import './dexinfo.scoped.scss';

const DetailCell = ({title, value}) => {
  return (
    <span className="detailCell">
      <label>{title}</label>
      {value}
    </span>
  )
}

const getStatsBarStyle = (ev) => {
  let width = ev * 180 / 540;
  width = width > 179 ? 179 : Math.floor(width);
  let color = ev * 180 / 540;
  color = color > 360 ? 360 : Math.floor(color);
  return {
    width: `${width}px`,
    background: `hsl(${color}, 85%, 45%)`,
    borderColor: `hsl(${color}, 85%, 45%)`,
  }

}

const StatsBar = ({title, ev, iv, effect = []}) => {
  let [plus, minus] = effect;
  return (
    <div className="bar">
      <label>{title}</label>
      <bar style={getStatsBarStyle(ev)}>{ev}</bar>
      <em>
        {iv}
        {plus && <effect>+</effect>}
        {minus && <effect>-</effect>}
      </em>
    </div>
  )
};

const DexInfo = ({member, updateMember, switchInfo}) => {
  let { detail, dex } = member;
  if (!dex) return <div className="dex" />;
  const { baseStats } = dex;

  let {
    level = 50,
    gender = 0,
    shiny = 0,
    gmax = 0,
    ability = '',
    moveSlot = ['', '', '', ''],
    ivs = {},
  } = detail;

  const { hp, atk, def, spa, spd, spe } = baseStats;
  const { i_hp, i_atk, i_def, i_spa, i_spd, i_spe, effect = ['atk', 'spd'] } = ivs;

  const info = [{
    title: 'level',
    value: level
  }, {
    title: 'gender',
    value: gender
  }, {
    title: 'shiny',
    value: shiny
  }, {
    title: 'gmax',
    value: gmax
  }];

  const onItem = e => {
    updateMember({
      dex,
      detail: {
        ...dex.detail,
        item: e.target.value,
      }
    })
  };
  return (
    <Fragment>
      <Row className="dex">
        <Col md={{span: 2}}>
          <div style={{
            minHeight: '127px',
            minWidth: '100px',
            width: '130%',
            background: getPokeDexImg(toPokeID(dex.name), dex.num),
          }}>
          </div>
          <Button variant="light" onClick={e => switchInfo({page: 'dex'})}>{dex.name}</Button>
        </Col>
        <Col md={{span: 4}}>
          <Row>
            <Col>
              <div className="title">Details</div>
              <Button className="details" variant="light" onClick={e => switchInfo({page: 'level'})}>
                {info
                  .map(({title, value}) => {
                    switch(title) {
                      case 'gender': return {title, value: value === 0 ? 'male' : 'female'};
                      case 'shiny':
                      case 'gmax': return {title, value: value === 0 ? 'No' : 'Yes'};
                      case 'level':
                      default: return {title, value}
                    }
                  }).map(({title, value}) => <DetailCell title={title} value={value} />)}
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md={{span: 6}}>
              <div style={{
                height: '24px',
                width: '24px',
                background: getItemIcon(detail.item)
              }}/>
              <FormControl
                controlid="item"
                placeholder="search item"
                onChange={onItem}
                value={detail.item ? detail.item : ''}
                onClick={e => switchInfo({page: 'item'})} />
            </Col>
            <Col md={{span: 6}}>
              <div>{dex.types.map(type => <Type type={type} />)}</div>
              <Button className="ability" variant="light" onClick={e => switchInfo({page: 'ability'})}>
                {ability}
              </Button>
            </Col>
          </Row>
        </Col>
        <Col md={{span: 3}}>
          <div className="title">Moves</div>
          {moveSlot.map((move, i) => (
            <Button className="move" variant="light"
                    onClick={e => switchInfo({page: 'move', addon: i})}>{move}</Button>
          ))}
        </Col>
        <Col md={{span: 3}}>
          <div className="title">Stats</div>
          <div className="stats">
            <StatsBar title="HP" ev={hp} iv={i_hp} effect={
            [effect[0] === 'hp', effect[1] === 'hp']
            }/>
            <StatsBar title="Atk" ev={atk} iv={i_atk} effect={
            [effect[0] === 'atk', effect[1] === 'atk']
            }/>
            <StatsBar title="Def" ev={def} iv={i_def} effect={
            [effect[0] === 'def', effect[1] === 'def']
            }/>
            <StatsBar title="SpA" ev={spa} iv={i_spa} effect={
            [effect[0] === 'spa', effect[1] === 'spa']
            }/>
            <StatsBar title="SpD" ev={spd} iv={i_spd} effect={
            [effect[0] === 'spd', effect[1] === 'spd']
            }/>
            <StatsBar title="Spe" ev={spe} iv={i_spe} effect={
            [effect[0] === 'spe', effect[1] === 'spe']
            }/>
          </div>
        </Col>
      </Row>
    </Fragment>
  )
};

export default DexInfo;

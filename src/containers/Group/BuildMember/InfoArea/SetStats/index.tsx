import React from 'react';
import {
  Row, Col
} from 'react-bootstrap';
import './setstate.scoped.scss';

const getStatsBarStyle = (base) => {
  let width = base * 180 / 540;
  width = width > 179 ? 179 : Math.floor(width);
  let color = base * 180 / 540;
  color = color > 360 ? 360 : Math.floor(color);
  let style = {
    width: `${width}px`,
    background: `hsl(${color}, 85%, 45%)`,
    borderColor: `hsl(${color}, 85%, 45%)`,
  }

  return base < 50 ? {'text-align': 'right', color: 'black', ...style} : style
}


const StatsBar = ({title, base}) => {
  return (
    <Row className="bar">
      <Col md={{span: 1}}>{title}</Col>
      <Col md={{span: 2}}>{base}</Col>
      <Col md={{span: 9}}><bar style={getStatsBarStyle(base)}/></Col>
    </Row>
  )
};


const SetStats = ({ member }) => {
  const { dex, details } = member;
  const { baseStats } = dex;
  const { hp, atk, def, spa, spd, spe } = baseStats;
  console.log(dex);
  return (
    <div>
      <Row>
        <Col md={{span: 3}}>
          <div className="base" >
            <div className="title">Base</div>
            <div className="stats">
            <StatsBar title="HP" base={hp}/>
            <StatsBar title="Atk" base={atk}/>
            <StatsBar title="Def" base={def}/>
            <StatsBar title="SpA" base={spa}/>
            <StatsBar title="SpD" base={spd}/>
            <StatsBar title="Spe" base={spe}/>
            </div>
          </div>
        </Col>
        <Col md={{span: 3}}>evs</Col>
        <Col md={{span: 3}}>ivs</Col>
        <Col md={{span: 3}}>result</Col>
      </Row>
    </div>
  )
}

export default SetStats;

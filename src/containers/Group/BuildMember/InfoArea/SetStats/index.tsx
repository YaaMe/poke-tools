import React from 'react';
import {
  Row, Col,
  FormControl
} from 'react-bootstrap';
import './setstate.scoped.scss';

const getStatsBarStyle = (base) => {
  // let width = base * 180 / 540;
  // width = width > 179 ? 179 : Math.floor(width);
  let width =Math.floor(base * 100 / 255);
  let color = base * 180 / 540;
  color = color > 360 ? 360 : Math.floor(color);
  let style = {
    width: `${width}%`,
    background: `hsl(${color}, 85%, 45%)`,
    borderColor: `hsl(${color}, 85%, 45%)`,
  }

  return base < 50 ? {'text-align': 'right', color: 'black', ...style} : style
}


const BaseArea = ({title, base}) => {
  return (
    <Row className="bar">
      <Col md={{span: 2}}><span>{title}</span></Col>
      <Col md={{span: 2}}><span className="base">{base}</span></Col>
      <Col md={{span: 8}}><bar style={getStatsBarStyle(base)}/></Col>
    </Row>
  )
};

const EVArea = ({id, ev, updateEV}) => {
  let changeEV = e => updateEV(e.target.value);
  return (
    <Row>
      <Col md={{span: 2}}>
        <FormControl
          controlid={id}
          onChange={changeEV}
          value={ev}
        />
      </Col>
      <Col md={{span: 10}}>
        <FormControl
          type="range"
          max={252}
          value={ev}
          onChange={changeEV}
        />
      </Col>
    </Row>
  )
}
const IVArea = () => {
  return (
    <div>0-31</div>
  )
}
const Result = () => {
  return (
    <span>result</span>
  )
}

const stats = ['HP', 'Atk', 'Def', 'SpA', 'SpD', 'Spe'];

const Stats = ({id, title, base, ev, updateEV}) => {
  return (
    <Row>
      <Col md={{span: 3}}>
        <div className="base" >
          <div className="stats">
            <BaseArea title={title} base={base}/>
          </div>
        </div>
      </Col>
      <Col md={{span: 7}}>
        <EVArea id={id} ev={ev} updateEV={updateEV} />
      </Col>
      <Col md={{span: 1}}>
        <IVArea/>
      </Col>
      <Col md={{span: 1}}>
        <Result/>
      </Col>
    </Row>
  )
}

const mapStats = (attr, {dex, detail}, onUpdateMember) => {
  const { baseStats } = dex;
  const {
    evs = [0,0,0,0,0,0]
  } = detail;
  let id = attr.toLowerCase();
  let index = stats.indexOf(attr);
  let ev = evs[index];
  const updateEV = (ev) => {
    evs[index] = ev;
    onUpdateMember({dex, detail: {...detail, evs: [...evs]}})
  };
  const updateIV = () => {};
  return <Stats id={id} title={attr} base={baseStats[id]} ev={ev}
                updateEV={updateEV} updateIV={updateIV} />
}

const SetStats = ({ member, onUpdateMember }) => {
  const { dex, detail } = member;
  const { baseStats } = dex;
  return (
    <div>
      <Row>
        <Col md={{span: 3}}>
          <div className="base" >
            <div className="title">Base</div>
          </div>
        </Col>
        <Col md={{span: 7}}>
          EVs
        </Col>
        <Col md={{span: 1}}>
          IVs
        </Col>
        <Col md={{span: 1}}>
        </Col>
      </Row>
      {stats.map(attr => mapStats(attr, member, onUpdateMember))}
    </div>
  )
}

export default SetStats;

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

const DexInfo = ({member, updateMember, switchInfo}) => {
  let { detail, dex } = member;
  if (!dex) return <div className="dex" />;
  let {
    level = 50,
    gender = 0,
    shiny = 0,
    gmax = 0,
    ability = '',
    moveSlot = ['', '', '', '']
  } = detail;

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
          {moveSlot.map((move, i) => (
            <Button className="move" variant="light"
                    onClick={e => switchInfo({page: 'move', addon: i})}>{move}</Button>
          ))}
        </Col>
        <Col md={{span: 3}}>
          Stats
        </Col>
      </Row>
    </Fragment>
  )
};

export default DexInfo;

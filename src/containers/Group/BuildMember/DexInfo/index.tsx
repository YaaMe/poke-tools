import React, { Fragment } from 'react';
import {
  Row, Col,
  ButtonGroup,
  Button,
  FormControl,
} from 'react-bootstrap';
import { getPokeDexImg, toPokeID } from 'tools/tricks';
import './dexinfo.scoped.scss';

const DetailCell = ({title, value}) => {
  return (
    <span className="detailCell">
      <label>{title}</label>
      {value}
    </span>
  )
}

const DexInfo = ({dex, updateMember, switchInfo}) => {
  if (!dex) return <div className="dex" />;
  // level gender shiny gmax
  const info = [{
    title: 'level',
    value: 50
  }, {
    title: 'gender',
    value: 0
  }, {
    title: 'shiny',
    value: 0
  }, {
    title: 'gmax',
    value: 0
  }];
  const CLICK_NAME = {
    page: 'dex',
  };
  const details = {
    page: 'detail',
    addon: info
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
          <Button variant="light" onClick={e => switchInfo(CLICK_NAME) }>{dex.name}</Button>
        </Col>
        <Col md={{span: 4}}>
          <Row>
            <Col>
              <div className="title">Details</div>
              <Button className="details" variant="light" onClick={e => switchInfo(details)}>
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
              itemicon
              item
            </Col>
            <Col md={{span: 6}}>
              type
              ability
            </Col>
          </Row>
        </Col>
        <Col md={{span: 3}}>
          moves
        </Col>
        <Col md={{span: 3}}>
          Stats
        </Col>
      </Row>
    </Fragment>
  )
};

export default DexInfo;

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

const DexInfo = ({dex, onUpdate}) => {
  if (!dex) return <div/>;
  console.log(dex);
  // level gender shiny gmax
  const info = [{
    title: 'level',
    value: 50
  }, {
    title: 'gender',
    value: '--'
  }, {
    title: 'shiny',
    value: 'No'
  }, {
    title: 'gmax',
    value: 'No'
  }]
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
          <FormControl value="xxxxxx" />
        </Col>
        <Col md={{span: 4}}>
          <Row>
            <Col>
            <div className="title">Details</div>
            <Button className="details" variant="light">
              {info.map(({title, value}) => <DetailCell title={title} value={value} />)}
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

import React, { Fragment } from 'react';
import {
  Row, Col
} from 'react-bootstrap';
import { getPokeDexImg, toPokeID } from 'tools/tricks';

const DexInfo = ({dex, onUpdate}) => {
  if (!dex) return <div/>;
  console.log('search dex');
  return (
    <Fragment>
      <Row>
        <Col md={{span: 6}}>
          <Row>
            <Col md={{span: 4}}>
              <div style={{
                height: '127px',
                width: '626px',
                background: getPokeDexImg(toPokeID(dex.name), dex.num),
              }}>
              </div>
            </Col>
            <Col md={{span: 8}}>
              <Row>
                <Col>
                  details
                </Col>
                <Col>
                  type
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md={{span: 4}}>
              name
            </Col>
            <Col md={{span: 4}}>
              item
            </Col>
            <Col md={{span: 4}}>
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

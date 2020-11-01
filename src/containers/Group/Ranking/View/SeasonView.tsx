import {SeasonViewProps} from "../Ranking";
import React, {Fragment} from "react";
import {Col, Row} from "react-bootstrap";

export const SeasonView = (props: SeasonViewProps) => {
    let { name, cnt, start, end, season } = props.season!;

    if (season === -1) return <Fragment />

    return <Fragment>
        <Row className='description'>
            <Col md={{span: 7}} className='title'>
                Season {season} Info
            </Col>
        </Row>
        <Row className='description'>
            <Col md={{span: 4}} className='title'>
                Season Name
            </Col>
            <Col md={{span: 8}} className='content'>
                {name}
            </Col>
        </Row>

        <Row className='description'>
            <Col md={{span: 4}} className='title'>
                Time
            </Col>
            <Col md={{span: 8}} className='content'>
                {start} ~ {end}
            </Col>
        </Row>

        <Row className='description'>
            <Col md={{span: 4}} className='title'>
                Total Player
            </Col>
            <Col md={{span: 8}} className='content'>
                {cnt}
            </Col>
        </Row>
    </Fragment>
}

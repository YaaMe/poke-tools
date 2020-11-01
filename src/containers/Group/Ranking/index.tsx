import React, { useReducer, useState, Fragment } from 'react';
import {
    Season,
    SeasonInfo,
    SeasonInfos,
    SeasonListReqBody,
} from '../../../API/PokemonHome';
import { Col, Container, Row } from "react-bootstrap";
import { PokemonRankingState, SeasonReducerAction } from "./types";
import { SeasonView, SeasonSelector, TrainerRankView, PokemonRankView } from './View'
import './index.scss'

export const PokemonRanking = () => {
    const seasonReducer = (state: PokemonRankingState, action: SeasonReducerAction) => {
        switch (action.type) {
            case 'setSeason':
                return {...state, seasonID: action.season, seasons: action.seasons};
        }
        return state;
    }
    const initialSeasonInfo: SeasonInfo = {
        name: '-1', start: '0', end: '0', cnt: -1, rule: 0, season: -1, rst: -1, ts1: -1, ts2: -1, reg: '0'
    }
    const initialSeasonInfos: SeasonInfos = {
        '10-11': initialSeasonInfo,
        '10-12': initialSeasonInfo
    }
    const initialSeason: Season = {
        '-1': initialSeasonInfos
    }
    const initialPokemonRankingState: PokemonRankingState = {
        seasons: initialSeason,
        seasonID: '-1'
    }

    const [ rom, setRom ] = useState<SeasonListReqBody>({soft: "Sw"}); // 版本，Sw 剑， Sh 盾
    const [ season, seasonDispatcher ] = useReducer(seasonReducer, initialPokemonRankingState); // 赛季选择，会下传子组件，内含带api请求
    const [ mode, setMode ] = useState<string>('double'); // 单双打
    const [ view, setView ] = useState<string>('pokemon'); // 视图：训练师；Pokemon

    const dispatch = (seasonID: string, seasons: Season) => {
        seasonDispatcher({
            type: 'setSeason',
            season: seasonID,
            seasons,
        })
    };
    const getSeasonID = (season: PokemonRankingState, mode: string) => {
        const modeNum = mode === 'single' ? 1 : 2;
        const seasonNum = season.seasonID!.length < 2 ? `0${season.seasonID}` : season.seasonID
        return `10${seasonNum}${modeNum}`;
    }
    const getSeasonInfo = (season: PokemonRankingState, mode: string) => {
        const seasonID = getSeasonID(season, mode)
        //      1~11 赛季集合   11 特定赛季序号   10固定位  11 特定赛季序号  模式 rule+1，0→1 单打，1→2 双打   10111 赛季ID
        return season.seasons![season.seasonID!][seasonID]
    }

    return <Container fluid={true}>
        <Row className='rankingRow'>
            <Col md={{span: 2}}>Version: </Col>
            <Col md={{span: 3}}>
                <input
                    value="Sw"
                    name="sword"
                    type="radio"
                    checked={rom.soft === 'Sw'}
                    onChange={event => setRom({soft: "Sw"} as SeasonListReqBody)}
                /> Sword
            </Col>
            <Col md={{span: 3}}>
                <input
                    value="Sh"
                    name="shield"
                    type="radio"
                    checked={rom.soft === 'Sh'}
                    onChange={event => setRom({soft: "Sh"} as SeasonListReqBody)}
                /> Shield
            </Col>
            <Col md={{span: 4}} >{rom.soft}</Col>
        </Row>

        <Row className='rankingRow'>
            <Col md={{span: 9}}>
                <SeasonSelector
                    rom={rom}
                    selectedSeason={season.seasonID}
                    seasonDispatch={dispatch}
                />
            </Col>
            <Col md={{span: 3}}>{season.seasonID}</Col>
        </Row>

        <Row className='rankingRow'>
            <Col md={{span: 2}}>Mode: </Col>
            <Col md={{span: 3}}>
                <input
                    value="single"
                    name="single"
                    type="radio"
                    checked={mode === 'single'}
                    onChange={event => setMode(event.target.value)}
                /> Single
            </Col>
            <Col md={{span: 3}}>
                <input
                    value="double"
                    name="double"
                    type="radio"
                    checked={mode === 'double'}
                    onChange={event => setMode(event.target.value)}
                /> Double
            </Col>
            <Col md={{span: 4}}>{mode}</Col>
        </Row>

        <Row className='rankingRow'>
            <Col md={{span: 2}}>View: </Col>
            <Col md={{span: 3}}>
                <input
                    value="trainer"
                    name="trainer"
                    type="radio"
                    checked={view === 'trainer'}
                    onChange={event => setView('trainer')}
                /> Trainer
            </Col>
            <Col md={{span: 3}}>
                <input
                    value="pokemon"
                    name="pokemon"
                    type="radio"
                    checked={view === 'pokemon'}
                    onChange={event => setView('pokemon')}
                /> Pokemon
            </Col>
            <Col md={{span: 4}}>{view}</Col>
        </Row>

        <Row className='rankingRow'>
            <Col md={{span: 12}}>
                <SeasonView season={getSeasonInfo(season, mode)}/>
            </Col>
        </Row>

        <Row className='rankingRow'>
            <Col md={{span: 12}}>
                {season!.seasonID === '-1' ? <Fragment /> : (
                    view === 'trainer' ?
                        <TrainerRankView season={getSeasonInfo(season, mode)} seasonID={getSeasonID(season, mode)}/>
                        : <PokemonRankView season={getSeasonInfo(season, mode)} seasonID={getSeasonID(season, mode)}/>
                )}
            </Col>
        </Row>
    </Container>
}

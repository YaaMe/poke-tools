import React, {useEffect, useReducer, useState} from 'react';
import {PokemonHomeAPI, Season, SeasonInfo, SeasonInfos, SeasonListReqBody} from './api';
import {Col, Container, Row} from "react-bootstrap";
import BuildMember from "../BuildMember";

interface PokemonRankingState {
    seasonID?: string;
    seasons?: Season;
}

interface SeasonReducerAction {
    type: string;
    season: string;
    seasons: Season;
}

export const PokemonRanking = () => {
    const seasonReducer = (state: PokemonRankingState, action: SeasonReducerAction) => {
        switch (action.type) {
            case 'setSeason':
                return {...state, seasonID: action.season, seasons: action.seasons};
        }
        return state;
    }
    const initialSeasonInfo: SeasonInfo = {
        name: '0', start: '0', end: '0', cnt: -1, rule: 0, season: -1, rst: -1, ts1: -1, ts2: -1, reg: '0'
    }
    const initialSeasonInfos: SeasonInfos = {
        '10001': initialSeasonInfo
    }
    const initialSeason: Season = {
        '0': initialSeasonInfos
    }
    const initialPokemonRankingState: PokemonRankingState = {
        seasons: initialSeason,
        seasonID: '0'
    }

    const [ rom, setRom ] = useState<SeasonListReqBody>({soft: "Sw"}); // 版本，Sw 剑， Sh 盾
    const [ season, seasonDispatcher ] = useReducer(seasonReducer, initialPokemonRankingState); // 赛季选择，会下传子组件，内含带api请求
    const [ mode, setMode ] = useState<string>('single'); // 单双打
    const [ view, setView ] = useState<string>('trainee'); // 视图：训练师；Pokemon

    const dispatch = (seasonID: string, seasons: Season) => {
        seasonDispatcher({
            type: 'setSeason',
            season: seasonID,
            seasons,
        })
    };
    const getSeasonInfo = (season: PokemonRankingState, mode: string) => {
        const modeNum = mode === 'single' ? 1 : 2;
        const seasonNum = season.seasonID!.length < 2 ? `0${season.seasonID}` : season.seasonID
        const seasonID = `10${seasonNum}${modeNum}`;
        //      1~11 赛季集合   11 特定赛季序号   10固定位  11 特定赛季序号  模式 rule+1，0→1 单打，1→2 双打   10111 赛季ID
        return season.seasons![season.seasonID!][seasonID]
    }

    return <div>
        <Container fluid={true}>
            <Row style={{paddingTop: 10}}>
                <Col md={{span: 2, offset: 0}}>Version: </Col>
                <Col md={{span: 3, offset: 0}}>
                    <input
                        value="Sw"
                        name="sword"
                        type="radio"
                        checked={rom.soft === 'Sw'}
                        onChange={event => setRom({soft: "Sw"} as SeasonListReqBody)}
                    /> Sword
                </Col>
                <Col md={{span: 3, offset: 0}}>
                    <input
                        value="Sh"
                        name="shield"
                        type="radio"
                        checked={rom.soft === 'Sh'}
                        onChange={event => setRom({soft: "Sh"} as SeasonListReqBody)}
                    /> Shield
                </Col>
                <Col md={{span: 4, offset: 0}} >{rom.soft}</Col>
            </Row>

            <Row style={{paddingTop: 10}}>
                <Col md={{span: 9, offset: 0}}>
                    <PokemonHomeSeasonSelector
                        rom={rom}
                        selectedSeason={season.seasonID}
                        seasonDispatch={dispatch}
                    />
                </Col>
                <Col md={{span: 3, offset: 0}}>{season.seasonID}</Col>
            </Row>

            <Row style={{paddingTop: 10}}>
                <Col md={{span: 2, offset: 0}}>Mode: </Col>
                <Col md={{span: 3, offset: 0}}>
                    <input
                        value="single"
                        name="single"
                        type="radio"
                        checked={mode === 'single'}
                        onChange={event => setMode(event.target.value)}
                    /> Single
                </Col>
                <Col md={{span: 3, offset: 0}}>
                    <input
                        value="double"
                        name="double"
                        type="radio"
                        checked={mode === 'double'}
                        onChange={event => setMode(event.target.value)}
                    /> Double
                </Col>
                <Col md={{span: 4, offset: 0}}>{mode}</Col>
            </Row>

            <Row style={{paddingTop: 10}}>
                <Col md={{span: 2, offset: 0}}>View: </Col>
                <Col md={{span: 3, offset: 0}}>
                    <input
                        value="trainee"
                        name="trainee"
                        type="radio"
                        checked={view === 'trainee'}
                        onChange={event => setView('trainee')}
                    /> Trainee
                </Col>
                <Col md={{span: 3, offset: 0}}>
                    <input
                        value="pokemon"
                        name="pokemon"
                        type="radio"
                        checked={view === 'pokemon'}
                        onChange={event => setView('pokemon')}
                    /> Pokemon
                </Col>
                <Col md={{span: 4, offset: 0}}>{view}</Col>
            </Row>

            <Row style={{paddingTop: 10}}>
                <Col md={{span: 10, offset: 1}}>
                    <PokemonView season={getSeasonInfo(season, mode)}/>
                </Col>
            </Row>
        </Container>

    </div>
}

class SeasonSelectorProps {
    season?: {
        [id: string]: SeasonInfos;
    };
    rom?: SeasonListReqBody;
    selectedSeason?: string;
    seasonDispatch!: (seasonID: string, seasons: Season) => void;
}

const PokemonHomeSeasonSelector = (props: SeasonSelectorProps) => {
    let {rom, selectedSeason, seasonDispatch} = props;
    rom = rom ?? { soft: "Sw" } as SeasonListReqBody;
    const api = new PokemonHomeAPI();
    const [ seasons, setSeasons ] = useState<Season>();
    const [ error, setError ] = useState<string | undefined>();

    useEffect(() => {
        api.fetchSeasonList(rom!).then(
            (data) => setSeasons(data.list),
            (err) => setError(`${err}`)
        );
    }, []);

    return <select disabled={!seasons} value={selectedSeason} onChange={(event => seasonDispatch(event.target.value, seasons!))}>
        <option key='select' value='select'>{seasons ? 'Select season...' : 'Loading data...'}</option>
        {Object.keys(seasons ?? {}).reverse().map((v,i) => {
            const k = seasons![v][Object.keys(seasons![v]).pop()!]
            return <option key={i} value={v}>{k.name} {k.start} - {k.end}</option>
        })}
    </select>
}

class PokemonViewProps {
    season?: SeasonInfo;
}

const PokemonView = (props: PokemonViewProps) => {
    let {name, cnt, start, end, season} = props.season!;
    return <div>
        Season {season} Info <br/>
        Season Name: {name} <br/>
        Time: {start} ~ {end} <br/>
        Total Player: {cnt} <br/>
    </div>
}

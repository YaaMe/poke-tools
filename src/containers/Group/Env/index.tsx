import React, {useEffect, useReducer, useState, Fragment} from 'react';
import {
    PokemonHomeAPI, PokemonRankInfo, PokemonRankReqParam,
    Season,
    SeasonInfo,
    SeasonInfos,
    SeasonListReqBody,
    TrainerRankInfo,
    TrainerRankReqParam
} from './api';
import {Col, Container, Row} from "react-bootstrap";

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
                        value="trainer"
                        name="trainer"
                        type="radio"
                        checked={view === 'trainer'}
                        onChange={event => setView('trainer')}
                    /> Trainer
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
                <Col md={{span: 12}}>
                    <SeasonView season={getSeasonInfo(season, mode)}/>
                </Col>
            </Row>

            <Row style={{paddingTop: 10}}>
                <Col md={{span: 12}}>
                    {season!.seasonID === '-1' ? <Fragment /> : (
                        view === 'trainer' ?
                            <TrainerRankView season={getSeasonInfo(season, mode)} seasonID={getSeasonID(season, mode)}/>
                            : <PokemonRankView season={getSeasonInfo(season, mode)} seasonID={getSeasonID(season, mode)}/>
                    )}
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
        <option key='select' value='-1' disabled>{seasons ? 'Select season...' : 'Loading data...'}</option>
        {Object.keys(seasons ?? {}).reverse().map((v,i) => {
            const k = seasons![v][Object.keys(seasons![v]).pop()!]
            return <option key={i} value={v}>{k.name} {k.start} - {k.end}</option>
        })}
    </select>
}

class SeasonViewProps {
    season?: SeasonInfo;
}

const SeasonView = (props: SeasonViewProps) => {
    let {name, cnt, start, end, season} = props.season!;

    if (season === -1) return <Fragment />

    return <Fragment>
        <Row>
            <Col md={{span: 7}}>
                Season {season} Info
            </Col>
        </Row>
        <Row>
            <Col md={{span: 4}} style={{textAlign: 'right'}}>
                Season Name
            </Col>
            <Col md={{span: 8}} style={{textAlign: 'left'}}>
                {name}
            </Col>
        </Row>

        <Row>
            <Col md={{span: 4}} style={{textAlign: 'right'}}>
                Time
            </Col>
            <Col md={{span: 8}} style={{textAlign: 'left'}}>
                {start} ~ {end}
            </Col>
        </Row>

        <Row>
            <Col md={{span: 4}} style={{textAlign: 'right'}}>
                Total Player
            </Col>
            <Col md={{span: 8}} style={{textAlign: 'left'}}>
                {cnt}
            </Col>
        </Row>
    </Fragment>
}


class TrainerRankViewProps extends SeasonViewProps {
    seasonID!: string;
}

const TrainerRankView = (props: TrainerRankViewProps) => {
    let {seasonID, season} = props;
    let {rst, ts1} = season!;

    const api = new PokemonHomeAPI();
    const req: TrainerRankReqParam = {
        mid: seasonID!,
        rst: rst,
        ts: ts1,
        index: 1,
    }
    const [ rankList, setRankList ] = useState<TrainerRankInfo[]>([]);
    const [ error, setError ] = useState<string | undefined>();

    useEffect(() => {
        api.fetchTrainerRank(req).then(
            (data) => setRankList(data),
            (err) => setError(`${err}`)
        )
    }, [])

    if (rankList.length === 0) return <p>Loading data...</p>

    return <Fragment>
        {rankList.map((trainer, i) => <p>{trainer.name}</p>)}
    </Fragment>
}

class PokemonRankViewProps extends SeasonViewProps {
    seasonID!: string;
}

const PokemonRankView = (props: PokemonRankViewProps) => {
    let {seasonID, season} = props;
    let {rst, ts2} = season!;

    const api = new PokemonHomeAPI();
    const req: PokemonRankReqParam = {
        mid: seasonID!,
        rst: rst,
        ts: ts2,
    }
    const [ rankList, setRankList ] = useState<PokemonRankInfo[]>([]);
    const [ error, setError ] = useState<string | undefined>();

    useEffect(() => {
        api.fetchPokemonRank(req).then(
            (data) => setRankList(data),
            (err) => setError(`${err}`)
        )
    }, [])

    if (rankList.length === 0) return <p>Loading data...</p>

    return <Fragment>
        {rankList.map((pokemon, i) => <p>{pokemon.id}</p>)}
    </Fragment>
}

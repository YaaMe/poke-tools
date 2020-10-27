import React, {useEffect, useReducer, useState} from 'react';
import {PokemonHomeAPI, Season, SeasonInfo, SeasonInfos, SeasonListReqBody} from './api';
import {Col, Container, Row} from "react-bootstrap";
import BuildMember from "../BuildMember";

interface PokemonRankingState {
    seasonID?: string;
    seasons?: {
        [id: string]: SeasonInfos;
    };
}

interface SeasonReducerAction {
    type: string;
    season: string;
}

export const PokemonRanking = () => {
    const seasonReducer = (state: PokemonRankingState, action: SeasonReducerAction) => {
        switch (action.type) {
            case 'setSeason':
                return {...state, seasonID: action.season};
        }
        return state;
    }

    const [ rom, setRom ] = useState<SeasonListReqBody>({soft: "Sw"}); // 版本，Sw 剑， Sh 盾
    const [ season, seasonDispatcher ] = useReducer(seasonReducer, {} as PokemonRankingState); // 赛季选择，会下传子组件，内含带api请求
    const [ mode, setMode ] = useState<string>('single'); // 单双打
    const [ view, setView ] = useState<string>('trainee'); // 视图：训练师；Pokemon

    const dispatch = (seasonID: string) => {
        seasonDispatcher({
            type: 'setSeason',
            season: seasonID,
        })
    };

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
                data...
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
    seasonDispatch!: (seasonID: string) => void;
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

    return <select disabled={!seasons} value={selectedSeason} onChange={(event => seasonDispatch(event.target.value))}>
        <option key='select' value='select'>{seasons ? 'Select season...' : 'Loading data...'}</option>
        {Object.keys(seasons ?? {}).reverse().map((v,i) => {
            const k = seasons![v][Object.keys(seasons![v]).pop()!]
            return <option key={i} value={v}>{k.name} {k.start} - {k.end}</option>
        })}
    </select>
}

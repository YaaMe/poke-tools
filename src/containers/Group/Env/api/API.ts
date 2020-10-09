// import * as queryString from 'query-string';
import {FetchOptions, PokemonRankReqParam, SeasonListReqBody, TrainerRankReqParam} from './Options';
import {SeasonListResponse} from './Responses';
import {PokemonRankInfo, TrainerRankInfo} from "./Interfaces";

const RESOURCE_BASE = process.env.REACT_APP_POKEHOME_RESOURCE_BASE ?? 'https://resource.pokemon-home.com/';
const API_BASE = process.env.REACT_APP_POKEHOME_API_BASE ?? 'https://api.battle.pokemon-home.com/battledata'

export class PokemonHomeAPI {
    defaultHeaders = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    defaultFetchOptions: FetchOptions = {};

    _abort = () => {
    };
    abort = () => {
        try {
            this._abort();
        } catch (e) {
        }
    };

    async fetch(uri: string, body?: any, init?: RequestInit) {
        if (!init) init = {};
        init.headers = { ...this.defaultHeaders, ...init.headers };

        // if (!init.credentials) init.credentials = 'include';

        if (body) init.body = JSON.stringify(body);

        // for abort controller
        const controller = new AbortController()
        init.signal = controller.signal;
        this._abort = controller.abort.bind(controller);

        return fetch(`${uri}`, init);
    }

    async fetchAPI(uri: string, body?: any, init?: RequestInit & { dontThrowErrorOn4XX?: boolean }) {
        const response = await this.fetch(`${API_BASE}/${uri}`, body, init);

        let json: any;
        let failedReason = "";
        try {
            json = await response.json();
        } catch (e) {
            failedReason = response.statusText;
        }

        if (json) {
            try {
                failedReason = json.detail;
            } catch (e) {
            }
        }

        return json;
    }

    async fetchResource(uri: string, body?: any, init?: RequestInit & { dontThrowErrorOn4XX?: boolean }) {
        const response = await this.fetch(`${RESOURCE_BASE}/${uri}`, body, init);

        let json: any;
        let failedReason = "";
        try {
            json = await response.json();
        } catch (e) {
            failedReason = response.statusText;
        }

        if (json) {
            try {
                failedReason = json.detail;
            } catch (e) {
            }
        }

        return json;
    }

    // 获取赛季列表
    async fetchSeasonList(rom: SeasonListReqBody): Promise<SeasonListResponse> {
        return this.fetchAPI(`cbd/competition/rankmatch/list`, rom, {
            dontThrowErrorOn4XX: true,
            headers: {
                Host: 'api.battle.pokemon-home.com',
                countrycode: '304', // Japan
                langcode: '9', // zh-CN
                Authorization: 'Bearer',
                'X-Requested-With': 'jp.pokemon.pokemonhome',
                'Sec-Fetch-Site': 'same-site',
            }
        })
    }

    // 获取赛季训练家排名信息
    async fetchTrainerRank(param: TrainerRankReqParam): Promise<TrainerRankInfo[]> {
        const {mid, rst, ts, index} = param;
        return this.fetchResource(`ranking/${mid}/${rst}/${ts}/traner-${index}`);
    }

    // 获取赛季 Pokemon 排名信息
    async fetchPokemonRank(param: PokemonRankReqParam): Promise<PokemonRankInfo[]> {
        const {mid, rst, ts} = param;
        return this.fetchResource(`ranking/${mid}/${rst}/${ts}/pokemon`);
    }
}

export interface FetchOptions {
    offset?: number;
    limit?: number;
    search?: string;
    order?: string[];
    owner?: number;
    godMode?: boolean;
}

export interface MetricFetchOptions {
    select?: string;
    aggregated?: string;
    since?: string;
    compact?: boolean;
}

export const MetricFetchDefaultOptions: MetricFetchOptions = {
    compact: true
}

export interface PokemonHomeQueryOptions {

}


export interface SeasonListReqBody {
    soft: 'Sw' | 'Sh';  // Sw: sword, Sh: shield
}

export interface TrainerRankReqParam {
    mid: string; // 赛季id命名规则，10固定开头，后跟赛季序号，最后跟rule+1;  如10111为11赛季单人赛，10092为9赛季双人赛，以此类推
    rst: number; // 暂时不知道这个是干嘛的，从赛季信息里取同样字段就ok
    ts: number; // 赛季信息取 ts1
    index: number; // 1000进1，分页参数（可能是rank参数？）
}

export interface PokemonRankReqParam {
    mid: string; // 赛季id命名规则，10固定开头，后跟赛季序号，最后跟rule+1;  如10111为11赛季单人赛，10092为9赛季双人赛，以此类推
    rst: number; // 暂时不知道这个是干嘛的，从赛季信息里取同样字段就ok
    ts: number; // 赛季信息取 ts2
}

import { PokemonRankViewProps } from "./types";
import { PokemonHomeAPI, PokemonRankInfo, PokemonRankReqParam } from "../../../../API/PokemonHome";
import React, { Fragment, useEffect, useState } from "react";

const PokemonRankView = (props: PokemonRankViewProps) => {
    let { seasonID, season } = props;
    let { rst, ts2 } = season!;

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
        { rankList.map((pokemon) => <p>{pokemon.id}</p>) }
    </Fragment>
}

export {PokemonRankView}

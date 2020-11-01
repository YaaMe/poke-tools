import { TrainerRankViewProps } from './types';
import { PokemonHomeAPI, TrainerRankInfo, TrainerRankReqParam } from "../../../../API/PokemonHome";
import React, { Fragment, useEffect, useState } from "react";

const TrainerRankView = (props: TrainerRankViewProps) => {
    let { seasonID, season } = props;
    let { rst, ts1 } = season!;

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
        { rankList.map((trainer) => <p>{trainer.name}</p>) }
    </Fragment>
}

export {TrainerRankView}

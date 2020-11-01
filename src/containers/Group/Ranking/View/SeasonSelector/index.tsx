import React, { useEffect, useState } from "react";
import { SeasonSelectorProps } from "./types";
import { PokemonHomeAPI, Season, SeasonListReqBody } from "../../../../../API/PokemonHome";

export const SeasonSelector = (props: SeasonSelectorProps) => {
    let { rom, selectedSeason, seasonDispatch } = props;
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

    if (error)
        return <p>{error.toString()}</p>

    return <select disabled={!seasons} value={selectedSeason} onChange={(event => seasonDispatch(event.target.value, seasons!))}>
        <option key='select' value='-1' disabled>{seasons ? 'Select season...' : 'Loading data...'}</option>
        {Object.keys(seasons ?? {}).reverse().map((v,i) => {
            const k = seasons![v][Object.keys(seasons![v]).pop()!]
            return <option key={i} value={v}>{k.name} {k.start} - {k.end}</option>
        })}
    </select>
}

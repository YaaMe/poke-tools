import React, {useEffect, useState} from 'react';
import {PokemonHomeAPI, Season, SeasonInfos, SeasonListReqBody} from './api';

export const PokemonRanking = () => {
    // const api = new PokemonHomeAPI();
    const [ rom, setRom ] = useState<SeasonListReqBody>({soft: "Sw"});

    return <PokemonHomeSeasonSelector rom={rom} />
}

class SeasonSelectorProps {
    season?: {
        [id: string]: SeasonInfos;
    };
    rom?: SeasonListReqBody;
}

const PokemonHomeSeasonSelector = (props: SeasonSelectorProps) => {
    let {rom} = props;
    rom = rom ?? { soft: "Sw" } as SeasonListReqBody;
    const api = new PokemonHomeAPI();
    const [ season, setSeason ] = useState<Season>();
    const [ error, setError ] = useState<string | undefined>();

    useEffect(() => {
        api.fetchSeasonList(rom!).then(
            (data) => setSeason(data.list),
            (err) => setError(`${err}`)
        );
    }, []);

    return <div>
        <select>
            {Object.keys(season ?? {}).reverse().map((v,i) => {
                const k = season![v][Object.keys(season![v]).pop()!]
                return <option key={i} value={v}>{k.name} {k.start} - {k.end}</option>
            })}
        </select>
    </div>
}

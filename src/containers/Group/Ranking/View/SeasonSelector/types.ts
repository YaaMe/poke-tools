import { Season, SeasonInfos, SeasonListReqBody } from "../../../../../API/PokemonHome";

class SeasonSelectorProps {
    season?: {
        [id: string]: SeasonInfos;
    };
    rom?: SeasonListReqBody;
    selectedSeason?: string;
    seasonDispatch!: (seasonID: string, seasons: Season) => void;
}

export {SeasonSelectorProps};

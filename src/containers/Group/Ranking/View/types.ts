import {SeasonInfo} from "../../../../API/PokemonHome";

class SeasonViewProps {
    season?: SeasonInfo;
}

class TrainerRankViewProps extends SeasonViewProps {
    seasonID!: string;
}

class PokemonRankViewProps extends SeasonViewProps {
    seasonID!: string;
}


export {SeasonViewProps, TrainerRankViewProps, PokemonRankViewProps}

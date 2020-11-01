import { Season } from "../../../API/PokemonHome";

interface PokemonRankingState {
    seasonID?: string;
    seasons?: Season;
}

interface SeasonReducerAction {
    type: string;
    season: string;
    seasons: Season;
}

export type {PokemonRankingState, SeasonReducerAction};

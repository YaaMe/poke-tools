import {BattlePokedex} from './data/pokedex';
export const findDex = (id: any) => {
    return BattlePokedex[id];
}

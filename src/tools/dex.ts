import {BattlePokedex} from './data/pokedex';
// TODO -Gmax -Mega
export const findDex = (id: any) => {
    return id ? BattlePokedex[id] : undefined;
}

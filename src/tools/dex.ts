import { BattlePokedex } from './data/pokedex';
import { swsh_no } from './dex_filter';

// TODO -Gmax -Mega
export const findDex = (id: any) => {
    return id ? BattlePokedex[id] : undefined;
}

export const getNationalDex = () => {
    return Object.values(BattlePokedex).sort(function(a, b) {
        return a.num - b.num;
    });
}

export const getPartDex = (filter, dex) => {
    if (dex) {
        return dex.filter(filter);
    }
    return getNationalDex().filter(filter);
}

export const getSwShDex = () => {
    return getPartDex(dex => swsh_no.includes(dex.num))
}

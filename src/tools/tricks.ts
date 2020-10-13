import { v4 as uuid } from 'uuid';
import { resourcePrefix } from './constants';

export const genId = () => uuid();
export const packId = obj => ({...obj, uuid: uuid() })

export const getPokeIconNum = (num, isFemale, facingLeft) => {
    // let num = 0;
    // num = findDex(id).num;
    if (num < 0 || num > 890) num = 0;
    /* if (isFemale) {
		   if (['unfezant', 'frillish', 'jellicent', 'meowstic', 'pyroar'].includes(id)) {
		   num = BattlePokemonIconIndexes[id + 'f'];
		   }
	     }
	     if (facingLeft) {
		   if (BattlePokemonIconIndexesLeft[id]) {
		   num = BattlePokemonIconIndexesLeft[id];
		   }
	     } */
    return num;
}

export const getPokeIcon = (id, num) => {
    let n = getPokeIconNum(num);
    let top = Math.floor(n / 12) * 30;
	  let left = (n % 12) * 40;
    // TODO ground type male female
    // let fainted = ((pokemon as Pokemon | ServerPokemon)?.fainted ? `;opacity:.3;filter:grayscale(100%) brightness(.5)` : ``);
    // return `background:transparent url(${Dex.resourcePrefix}sprites/pokemonicons-sheet.png?g8) no-repeat scroll -${left}px -${top}px${fainted}`;
    return `transparent url(${resourcePrefix}sprites/pokemonicons-sheet.png?v2) no-repeat scroll -${left}px -${top}px`;
}

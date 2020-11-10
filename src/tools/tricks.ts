import { v4 as uuid } from 'uuid';
import { resourcePrefix } from './constants';
import { Dex } from 'res/showdown/sim/dex';
import { Items as BattleItems } from 'res/showdown/data/items';

const toID = Dex.toID;

export const initMember = dex => ({
    dex,
    detail: {
        moveSlot: ['', '', '', ''],
        ability: '',
        item: '',
        ivs: [],
        evs: [],
    }
})

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

export const getItemIcon = (item) => {
    if (!item) return '';
    let target = BattleItems[toID(item)] || {};
    let num = target.spritenum || 0;

		let top = Math.floor(num / 16) * 24;
		let left = (num % 16) * 24;
    return `transparent url(${resourcePrefix}sprites/itemicons-sheet.png?g8) no-repeat scroll -${left}px -${top}px`;
}

export const getPokeDexImg = (name, num) => {
    return `url(${resourcePrefix}sprites/dex/${name}.png) no-repeat`
}

export const toPokeID = toID;

// getTeambuilderSprite(pokemon: any, gen: number = 0) {
// 		if (!pokemon) return '';
// 		const data = this.getTeambuilderSpriteData(pokemon, gen);
// 		const shiny = (data.shiny ? '-shiny' : '');
// 		return 'background-image:url(' + Dex.resourcePrefix + data.spriteDir + shiny + '/' + data.spriteid + '.png);background-position:' + data.x + 'px ' + data.y + 'px;background-repeat:no-repeat';
// }

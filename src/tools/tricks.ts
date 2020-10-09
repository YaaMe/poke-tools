import { v4 as uuid } from 'uuid';

export const genId = () => uuid();
export const packId = obj => ({...obj, uuid: uuid() })

import { v4 as uuid } from 'uuid';

export const packId = obj => ({...obj, uuid: uuid() })

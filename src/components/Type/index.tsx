import React from 'react';
import { resourcePrefix } from 'tools/constants';

const Type = ({type}) => (<img src={`${resourcePrefix}/sprites/types/${type}.png`}/>);

export default Type;

import React from 'react';

import SelectDex from './SelectDex';
import Details from './Details';

const BuildMember = ({member = {}}) => {
  return (
    <div>
      {JSON.stringify(member)}
    </div>
  )
}

const InfoArea = ({dex, onSelect, info = {page: ''}}) => {
  switch (info.page) {
    case 'dex': return <SelectDex onSelect={onSelect} />;
    case 'detail': return <Details detail={dex}/>;
    case 'item':;
    case 'ability':;
    case 'move':;
    case 'stats':;
    default:
      if (dex) {
        return <BuildMember member={dex} />
      }
      return <SelectDex onSelect={onSelect}/>
  }
}

export default InfoArea;

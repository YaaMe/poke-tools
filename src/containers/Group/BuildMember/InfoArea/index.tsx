import React from 'react';

import SelectDex from './SelectDex';
import Details from './Details';

// item
const BuildMember = ({member = {}}) => {
  return (
    <div>
      {JSON.stringify(member)}
    </div>
  )
}

const InfoArea = ({member, onSelect, info = {page: ''}}) => {

  switch (info.page) {
    case 'dex': return <SelectDex onSelect={onSelect} />;
    case 'detail': return <Details detail={member}/>;
    case 'item':;
    case 'ability':;
    case 'move':;
    case 'stats':;
    default:
      if (member) {
        // select page, default item
        return <BuildMember member={member} />
      }
      return <SelectDex onSelect={onSelect}/>
  }
}

export default InfoArea;

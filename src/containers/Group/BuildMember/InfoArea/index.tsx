import React from 'react';

import SelectDex from './SelectDex';
import Level from './Level';

// item
const BuildMember = ({member = {}}) => {
  return (
    <div>
      {JSON.stringify(member)}
    </div>
  )
}

const InfoArea = ({member, updateMember, info = {page: ''}}) => {

  switch (info.page) {
    case 'dex': return <SelectDex onSelect={updateMember} />;
    case 'level': return <Level member={member} onUpdateMember={updateMember} />;
    case 'item':;
    case 'ability':;
    case 'move':;
    case 'stats':;
    default:
      if (member) {
        // select page, default item
        return <BuildMember member={member} />
      }
      return <SelectDex onSelect={updateMember}/>
  }
}

export default InfoArea;

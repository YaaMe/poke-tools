import React from 'react';

import Level from './Level';
import SelectDex from './SelectDex';
import SelectItem from './SelectItem';
import SelectAbility from './SelectAbility';
import SelectMove from './SelectMove';
import SetStats from './SetStats';

// item
const BuildMember = ({member = {}}) => {
  return (
    <div>
      {JSON.stringify(member)}
    </div>
  )
}



const InfoArea = ({member = {}, updateMember, info = {page: ''}}) => {

  switch (info.page) {
    case 'dex': return <SelectDex onSelect={updateMember} />;
    case 'level': return <Level member={member} onUpdateMember={updateMember} />;
      // TODO setting update action
    case 'item': return <SelectItem member={member} onSelect={updateMember} />;
    case 'ability': return <SelectAbility member={member} onSelect={updateMember} />;
    case 'move': return <SelectMove member={member} onSelect={updateMember} slot={info.addon} />;
    case 'stats': return <SetStats member={member} onSet={updateMember} />;
    default:
      if (member.dex) {
        // select page, default item
        return <BuildMember member={member} />
      }
      return <SelectDex onSelect={updateMember}/>
  }
}

export default InfoArea;

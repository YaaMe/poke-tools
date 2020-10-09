import React from 'react';

import SelectDex from './SelectDex';

const BuildMember = ({member = {}}) => {
  return (
    <div>
      {JSON.stringify(member)}
    </div>
  )
}

const Member = ({dex, onSelect}) => {
  if (dex) {
    return <BuildMember member={dex} />
  }
  return <SelectDex onSelect={onSelect}/>
}

export default Member

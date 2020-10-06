import React from 'react';

import SelectDex from './SelectDex';

const BuildMember = ({member = {}}) => {
  return (
    <div>
      {JSON.stringify(member)}
    </div>
  )
}

const Member = ({dex}) => {
  if (dex) {
    return <BuildMember member={dex} />
  }
  return <SelectDex/>
}

export default Member

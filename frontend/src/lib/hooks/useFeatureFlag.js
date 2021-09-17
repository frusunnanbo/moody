import { useState, useEffect } from 'react';

import { fetchFeatureFlags } from '../api/client';

export const useFeatureFlag = (flag, roomName) => {
  
  const [state, setState] = useState()

  useEffect(() => {
    setState(undefined)

    fetchFeatureFlags(flag, roomName)
      .then((flags) => {
          const flagActive = !!flags[flag]
        setState(flagActive);
      })
  }, [flag, roomName]);

  return state
}
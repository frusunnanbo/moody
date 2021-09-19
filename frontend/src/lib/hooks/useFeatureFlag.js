import { useState, useEffect } from "react";

import { fetchFeatureFlags } from "../api/client";

export const useFeatureFlag = (roomName, flag) => {
  const [state, setState] = useState();

  useEffect(() => {
    setState(undefined);

    fetchFeatureFlags(roomName).then((flags) => {
      const flagActive = !!flags[flag];
      setState(flagActive);
    });
  }, [roomName, flag]);

  return state;
};

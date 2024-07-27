"use client";

import { useEffect, useState } from "react";

type Props = {
  setToken: () => Promise<void>;
};

export const SetAuthToken = ({ setToken }: Props) => {
  const [settingToken, setSettingToken] = useState(false);
  useEffect(() => {
    if (settingToken) return;
    setSettingToken(true);
    setToken().finally(() => setSettingToken(false));
  }, []);
  return <></>;
};

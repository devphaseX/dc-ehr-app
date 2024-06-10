import { useCallback, useState } from 'react';

export const useUpdate = () => {
  const [, update] = useState(Math.random());
  return useCallback(() => {
    update(Math.random());
  }, []);
};

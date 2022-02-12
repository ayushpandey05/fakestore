import {useEffect, EffectCallback} from 'react';

const useDidUnmount = (fn: () => any) => {
  useEffect(() => {
    return fn;
  }, []);
};

export default useDidUnmount;

import {DependencyList, EffectCallback, useEffect, useRef} from 'react';

const useDidUpdate = (fn: EffectCallback, deps: DependencyList | undefined) => {
  const ref: any = useRef();
  useEffect(() => {
    if (!ref.current) {
      ref.current = true;
    } else {
      fn();
    }
  }, deps);
};

export default useDidUpdate;

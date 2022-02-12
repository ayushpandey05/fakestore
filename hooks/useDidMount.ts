import {useEffect, EffectCallback} from 'react';

const useDidMount = (fn: EffectCallback) => {
  useEffect(fn, []);
};

export default useDidMount;

import axios from 'axios';
import {useRef} from 'react';
import {SvgCssUri} from 'react-native-svg';
import {useStore} from '../../components/Storage';
import useDidMount from '../../hooks/useDidMount';
import useDidUpdate from '../../hooks/useDidUpdate';
import useMultiState from '../../hooks/useMultiState';
import AxiosInstance from '../../utils/axios';

const useFavouritesData = () => {
  const refCount: any = useRef();
  if (!refCount.current) {
    refCount.current = 1;
  }

  const [state, setState] = useMultiState({});
  const {data}: any = useStore();
  const {savedProducts} = data || {};
  const getData = () => {
    const counter = refCount.current + 1;
    refCount.current = counter;
    // console.log('@@@@@@@@empty', counter, refCount.current);
    if (Array.isArray(savedProducts) && savedProducts?.length) {
      setState({isFetching: true});
      const promises: any = [];
      savedProducts.forEach(item => {
        promises.push(AxiosInstance.get(`products/${item}`));
      });
      axios
        .all(promises)
        .then(res => {
          if (counter == refCount.current) {
            let data: any[] = [];
            res.forEach(singleResponse => {
              const {data: singleData}: any = singleResponse;
              data.push(singleData);
            });
            //   console.log('@@@@@@@@emptyset', counter, refCount.current);
            setState({data, isFetching: false});
          }
        })
        .catch(() => {
          setState({isFetching: false});
        });
    } else {
      if (counter == refCount.current) {
        setState({data: [], isFetching: false});
      }
    }
  };

  useDidMount(getData);
  useDidUpdate(getData, [savedProducts]);

  return {state, setState};
};

export default useFavouritesData;

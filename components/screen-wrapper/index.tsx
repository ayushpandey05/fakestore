import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import useDidMount from '../../hooks/useDidMount';
import useMultiState from '../../hooks/useMultiState';
import AxiosInstance from '../../utils/axios';
import Button from '../button';
import Indicator from '../indicator';

const fetchData = async (uri: string, filters?: any) => {
  // console.log('@@@@@@uri', uri)
  let finalurl = uri;
  if (filters) {
    const filterKeys = Object.keys(filters);
    filterKeys.forEach((item: string, index: number) => {
      if (filters[item]) {
        finalurl = finalurl + '?' + filters[item];
      }
    });
  }
  return await AxiosInstance.get(finalurl);
};

const ScreenWrapper = (Component: any, uri: string) => {
  const initialState = {
    isFetching: true,
  };

  return (props: any) => {
    const isMountRef = useRef();
    const {filters: filtersFromParams, uri: extraUri} = props?.params || {};

    const finalUri = uri + (extraUri ? `/${extraUri}` : '');

    const [state, setState] = useMultiState({
      ...initialState,
      filters: filtersFromParams,
    });

    const {filters, isFetching, data} = state || {};

    const reloadScreenData = () => {
      setState({isFetching: true});
      fetchData(finalUri, filters)
        .then(res => {
          const {data}: any = res;
          setState({data, isFetching: false});
        })
        .catch(err => {
          // console.log('@@erroe!>>>', err);
          setState({isFetching: false});
        });
    };

    useDidMount(() => {
      isMountRef.current = true;
      fetchData(finalUri, filters)
        .then(res => {
          const {data}: any = res || {};
          setState({data, isFetching: false});
        })
        .catch(() => {
          setState({isFetching: false});
        });
    });

    const renderScreen = () => {
      if (data) {
        return (
          <Component {...props} screenState={state} setScreenState={setState} />
        );
      }
      if (!isFetching) {
        return (
          <View style={styles.screenCenter}>
            <Button title="Reload" onPress={reloadScreenData} />
          </View>
        );
      }
      return void 0;
    };

    return (
      <View style={styles.container}>
        {renderScreen()}
        <Indicator visible={isFetching} />
      </View>
    );
  };
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {useStore} from '../../components/Storage';
import useDidMount from '../../hooks/useDidMount';
import {colors} from '../../theme/colors';

const Authenticate = ({navigation}: any) => {
  const {data, setData}: any = useStore();
  const {token} = data || {};
  // console.log('@@@data!>>>', JSON.stringify(data), token)
  useDidMount(() => {
      if (token) {
          navigation.replace('main');
        } else {
      navigation.replace('login');
    }
  });

  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <ActivityIndicator color={colors.primary} />
    </View>
  );
};

export default Authenticate;

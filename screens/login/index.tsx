import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {ArrowRightSVG} from '../../assets/svgs';
import Button from '../../components/button';
import {useStore} from '../../components/Storage';
import TextInput from '../../components/text-input';
import useMultiState from '../../hooks/useMultiState';
import {colors} from '../../theme/colors';
import {fonts} from '../../theme/fonts';
import AxiosInstance from '../../utils/axios';

const Login = ({navigation}) => {
  const [state, setState] = useMultiState({});

  const {data: localStoreData, setData: setLocalStoreData}: any = useStore();

  const {username, password, submitting} = state || {};

  const onChangeUsername = (value: string) => {
    setState({username: value});
  };
  const onChangePassword = (value: string) => {
    setState({password: value});
  };

  const onSubmit = () => {
    setState({submitting: true});
    !submitting &&
      AxiosInstance.post('auth/login', {
        username: 'mor_2314',
        password: '83r5^_',
        // username,
        // password,
      })
        .then(res => {
          setLocalStoreData({token: res.data.token});
          navigation.reset('main');
          // console.log('@@@@@@@@>>>>>>>>>>>>res', res.data);
        })
        .catch(err => {
          setState({submitting: false});
          // console.log('@@@@@@@@>>>>>>>>>>>>err', err);
        });
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.background, padding: 16}}>
      <Text style={{...fonts.metropolisHeadline, marginBottom: 73}} >{'Login'}</Text>
      <TextInput
        onChangeValue={onChangeUsername}
        label="Username"
        placeholder="Enter your username"
        value={username}
      />
      <TextInput
        label="Password"
        placeholder="Enter your password"
        secureTextEntry
        onChangeValue={onChangePassword}
        value={password}
      />
      <TouchableOpacity
        activeOpacity={0.5}
        style={{flexDirection: 'row', alignSelf: 'flex-end', marginBottom: 32}}>
        <Text style={styles.forgotText}>{'Forgot your password?'}</Text>
        <ArrowRightSVG />
      </TouchableOpacity>
      {submitting ? (
        <View
          style={{height: 48, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : (
        <Button onPress={onSubmit} title="Login" />
      )}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  forgotText: {
    ...fonts.metropolis14px,
    color: colors.white,
  },
});

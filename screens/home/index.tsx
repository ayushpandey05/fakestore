import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Banner} from '../../assets/images';
import ScreenWrapper from '../../components/screen-wrapper';
import {colors} from '../../theme/colors';
import {fonts} from '../../theme/fonts';

const Home = ({screenState, navigation}: any) => {
  const {data} = screenState || {};
  const renderHeader = () => {
    return (
      <View>
        <Image source={Banner} resizeMode="stretch" style={{width: '100%'}} />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader()}
        contentContainerStyle={{paddingHorizontal: 16}}
        data={data}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.push('productList', {uri: item, title: item});
              }}
              activeOpacity={0.5}
              style={{
                height: 100,
                marginVertical: 8,
                backgroundColor: colors.dark,
                justifyContent: 'center',
                borderRadius: 8,
              }}>
              <Text
                style={{
                  textTransform: 'capitalize',
                  marginLeft: 23,
                  ...fonts.metropolisHeadline3,
                  color: colors.white,
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ScreenWrapper(Home, 'products/categories');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

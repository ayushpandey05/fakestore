import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  FavouritesActiveSVG,
  FavouritesInactiveSVG,
  LeftIconSVG,
  StarActiveSVG,
  StarInactiveSVG,
} from '../../assets/svgs';
import ScreenWrapper from '../../components/screen-wrapper';
import {useStore} from '../../components/Storage';
import {colors} from '../../theme/colors';
import {fonts} from '../../theme/fonts';

const RenderRating = ({rating}: any) => {
  rating = Math.floor(rating);
  const renderStar = value => {
    let StarComponent = value <= rating ? StarActiveSVG : StarInactiveSVG;
    return <StarComponent width={14} height={14} />;
  };
  return (
    <View style={{flexDirection: 'row', marginTop: 7}}>
      {renderStar(1)}
      {renderStar(2)}
      {renderStar(3)}
      {renderStar(4)}
      {renderStar(5)}
    </View>
  );
};

const SaveProduct = ({item}) => {
  const {data, setData}: any = useStore();
  const {savedProducts} = data;
  let isSaved = false;
  let productIndex = -1;
  if (Array.isArray(savedProducts)) {
    productIndex = savedProducts.findIndex(product => product === item.id);
    if (productIndex !== -1) {
      isSaved = true;
    }
  }

  const Component = isSaved ? FavouritesActiveSVG : FavouritesInactiveSVG;

  const onPress = () => {
    if (isSaved) {
        let tempProducts = [...savedProducts]
    
        tempProducts.splice(productIndex, 1);
      setData({savedProducts: tempProducts});
    } else {
      let newSavedProducts: any[] = [];
      if (Array.isArray(savedProducts)) {
        newSavedProducts = [...savedProducts];
      }

      setData({savedProducts: [...newSavedProducts, item.id]});
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={{
        width: 36,
        height: 36,
        position: 'absolute',
        right: 0,
        top: 184 - 18,
        backgroundColor: colors.dark,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Component width={12} height={12} />
    </TouchableOpacity>
  );
};

const ProductList = ({screenState, params, navigation}: any) => {
  const {data} = screenState;
  const {title}=params || {}

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}} >
        <TouchableOpacity onPress={navigation.goBack} style={{width: 56, height: 56, justifyContent: 'center', alignItems: 'center'}}>
          <LeftIconSVG width={24} height={24} />
        </TouchableOpacity>
        <View style={{flex: 1}} >
            <Text style={{textAlign: 'center', ...fonts.metropolisHeadline3, color: colors.white, textTransform: 'capitalize'}} >{title}</Text>
        </View>
        <TouchableOpacity activeOpacity={1} style={{width: 56, height: 56, justifyContent: 'center', alignItems: 'center'}}>
          {/* <LeftIconSVG width={24} height={24} /> */}
        </TouchableOpacity>
      </View>
      <FlatList
        contentContainerStyle={{paddingHorizontal: 8}}
        data={data}
        numColumns={2}
        renderItem={({item, index}) => {
          const {id, title, price, description, category, image, rating} = item;
          return (
            <View style={{flex: 1, marginVertical: 13, marginHorizontal: 8}}>
              <Image
                source={{uri: image}}
                style={{width: '100%', height: 184}}
                resizeMode="cover"
              />
              <RenderRating rating={rating.rate} />
              <Text
                style={{
                  marginTop: 6,
                  textTransform: 'capitalize',
                  ...fonts.metropolis11px,
                  color: colors.gray,
                }}>
                {category}
              </Text>
              <Text
                style={{
                  marginTop: 5,
                  ...fonts.metropolis16px,
                  color: colors.white,
                }}>
                {title}
              </Text>
              <Text
                style={{
                  marginTop: 3,
                  ...fonts.metropolis14px,
                  color: colors.white,
                }}>{`$${price}`}</Text>
              <SaveProduct item={item} />
            </View>
          );
        }}
      />
    </View>
  );
};

export default ScreenWrapper(ProductList, 'products/category');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

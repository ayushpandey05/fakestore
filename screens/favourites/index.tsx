import React from 'react';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import {CloseIconSVG, StarActiveSVG, StarInactiveSVG} from '../../assets/svgs';
import Indicator from '../../components/indicator';
import { useStore } from '../../components/Storage';
import {colors} from '../../theme/colors';
import {fonts} from '../../theme/fonts';
import useFavouritesData from './useFavouritesData';

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

const Favourites = () => {
  const {state, setState} = useFavouritesData();
  const {data: localData, setData: setLocalData}: any=useStore()
  const {savedProducts}=localData
  const {data, isFetching} = state || {};
  return (
    <View style={{flex: 1}}>
      <Text style={{color: colors.ordinaryText}}>
        This is Favourites screen
      </Text>
      <FlatList
        contentContainerStyle={{paddingHorizontal: 16}}
        data={data}
        renderItem={({item}) => {
          const {id, title, price, description, category, image, rating} = item;

          const removeCurrentItem = ()=>{
            const itemIndex = savedProducts.findIndex(dataItem=>dataItem === id)
            if(itemIndex > -1){
              const newsavedProducts = [...savedProducts]
              newsavedProducts.splice(itemIndex, 1)
              setLocalData({savedProducts: newsavedProducts}) 
            }
          }

          return (
            <View
              style={{
                marginVertical: 14,
                height: 104,
                flexDirection: 'row',
                borderRadius: 8,
                overflow: 'hidden',
                backgroundColor: colors.dark,
              }}>
              <Image
                source={{uri: image}}
                style={{height: '100%', width: 100}}
              />
              <View
                style={{
                  flex: 1,
                  marginLeft: 12,
                  marginRight: 30,
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                }}>
                <View>
                  <Text
                    style={{
                      textTransform: 'capitalize',
                      ...fonts.metropolis11px,
                      color: colors.gray,
                    }}>
                    {category}
                  </Text>
                  <Text
                    style={{
                      ...fonts.metropolis16px,
                      color: colors.white,
                      marginTop: 3,
                    }}>
                    {title}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text>{`$${price}`}</Text>
                  <RenderRating rating={rating.rate} />
                </View>
              </View>
              <TouchableOpacity
              onPress={removeCurrentItem}
                style={{
                  position: 'absolute',
                  width: 40,
                  height: 40,
                  right: 0,
                  top: 0,
                }}>
                <CloseIconSVG width="100%" height="100%" />
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <Indicator visible={isFetching} />
    </View>
  );
};

export default Favourites;

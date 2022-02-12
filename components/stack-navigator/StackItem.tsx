import React, {useEffect, useRef} from 'react';
import {View, Animated, PanResponder, useWindowDimensions} from 'react-native';
import {colors} from '../../theme/colors';

interface StackItemProps {
  navigation: any;
  index: number;
}

const StackItem: React.FC<StackItemProps> = ({navigation, children, index}) => {
  const fadeAnim = useRef(new Animated.Value(index > 0 ? 0 : 1)).current; // Initial value for opacity: 0
  useEffect(() => {
    return Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const startX = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;

  const {width: windowWidth} = useWindowDimensions();

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if (gestureState.dx > 20) {
          return true;
        }
        return false;
      },
      onPanResponderStart: (evt, gestureState) => {
        startX.setValue(gestureState.x0);
      },
      onPanResponderMove: (evt, gestureState) => {
        if (!startX._value) {
          startX.setValue(gestureState.moveX);
        }
        if (Number(startX._value) <= 70 && gestureState.dx > 0) {
          translateX.setValue(gestureState.dx);
        }
      },
      onPanResponderEnd: (evt, gestureState) => {
        startX.setValue(0);
        if (translateX._value <= 100) {
          Animated.timing(translateX, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.timing(translateX, {
            toValue: windowWidth,
            duration: 250,
            useNativeDriver: true,
          }).start(navigation.goBack);
        }
      },
    }),
  ).current;

  const transform =
    index > 0
      ? [
          {
            translateX: translateX.interpolate({
              inputRange: [0, windowWidth],
              outputRange: [0, windowWidth],
            }),
          },
        ]
      : [];

  return (
    <View
      {...panResponder.panHandlers}
      style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
      <Animated.View
        style={{
          flex: 1,
          opacity: fadeAnim, // Bind opacity to animated value
          backgroundColor: colors.background,
          transform,
        }}>
        {children || void 0}
      </Animated.View>
    </View>
  );
};

export default StackItem;

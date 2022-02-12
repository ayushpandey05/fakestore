import React from 'react';
import {
  Text,
  TouchableOpacity,
  ButtonProps,
  TextProps,
  StyleSheet,
} from 'react-native';
import {colors} from '../../theme/colors';
import {fonts} from '../../theme/fonts';

interface Props extends ButtonProps {
  titleStyle?: TextProps;
}

const Button: React.FC<Props> = ({onPress, title, titleStyle}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.5}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    height: 48,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24
  },
  title: {
    color: colors.ordinaryText,
    ...fonts.metropolis14px,
  },
});

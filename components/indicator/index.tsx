import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {colors} from '../../theme/colors';

interface Props {
  visible?: boolean;
}

const Indicator: React.FC<Props> = ({visible}) => {
  if (!visible) {
    return null;
  }
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.primary} />
    </View>
  );
};

export default Indicator;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

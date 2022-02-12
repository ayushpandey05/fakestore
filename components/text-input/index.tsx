import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput as RNTextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  EyeCloseSVG,
  EyeOpenSVG,
  OutlineCheckSVG,
  OutlineCloseSVG,
} from '../../assets/svgs';
import {colors} from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import {TextInputProps} from './type';

const renderEye = (
  secureTextEntry: boolean | undefined,
  toggleEye: () => void,
  isSecure: boolean | undefined,
) => {
  if (!secureTextEntry) {
    return void 0;
  }
  return (
    <TouchableOpacity
      style={{width: 24, height: 24}}
      activeOpacity={0.5}
      onPress={toggleEye}>
      {isSecure ? (
        <EyeCloseSVG height="100%" width="100%" />
      ) : (
        <EyeOpenSVG height="100%" width="100%" />
      )}
    </TouchableOpacity>
  );
};

const renderCross = (onPressCross: (() => void) | undefined) => {
  return (
    <TouchableOpacity
      style={{width: 24, height: 24}}
      activeOpacity={0.5}
      onPress={onPressCross}>
      <OutlineCloseSVG width="100%" height="100%" />
    </TouchableOpacity>
  );
};

const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  secureTextEntry,
  value,
  onChangeValue,
  showCheck,
  showClose,
  error,
  onPressCross,
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);
  const toggleSecure = () => {
    setIsSecure(!isSecure);
  };
  const onChnageText = (newValue: string) => {
    if (typeof onChangeValue === 'function') {
      onChangeValue(newValue);
    }
  };
  const [isActive, setIsActive]=useState(false)

  const inputRef = useRef()

  const onPress = ()=>{
    inputRef.current?.focus && inputRef.current.focus()
  }

  const onFocus = ()=>{
    setIsActive(true)
  }

  const onBlur = ()=>{
    setIsActive(false)
  }

  return (
    <View style={styles.wrapper} >
      <TouchableOpacity onPress={onPress} activeOpacity={1} style={[styles.container, error && styles.errorContainer]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 4,
          }}>
          <View style={{flex: 1}}>
            <Text style={[styles.label, error && styles.errorLabel]}>
              {label}
            </Text>
            <RNTextInput
              placeholderTextColor={colors.gray}
              style={styles.input}
              placeholder={placeholder}
              secureTextEntry={isSecure}
              value={value}
              onChangeText={onChnageText}
              ref={inputRef}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </View>
          {renderEye(secureTextEntry, toggleSecure, isSecure)}
          {showClose ? (
            renderCross(onPressCross)
          ) : showCheck ? (
            <OutlineCheckSVG />
          ) : (
            void 0
          )}
        </View>
      </TouchableOpacity>
      {typeof error === 'string' ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        void 0
      )}
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 4,
  },
  container: {
    padding: 16,
    backgroundColor: colors.dark,
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.transparent,
  },
  errorContainer: {
    borderColor: colors.error,
  },
  label: {
    color: colors.gray,
    ...fonts.metropolis11px
  },
  errorLabel: {
    color: colors.error,
  },
  input: {
    padding: 0,
    color: colors.ordinaryText,
    marginBottom: 1,
    ...fonts.metropolis14px
  },
  errorText: {
    color: colors.error,
    marginTop: 4,
    marginLeft: 20,
    ...fonts.metropolis11px
  },
});

import React from 'react';
import {View} from 'react-native';

import TextInput from '../text-input';

const createForm = formData => {
  return props => {
    const {setValue, errors} = props;
    return (
      <View>
        {formData.map(item => {
          const {field, ...rest} = item;
          const onChangeValue = (newValue: string) => {
            setValue({[field]: newValue});
          };
          return <TextInput {...rest} error={errors?.[field]} onChangeValue={onChangeValue} />;
        })}
      </View>
    );
  };
};

export default createForm;

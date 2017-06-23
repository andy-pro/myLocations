import React from 'react';
import { Form as BaseForm, View, TextInput } from '../components';
import { IconButton } from '../__components/Icon';
import { removeSpecial } from '../__lib/utils';
import { colors, mainCSS } from '../styles';

const Form = ({ fields, mode, onSubmit, propsTextInput }) => {
  // console.log('form', fields, mode);
  return (
    <BaseForm style={mainCSS.form} onSubmit={onSubmit}>
      <View style={mainCSS.row}>
        <TextInput
          placeholder={mode === 'add' ? 'New entry' : 'Edit entry'}
          style={mainCSS.input}
          {...fields.name}
          {...propsTextInput}
        />
        <IconButton
          name={mode === 'add' ? 'md-add-circle' : 'md-edit'}
          backgroundColor={colors.primary}
          onPress={onSubmit}
          style={{ marginLeft: 10 }}
        />
      </View>
    </BaseForm>
  );
};

Form.model = {
  submit: 'onSubmit',
  fields: { fn: 'name', vd: 'required', pp: removeSpecial },
};

export default Form;

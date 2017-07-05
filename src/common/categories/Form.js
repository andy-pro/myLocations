import React from 'react';
import { Form as BaseForm, View, TextInput, IconButton } from '../components';
import { removeSpecial } from '../__lib/utils';
import { mainCSS } from '../styles';

const Form = ({ fields, mode, onSubmit, propsTextInput }) => {
  // console.log('form', fields, mode);
  return (
    <BaseForm style={[mainCSS.form, mainCSS.divider]} onSubmit={onSubmit}>
      <View style={mainCSS.formRow}>
        <TextInput
          placeholder={mode === 'add' ? 'New entry' : 'Edit entry'}
          style={mainCSS.input}
          {...fields.name}
          {...propsTextInput}
        />
        <IconButton
          name={mode === 'add' ? 'md-add-circle' : 'md-edit'}
          onPress={onSubmit}
        />
      </View>
    </BaseForm>
  );
};

Form.model = {
  submit: 'onSubmit',
  fields: { fn: 'name', vd: 'required', af: true, pp: removeSpecial },
};

export default Form;

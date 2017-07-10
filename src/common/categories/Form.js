import React from 'react';
import { Form as BaseForm, View, TextInput, IconButton } from '../components';
import { removeSpecial } from '../__lib/utils';
import { mainCSS } from '../styles';

const Form = ({ fields, mode, onSubmit, propsTextInput }) => {
  // console.log('form', fields.name.value, mode);
  let addMode = mode === 'pre_insert';
  return (
    <BaseForm style={[mainCSS.form, mainCSS.divider]} onSubmit={onSubmit}>
      <View style={mainCSS.formRow}>
        <TextInput
          placeholder={addMode ? 'New entry' : 'Edit entry'}
          style={mainCSS.input}
          {...fields.name}
          {...propsTextInput}
        />
        <IconButton
          name={addMode ? 'md-add-circle' : 'md-edit'}
          onPress={onSubmit}
          title="Save"
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

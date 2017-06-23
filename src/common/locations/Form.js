import React from 'react';
import { Form as BaseForm, View, TextInput, Picker } from '../components';
import { IconButton } from '../__components/Icon';
import { removeSpecial } from '../__lib/utils';
import { colors, mainCSS } from '../styles';

const Form = ({ fields, mode, onSubmit, propsTextInput, categories }) => {
  // console.log('locations form', fields, mode, categories);
  categories = [{ name: '-= No category =-', id: 0 }].concat(categories);
  return (
    <BaseForm style={mainCSS.form} onSubmit={onSubmit}>
      <View style={mainCSS.formRow}>
        <TextInput
          placeholder={mode === 'add' ? 'New entry' : 'Edit entry'}
          style={mainCSS.input}
          {...fields.name}
          {...propsTextInput}
        />
      </View>
      <View style={mainCSS.formRow}>
        <TextInput
          placeholder={'Address'}
          style={mainCSS.input}
          {...fields.address}
          {...propsTextInput}
        />
      </View>
      <View style={mainCSS.formRow}>
        <Picker {...fields.category} style={mainCSS.picker}>
          {categories.map(item =>
            <Picker.Item label={item.name} value={item.id} key={item.id} />
          )}
        </Picker>
      </View>
      <View style={mainCSS.formRow}>
        <TextInput
          placeholder={'Coordinates'}
          style={[mainCSS.input, { flex: 2 }]}
          {...fields.coords}
          {...propsTextInput}
        />
        <TextInput
          placeholder={'Zoom'}
          style={mainCSS.input}
          {...fields.zoom}
          {...propsTextInput}
        />
        <IconButton
          name={mode === 'add' ? 'md-add-circle' : 'md-edit'}
          backgroundColor={colors.primary}
          onPress={onSubmit}
          style={mainCSS.formBtn}
        />
      </View>
    </BaseForm>
  );
};

Form.model = {
  submit: 'onSubmit',
  fields: [
    { fn: 'name', vd: 'required', pp: removeSpecial },
    { fn: 'address', vd: 'required', pp: removeSpecial },
    { fn: 'category', type: 'picker' },
    { fn: 'coords', vd: 'isCoords', pp: removeSpecial },
    { fn: 'zoom' },
  ],
};

export default Form;

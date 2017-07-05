import React from 'react';
import { Form as BaseForm, View, TextInput, Picker, IconButton } from '../components';
import { removeSpecial } from '../__lib/utils';
import validator from '../__lib/validator';
import { colors, mainCSS } from '../styles';

const coordsToUrl = ({ coords, zoom }) => {
  coords = coords.value;
  zoom = zoom.value;
  let url = '/map';
  if (validator.isCoords(coords)) {
    url += `/@${coords.replace(/\s/g, '')}`;
    if (validator.isDecimal(zoom)) {
      url += `,${zoom}z`;
    }
  }
  return url;
};

const Form = ({ fields, mode, onSubmit, propsTextInput, categories, history }) => {
  // console.log('locations form', fields, mode, categories);
  categories = [{ name: '-= No category =-', id: 0 }].concat(categories);
  return (
    <BaseForm style={[mainCSS.form, mainCSS.divider]} onSubmit={onSubmit}>
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
        <TextInput
          placeholder={'Coordinates'}
          style={mainCSS.input}
          {...fields.coords}
          {...propsTextInput}
        />
        <IconButton
          name="md-my-location"
          style={mainCSS.formBtn}
          onPress={() => history.push(coordsToUrl(fields))}
          title="Show on map"
        />
      </View>
      <View style={mainCSS.formRow}>
        <Picker {...fields.category} style={[mainCSS.picker, { flex: 3 }]}>
          {categories.map(item =>
            <Picker.Item label={item.name} value={item.id} key={item.id} />
          )}
        </Picker>
        <TextInput
          placeholder={'Zoom'}
          style={mainCSS.input}
          {...fields.zoom}
          {...propsTextInput}
          title="Save changes"
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
    { fn: 'name', vd: 'required', pp: removeSpecial, af: true },
    { fn: 'address', vd: 'required', pp: removeSpecial },
    { fn: 'category', type: 'picker' },
    { fn: 'coords', vd: 'isCoords', pp: removeSpecial },
    { fn: 'zoom' },
  ],
};

export default Form;

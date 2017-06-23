import React, { Component } from 'react';

import create from './createComponent';

export const Text = create('span', ['data-path', 'onPress', 'onLongPress']);

export const View = create('div', ['data-path', 'onKeyDown', 'onPress', '$ref']);

export const AnchorLink = create('a', ['download', 'href', 'target']);

export const Button = create('button', ['onClick', 'title']);

export const TextInput = create('input', [
  'required',
  'placeholder',
  'onChangeText',
  'value',
  'autoFocus',
  'onFocus',
  'onBlur',
  '$ref',
  'editable',
  'step',
  { type: 'text' },
]);

export const FileInput = create('input', ['onChangeText', '$ref', { type: 'file' }]);

// export const Form = create('form', ['onSubmit', 'onKeyDown']);
const BaseForm = create('form', ['onSubmit', 'onKeyDown']);
export const Form = ({ children, ...props }) =>
  <BaseForm {...props}>
    {children}
    <Button style={{ display: 'none' }} />
  </BaseForm>;

export const TouchableVirtual = create('div', ['underlayColor', 'onLongPress']);

export const TouchableHighlight = create('div', [
  'underlayColor',
  'onPress',
  'onLongPress',
  'title',
  '$ref',
]);

export const TouchableOpacity = TouchableHighlight;

export const ScrollView = create('div', ['onPress']);

export const Image = create('img', ['source', 'width']);

const Select = create('select', ['selectedValue', 'onValueChange', 'enabled', '$ref']);

const Option = create('option', ['value']);

export class Picker extends Component {
  static Item = ({ label, value }) =>
    <Option value={value}>
      {label}
    </Option>;

  render() {
    let { children, ...props } = this.props;
    return (
      <Select {...props}>
        {children}
      </Select>
    );
  }
}

export const Svg = create('svg', ['width', 'height', 'viewBox']);
export const G = create('g', ['fill', 'stroke', 'strokeWidth']);
export const Path = create('path', ['d']);

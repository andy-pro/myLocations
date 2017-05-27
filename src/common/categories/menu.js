import React, { Component } from 'react'
import { connect } from 'react-redux'
import shortid from 'js-shortid'

import { categoryAction } from './actions'
import { resetMenu } from '../app/actions'
import { removeSpecial, findDuplicate } from '../__lib/utils'
import { Form, View, TextInput, Icon, Checkbox, Alert, FormWrapper } from '../__components';

import { colors, mainCSS, iconBtnCSS, checkboxCSS } from '../__themes'

class CategoryMenu extends Component {

  shouldComponentUpdate({ mode, entry }) {
    let editMode = mode === 'edit',
        newEntry = entry !== this.props.entry && editMode,
        newMode = mode !== this.props.mode && editMode
    if (newEntry || newMode) {
      this.props.fields.__setState({
        name: entry.name
      })
      setTimeout(this.setFocus)
      return false
    }
    return true
  }

  componentWillMount() {
    let { mode, entry, fields } = this.props
    if (mode === 'edit') {
      fields.__setState({
        name: entry.name
      })     
    }
  }

  componentDidMount() {
    this.setFocus() 
  }

  setFocus = () => {
    if (this.props.mode) this.props.fields.__refs.name.focus()
  }

  onSubmit = e => {
    let data = this.props.fields.__submits.onSubmit(e)
    if (!data) return
    // console.log('data', data, this.props.entry);
    let { mode, list, entry } = this.props,
        { name } = data,
        _add = mode === 'add'
    // if (name === entry.name) return
    if (findDuplicate(list, name)) {
      return Alert.alert('The same entry already exists!')
    }
    if (_add) data.id = shortid.gen()
    let payload = { data }
    if (mode === 'edit') payload.id = entry.id
    this.props.categoryAction(payload, mode)
    if (_add) {
      this.props.fields.__resetState(0)
    } else {
      this.props.resetMenu()
    }
  }

  render() {
    let { fields, mode, entry } = this.props
    // console.log('category menu render', fields.name);
    // ios-paper-plane-outline
    return (
        <View style={mainCSS.form}>

          <Form
            style={mainCSS.row}
            onSubmit={this.onSubmit}
          >
            <TextInput
              placeholder={mode === 'add' ? 'New entry' : 'Edit entry'}
              { ...fields.name }
              { ...this.propSet0 }
            />
            <Icon.Button
              name={mode === 'add' ? 'ios-add-circle-outline' : 'ios-create-outline'}
              backgroundColor={colors.success}
              onPress={this.onSubmit}
              style={iconBtnCSS}
            />
          </Form>

        </View>

    )
  }

  propSet0 = {
    // onBlur: this.onBlur,
    // required: true,
    style: [mainCSS.input, {marginRight: 10}],
    keyboardType: 'default',
    returnKeyType: 'done',
    autoCapitalize: 'sentences',
    // autoCorrect: true  // true is default
  }

}

export default FormWrapper(
  { submit: 'onSubmit', fields: { fn: 'name', vd: 'required', pp: removeSpecial } },
)(connect(
  null,
  { categoryAction, resetMenu }
)(CategoryMenu))

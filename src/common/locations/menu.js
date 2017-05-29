import React, { Component } from 'react'
import { connect } from 'react-redux'
import shortid from 'js-shortid'

import { locationAction } from './actions'
import { resetMenu } from '../app/actions'
import { removeSpecial, findDuplicate, getNameById } from '../__lib/utils'
import { Form, View, TextInput, Picker, Icon, Checkbox, Alert, FormWrapper } from '../__components';

import { colors, mainCSS, iconBtnCSS, checkboxCSS } from '../__themes'

class LocationMenu extends Component {

  shouldComponentUpdate({ mode, entry }) {
    let editMode = mode === 'edit',
        newEntry = entry !== this.props.entry && editMode,
        newMode = mode !== this.props.mode && editMode
    if (newEntry || newMode) {
      // console.log('entry', entry);
      this.setFields(entry)
      setTimeout(this.setFocus)
      return false
    }
    return true
  }

  componentWillMount() {
    let { mode, entry, fields } = this.props
    if (mode === 'edit') this.setFields(entry)
  }

  componentDidMount() {
    this.setFocus() 
  }

  setFields = entry => 
    this.props.fields.__setState({
      name: entry.name,
      // category: getNameById(this.props.categories, entry.category),
      category: entry.category,
      address: entry.address,
      coords: entry.coords.toString()
    })

  setFocus = () => {
    if (this.props.mode) this.props.fields.__refs.name.focus()
  }

  onSubmit = e => {
    let data = this.props.fields.__submits.onSubmit(e)
    if (!data) return
    // console.log('on submit data', data, this.props.entry);
    let { mode, list, entry } = this.props,
        { name } = data,
        _add = mode === 'add'
    // if (name === entry.name) return
    if (mode === 'add' && findDuplicate(list, name)) {
      return Alert.alert('The same entry already exists!')
    }
    if (_add) data.id = shortid.gen()
    let payload = { data }
    if (mode === 'edit') payload.id = entry.id
    data.coords = data.coords.split(',')
    this.props.locationAction(payload, mode)
    if (_add) {
      this.props.fields.__resetState(0)
    } else {
      this.props.resetMenu()
    }
  }

  render() {
    let { fields, mode, entry, categories } = this.props
    // console.log('category menu render', fields.category);
    // ios-paper-plane-outline
    categories = [{name: '-= No category =-', id: 0}].concat(categories)
    return (

      <Form
        style={mainCSS.form}
        onSubmit={this.onSubmit}
      >

        <View style={mainCSS.row}>
          <TextInput
            placeholder={mode === 'add' ? 'New entry' : 'Edit entry'}
            style={mainCSS.input}
            { ...fields.name }
            { ...this.propSet0 }
          />
        </View>
        <View style={mainCSS.row}>
          <TextInput
            placeholder={'Address'}
            style={mainCSS.input}
            { ...fields.address }
            { ...this.propSet0 }
          />
        </View>
        <View style={mainCSS.row}>
          <Picker
            { ...fields.category }
            style={mainCSS.picker}
          >
            {categories.map(item => 
              <Picker.Item label={item.name} value={item.id} key={item.id} />                  
            )}
          </Picker>              
        </View>
        <View style={mainCSS.row}>
          <TextInput
            placeholder={'Coordinates'}
            style={[mainCSS.input, {marginRight: 10}]}
            { ...fields.coords }
            { ...this.propSet0 }
          />
          <Icon.Button
            name={mode === 'add' ? 'ios-add-circle-outline' : 'ios-create-outline'}
            backgroundColor={colors.success}
            onPress={this.onSubmit}
            style={iconBtnCSS}
          />
        </View>

      </Form>

    )
  }

  /*
          <Icon.Button
            name={'ios-globe'}
            backgroundColor={colors.success}
            onPress={(e) => { e.stopPropagation() }}
            style={iconBtnCSS}
            buttonStyle={{marginRight: 10}}
          >
            Get Coords (not yet implemented)
          </Icon.Button>
  
  */

  propSet0 = {
    // onBlur: this.onBlur,
    // required: true,
    keyboardType: 'default',
    returnKeyType: 'done',
    autoCapitalize: 'sentences',
    // autoCorrect: true  // true is default
  }

}

export default FormWrapper(
  { submit: 'onSubmit', 
    fields: [
      { fn: 'name', vd: 'required', pp: removeSpecial },
      { fn: 'address', vd: 'required', pp: removeSpecial },
      { fn: 'category', type: 'picker' },
      { fn: 'coords', vd: 'coordinates', pp: removeSpecial },
    ]
  },
)(connect(
  null,
  { locationAction, resetMenu }
)(LocationMenu))

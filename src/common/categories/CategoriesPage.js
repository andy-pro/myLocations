import React, { Component } from 'react'
import { connect } from 'react-redux'

import { TouchableHighlight, View, Text, ListView } from '../__components';

import { setActiveEntry, resetActiveEntry } from '../app/actions'

import CategoryMenu from './menu'

import { colors, mainCSS, categoriesCSS as styles } from '../__themes'

class CategoriesPage extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
      getSectionHeaderData: (dataBlob, sectionId) => dataBlob[sectionId],
      getRowData: (dataBlob, sectionId, rowId) => dataBlob[rowId]
    });
    this.state = {
      category: {},
      mode: '',
      ds: this.scanAndClone(props.categories),
    }
  }

  componentWillMount() {
    this.props.resetActiveEntry()    
  }

  componentWillReceiveProps({ cmdToolbar, categories }) {
    // console.log('app', cmdToolbar);
    if (cmdToolbar !== this.props.cmdToolbar) {
      if (cmdToolbar) {       
        let { name } = cmdToolbar
        if (name === 'add' || name === 'edit') {
          this.setState({ mode: name })        
        }
      } else {
          this.setState({ 
            mode: '',
            // category: {},
          })
      }
    }
    if (categories !== this.props.categories) {      
      this.setState({
        ds: this.scanAndClone(categories)
      })
    }
  }

  scanAndClone = (categories) => {
    return this.ds.cloneWithRows(categories)
  }

  onCategoryPress = (e, category) => {
    this.props.setActiveEntry({
      pattern: this.props.pattern,
      entry: category
    })
    this.setState({
      category
    })
  }

  render() {
    let { mode, category } = this.state
    // console.log('%cCategories render', 'color:#048;font-weight:bold', this.props);
    // console.log('categories page render', category);
    
    const renderRow = (item) => {
      // console.log('render row item', item);
      return (
        <TouchableHighlight
          onPress={e => this.onCategoryPress(e, item)}
          underlayColor={colors.touch}
          style={[
            styles.item,
            category.id === item.id ? mainCSS.active : null,
          ]}
        >
          <Text>
            {item.name}
          </Text>
        </TouchableHighlight>
      )
    }

    return (
      <View style={mainCSS.fixContainer}>
      <View style={mainCSS.container}>
          {mode &&
            <View style={mainCSS.divider}>
              <CategoryMenu
                mode={mode}
                entry={category}
                list={this.props.categories}
              />
            </View>
          }
          <ListView
            style={styles.root}
            dataSource={this.state.ds}
            renderRow={renderRow}
            enableEmptySections
            initialListSize={Infinity}
          />
        </View>
      </View>
    )
  }


}
export default connect(
  ({app, categories}) => ({
    cmdToolbar: app.cmdToolbar,
    categories,
  }),
  { setActiveEntry, resetActiveEntry }
)(CategoriesPage)

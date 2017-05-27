import React, { Component } from 'react'
import { connect } from 'react-redux'

import { TouchableHighlight, View, Text, ListView } from '../__components';

import { setActiveEntry, resetActiveEntry } from '../app/actions'
import LocationMenu from './menu'
import { getNameById } from '../__lib/utils'
import { colors, mainCSS, locationsCSS as styles } from '../__themes'

class LocationsPage extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
      getSectionHeaderData: (dataBlob, sectionId) => dataBlob[sectionId],
      getRowData: (dataBlob, sectionId, rowId) => dataBlob[rowId]
    });
    this.state = {
      location: {},
      mode: '',
      ds: this.scanAndClone(props.locations),
    }
  }

  componentWillMount() {
    this.props.resetActiveEntry()    
  }

  componentWillReceiveProps({ cmdToolbar, locations }) {
    // console.log('app', app);
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
    if (locations !== this.props.locations) {      
      this.setState({
        ds: this.scanAndClone(locations)
      })
    }
  }

  scanAndClone = (locations) => {
    return this.ds.cloneWithRows(locations)
  }

  onLocationPress = (e, location) => {
    this.props.setActiveEntry({
      pattern: this.props.pattern,
      entry: location
    })
    this.setState({
      location
    })
  }

  render() {
    let { mode, location } = this.state,
        { categories, locations } = this.props
    // console.log('%cLocations render', 'color:#048;font-weight:bold', this.props);
    // console.log('locations page render', location);
    
    const renderRow = (item) => {
      // console.log('render row item', item);
      return (
        <TouchableHighlight
          onPress={e => this.onLocationPress(e, item)}
          underlayColor={colors.touch}
          style={[
            styles.item,
            location.id === item.id ? mainCSS.active : null,
          ]}
        >
          <View style={styles.itemRow}>
            <View>              
              <View>
                <Text style={styles.title}>
                  {item.name}
                </Text>
              </View>
              <View>
                <Text style={styles.aux}>
                  {item.address}
                </Text>
              </View>
              <View>
                <Text style={styles.badge}>
                  {getNameById(categories, item.category)}
                </Text>
              </View>

            </View>

            <View style={mainCSS.pullRightCol}>
              <View>
                <Text style={styles.aux}>
                  Coordinates
                </Text>
              </View>
              <View>
                <Text style={styles.meaning}>
                  {item.coords[0]}, {item.coords[1]}
                </Text>
              </View>

            </View>

          </View>
        </TouchableHighlight>
      )
    }

    return (
      <View style={mainCSS.fixContainer}>
        <View style={mainCSS.container}>
          {mode &&
            <View style={mainCSS.divider}>
              <LocationMenu
                mode={mode}
                entry={location}
                list={locations}
                categories={categories}
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
  ({app, categories, locations}) => ({
    cmdToolbar: app.cmdToolbar,
    categories,
    locations,
  }),
  { setActiveEntry, resetActiveEntry }
)(LocationsPage)

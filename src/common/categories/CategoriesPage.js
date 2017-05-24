import React, { Component } from 'react'
import { connect } from 'react-redux'
import chroma from 'chroma-js';

import { View, Text, ScrollView, Alert, Icon } from '../__components';

import { splitOnce, getCategoryByPath } from '../__lib/utils'
import { scanUserAsset } from '../app/actions'

import CategoryMenu from './menu'

import { mainCSS, categoriesCSS as styles } from '../__themes'
import __config from '../config'

// const ROOT_PATH = 'categories'

class Categories extends Component {

  state = {
    // records: null,
    path: '',
    // category: {},
    entry: {},
    showMenu: false,
  }

  componentWillMount() {
    // if (!this.state.records) {
    //   this.state.records = this.composeAndScan(this.props)
    // }
    this.state.asset = this.setupAsset(this.props.user)
  }

  componentWillReceiveProps(nextProps) {
    console.log('comp will receive props');
    let rescan = nextProps.user != this.props.user
    // if (u && !this.state.records) {
    if (rescan) {
      // nextState.records = this.composeAndScan(nextProps)      
      this.setState({
        asset: this.setupAsset(nextProps.user)      
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {

    // let hideMenu =  nextProps.categories !== this.props.categories ||
    let hideMenu =  nextProps.mapView !== this.props.mapView ||
                    nextProps.user !== this.props.user
    console.log('scu6', hideMenu);
    if (hideMenu) {
      // nextState = this.init()
      // this.state = this.init()
      nextState.showMenu = false
      nextState.entry = {}
      nextState.path = ''
      return true
    }
    return  nextState.showMenu !== this.state.showMenu ||
            nextState.entry !== this.state.entry ||
            nextState.asset !== this.state.asset
            // categoriesChanged
  }

  setupAsset = user => {
    console.log('lets scan', Boolean(user));
    if (!user) return

    let init = !this.props.scanned
    if (init) {
      this.props.scanUserAsset()
    }

    let scan = list => {
      list.forEach((item, i) => {
        if (item.sub) {
          // let len = Object.keys(item.sub).length
          let len = item.sub.length
          if (len) {

            if (init) {
              item.shown = false              
            } else {
              if (item.shown === undefined) {
                // for new entries
                item.shown = true
              }
            }
            
            /*
            console.log(i);
            console.log('flag = ', JSON.stringify(flags[i]));
            console.log('item = ', JSON.stringify(item));
            console.log('flag.len', flags[i].len);
            console.log('item.sub.len', len);
            console.log('------------------');
            */

            // _scan(sub, list.sub)
            scan(item.sub)
          }
        }
      })
    }

    let setup = rootPath => {
      let list = [user[rootPath]]
      // if (!e.scanned) scan(e)
      scan(list)
      return {
        rootPath,
        list
      }
    }

    let a = {
      shops: setup('shops'),
      amountTypes: setup('amountTypes'),
    }

    console.log('asset shops:', JSON.stringify(a.shops));
    // console.log('asset amountTypes:', JSON.stringify(a.amountTypes));

    return a

  }

  onClickList = ({list, path, rootPath}) => {
    
    let showMenu = Boolean(path);


    // if (showMenu !== this.state.showMenu || path != this.state.category.path) {
    if (showMenu !== this.state.showMenu || path != this.state.path) {
      let r = path ? getCategoryByPath(list, path).entry : {},
          [ parentPath, index ] = splitOnce(path, '.', true),
          isChild = Boolean(path && path !== rootPath)
      if (!isChild) path += '.sub'
      console.log('onClickList', path, r);
      
      let entry = {
        list,
        title: r.title || '',
        color: r.color || '',
        rootPath,
        path,
        parentPath,
        index,
        isChild,
      }
      // console.log('click list:', JSON.stringify(category));
      this.setState({
        path,
        entry,
        showMenu,
      })
    }
  }

  onPress = (e, {list, path, rootPath}) => {
    e.stopPropagation()
    // console.log('onClickList', e.currentTarget.tagName, path, rootPath);
    if (e.currentTarget.tagName.toLowerCase() === 'button') {
      let { entry, index, parent } = getCategoryByPath(list, path)

      // let { entry, index, parent } = getCategoryByPath(this.props.user, path)
      // console.log('section press', entry, 'parent:', parent);
      entry.shown = !entry.shown
      parent[index] = { ...entry }
      this.setState({
        asset: { ...this.state.asset }
      })
    }
  }

  render() {
    if (!this.props.user) return null

    const createList = ({ list, rootPath }) => {
      
      // let { rootPath } = list

      // console.log('rootPath', list, rootPath);

      const createItem = (data, _path, clr) => {
        // console.log('data', data);
        return (
          <View style={styles.sub}>

            {data.map((item, i) => {
              try {
                if (clr) {
                  clr = chroma(clr).brighten(0.2).hex()
                }
              } catch (e) {
                clr = null
              }
              let backgroundColor =  item.color ? item.color : clr ? clr : null
              let _style = { backgroundColor },
                  icolor = '#555'
              if (!backgroundColor) {
                icolor = 'white'
                _style = {
                  backgroundColor: '#999',
                  color: icolor
                }
              }

              let path = _path ? (_path + '.' + i) : rootPath,
                  sub = Boolean(item.sub && item.sub.length),
                  shown, iname
              if (sub) {
                shown = item.shown
                iname = shown ? 'remove' : 'add'
              }

              let onPress = e => this.onPress(e, {list, path, rootPath})

              return (
                <View
                  key={i}
                  style={mapView ? styles.row : styles.list}
                >
                  <View style={styles.row}>
                    <Text style={[ styles.item, _style ]}
                      onPress={onPress}
                    >
                      {sub &&
                        <Icon.Button name={`ios-${iname}-circle-outline`}
                          size={16}
                          backgroundColor='transparent'
                          color={icolor}
                          onPress={onPress}
                        />
                      }
                      {item.title}
                    </Text>
                  </View>

                  { (sub && shown ) ? createItem(item.sub, path + '.sub', item.color || clr) : null }

                </View>
              )
            })}
          </View>
        )
      }
      // let listName = listTitle, //.toLowerCase(),
          // list = this.props[listName]
      // console.log('list', list);
      return createItem(list)
      // return createItem(list, rootPath)
    }
    

    // console.log('%cCategories render', 'color:#048;font-weight:bold', this.props);
    let { user, mapView } = this.props
    let showMenu = __config.isNative ? this.state.showMenu : true
    console.log('categories page render', this.state.asset);

    return (
      <View style={mainCSS.root}>
        {showMenu &&
          <View style={mainCSS.divider}>
            <CategoryMenu
              entry={this.state.entry}
              enable={this.state.showMenu}
            />
          </View>
        }
        <ScrollView style={styles.container}>
          <ScrollView horizontal={mapView}>
            {createList(this.state.asset.shops)}
            {createList(this.state.asset.amountTypes)}
            {/*{createList(this.state.records.categories)}*/}
          </ScrollView>
        </ScrollView>
      </View>
    )
  }


}
export default connect(
  ({app, user}) => ({
    // amountTypes: user.amountTypes,
    // shops: user.shops,
    user,
    // categories,
    scanned: app.userAssetScanned,
    mapView: app.categoryMapView,
  }),
  { scanUserAsset }
)(Categories)

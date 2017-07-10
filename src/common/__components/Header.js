import React from 'react';

import { View, Text, Helmet } from '../components';
import ToolBar from './ToolBar';
import { mainCSS, headerCSS } from '../styles';
import os from '../../common/os';

export default props => {
  let { isBrowser, messages } = os,
    [root, name] = props.urlParts,
    title = messages[`links.${name || 'home'}.title`];
  return (
    <View style={headerCSS.root}>
      {isBrowser && <Helmet title={title} />}
      <View style={[mainCSS.fullArea, mainCSS.limited]}>
        <Text style={headerCSS.title}>
          {title}
        </Text>
        {root !== '/' && <ToolBar {...props} />}
      </View>
    </View>
  );
};

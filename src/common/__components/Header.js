import React from 'react';

import { View, Text, Helmet } from '../components';
import ToolBar from './ToolBar';
import { mainCSS, headerCSS } from '../styles';
import os from '../../common/os';

export default ({ history, urlParts }) => {
  let { isBrowser, messages } = os,
    [root, name] = urlParts,
    title = messages[`links.${name || 'home'}.title`];
  // console.log('urlParts', urlParts);
  return (
    <View style={headerCSS.root}>
      {isBrowser && <Helmet title={title} />}
      <View style={mainCSS.limited}>
        <View style={mainCSS.center}>
          <Text style={headerCSS.title}>
            {title}
          </Text>
        </View>
        {root !== '/' && <ToolBar urlParts={urlParts} history={history} />}
      </View>
    </View>
  );
};

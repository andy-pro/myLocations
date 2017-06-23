import React from 'react';
import { Svg } from '../../components';
// import { splitOnce } from '../../__lib/utils';
import svgs from './svgs';

export default ({
  svg,
  name,
  stroke,
  strokeWidth,
  size,
  viewBox = '0 0 40 40',
  height = '40',
  width = '40',
  fill = '#000',
}) =>
  <Svg height={size || height} width={size || width} viewBox={viewBox}>
    {React.cloneElement(svg || svgs[name], {
      fill,
      stroke,
      strokeWidth,
    })}
  </Svg>;

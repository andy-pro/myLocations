/* browser components */

import Helmet from 'react-helmet';
// import DropdownMenu from './DropdownMenu';
// import DatePicker from './DatePicker'
// import Checkbox from '../Checkbox';
// import ListView from './ListView';
// import FlatList from './FlatList';
import SectionList from './SectionList';
import FormWrapper from '../../common/__components/FormWrapper';
import Dialogs from '../../common/__components/Dialogs';
import { View } from './fela';
import MapView, { MAP_TYPES } from './GoogleMapsReact';

const Alert = {
  alert: (hdr, msg, btns) => {
    if (msg) hdr = hdr + '\n' + msg;
    if (!btns) alert(hdr);
    else if (confirm(hdr)) btns[1].onPress();
  },
};

export { TouchLink } from './Link';
export { Icon, IconButton, IconLink } from './Icons.js';
export { MapView, MAP_TYPES };
export { Svg, G, Path, Circle, Rect, SvgText } from './fela';

export {
  Helmet,
  // DropdownMenu,
  // DatePicker,
  // Checkbox,
  // ListView,
  // FlatList,
  SectionList,
  FormWrapper,
  Dialogs,
  Alert,
};

export {
  Text,
  Form,
  Button,
  TextInput,
  FileInput,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  Image,
  Picker,
} from './fela';

export { View, View as Drawer };
export { Route, Redirect, withRouter } from 'react-router-dom';

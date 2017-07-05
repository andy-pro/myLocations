/* browser components */
import Helmet from 'react-helmet';

import ListView from './ListView';
import FlatList from './FlatList';
import SectionList from './SectionList';
// import Link from './Link';
// import DropdownMenu from './DropdownMenu';

// import HeaderBar from '../HeaderBar';
// import Checkbox from '../Checkbox';
import FormWrapper from '../../common/__components/FormWrapper';
// import Footer from '../Footer';
// import IconLink from './IconLink';
// import MenuLink from './MenuLink';
// import DatePicker from './DatePicker'
import { View } from './fela';

import MapView, { MAP_TYPES } from './GoogleMapsReact';
export { MapView, MAP_TYPES };

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
  Svg,
} from './fela';

export { View, View as Drawer };
export { Route, Redirect, withRouter } from 'react-router-dom';

export { IconButton, IconLink } from './icons';

// export { TouchLink, IconLinkPlatform, IconButtonPlatform } from './controls';
export { TouchLink } from './Link';

const Alert = {
  alert: (hdr, msg, btns) => {
    if (msg) hdr = hdr + '\n' + msg;
    if (!btns) alert(hdr);
    else if (confirm(hdr)) btns[1].onPress();
  },
};

export {
  ListView,
  FlatList,
  SectionList,
  // Link,
  // DropdownMenu,
  Helmet,
  Alert,
  FormWrapper,
  // Checkbox,
  // IconLink,
  // MenuLink,
  // DatePicker,
};

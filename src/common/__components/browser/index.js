import HeaderBar from '../HeaderBar'
import Match from '../Match'
import Checkbox from '../Checkbox'
import FormWrapper from '../FormWrapper'
import Footer from '../Footer'
// import TwistedView from '../TwistedView'
import Icon from './icons/Ionicons'
import IconLink from './IconLink'
import Link from './Link'
import ListView from './ListView'
import MenuLink from './MenuLink'
import Title from './Title'
// import Picker from './Picker'
// import DatePicker from './DatePicker'

import {
  Text,
  View,
  Form,
  Button,
  TextInput,
  FileInput,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  Image,
  Picker,
} from './fela'

const Alert = {
  alert: (hdr, msg, btns) => {
    if (msg) hdr = hdr + '\n' + msg
    if (!btns) alert(hdr)
    else if (confirm(hdr)) btns[1].onPress()
  }
}


export {
  Text,
  View,
  Form,
  Button,
  TextInput,
  FileInput,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  Image,
  HeaderBar,
  Match,
  Checkbox,
  ListView,
  Icon,
  IconLink,
  Alert,
  Link,
  MenuLink,
  Picker,
  Title,
  FormWrapper,
  Footer,
  // TwistedView,
  // DatePicker,
}

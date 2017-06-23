import React from 'react';
import { checkData } from '../__lib/utils';
import FormHelper from '../__components/FormHelper';
import Form from './Form';
import __toSections from './toSections';
import EditedList from '../__components/EditedList';
import { View, Text, TouchLink } from '../components';
import { colors, mainCSS, locationsCSS as styles } from '../styles';

const toSections = ({ locations, ...props }) => {
  let { data, error } = checkData(locations, Form.model.fields);
  props.locations = data;
  let sections = __toSections(props);
  sections.error = error;
  return sections;
};

export default EditedList({
  listName: 'locations',
  stateProps: ['categories', 'locations'],
  Form: FormHelper(Form),
  renderSectionHeader,
  renderItem,
  isDataChanged,
  toSections,
});

function renderSectionHeader({ section }) {
  return (
    <View style={mainCSS.section}>
      <Text style={mainCSS.sectionTitle}>
        {section.name}
      </Text>
    </View>
  );
}

function renderItem({ item }) {
  // console.log('locations render row item', item);
  let { entry } = this.props;
  return (
    <TouchLink
      to={`/map/${item.id}`}
      underlayColor={colors.touch}
      style={[mainCSS.sectionItem, entry && entry.id === item.id && mainCSS.active]}
      onLongPress={() => this.onItemLongPress(item)}
    >
      <View style={mainCSS.between}>
        <View>
          <View>
            <Text style={styles.title}>
              {item.name}
            </Text>
          </View>
          <View>
            <Text style={styles.badge}>
              {item.address}
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
              {item.coords}
            </Text>
          </View>

        </View>

      </View>
    </TouchLink>
  );
}

function isDataChanged({ categories, locations }) {
  return categories !== this.props.categories || locations !== this.props.locations;
}

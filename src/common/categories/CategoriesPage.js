import React from 'react';
import { checkData, sortListByMode } from '../__lib/utils';
import FormHelper from '../__components/FormHelper';
import Form from './Form';
import EditedList from '../__components/EditedList';
import { View, Text, TouchLink } from '../components';
import { colors, mainCSS, sectionsCSS as styles } from '../styles';

const toSections = ({ categories, sortMode }) => {
  let { data, error } = checkData(categories, Form.model.fields);
  let sections = [
    {
      name: 'Categories',
      id: 'categories',
      key: 'categories',
      data: sortListByMode(data, sortMode.name),
    },
  ];
  sections.error = error;
  return sections;
};

export default EditedList({
  listName: 'categories',
  stateProps: ['categories'],
  Form: FormHelper(Form),
  renderSectionHeader,
  renderItem,
  isDataChanged,
  toSections,
});

function renderSectionHeader({ section }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>
        {section.name}
      </Text>
    </View>
  );
}

function renderItem({ item }) {
  let { entry } = this.props;
  return (
    <TouchLink
      to={`/locations/${item.id}`}
      underlayColor={colors.touch}
      onLongPress={() => this.onItemLongPress(item)}
    >
      <View style={[styles.item, entry && entry.id === item.id && mainCSS.active]}>
        <Text style={styles.anchor}>
          {item.name}
        </Text>
      </View>
    </TouchLink>
  );
}

function isDataChanged({ categories }) {
  return categories !== this.props.categories;
}

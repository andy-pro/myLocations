import React from 'react';
import { checkData, sortListByMode } from '../__lib/utils';
import FormHelper from '../__components/FormHelper';
import Form from './Form';
import EditedList from '../__components/EditedList';
import { View, Text, TouchLink } from '../components';
import { colors, mainCSS } from '../styles';

const toSections = ({ categories, sortMode }) => {
  let { data, error } = checkData(categories, Form.model.fields);
  let sections = [
    {
      name: 'Categories',
      id: 'categories',
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
    <View style={mainCSS.section}>
      <Text style={mainCSS.sectionTitle}>
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
      style={[mainCSS.sectionItem, entry && entry.id === item.id && mainCSS.active]}
      onLongPress={() => this.onItemLongPress(item)}
    >
      <Text style={mainCSS.a_link}>
        {item.name}
      </Text>
    </TouchLink>
  );
}

function isDataChanged({ categories }) {
  return categories !== this.props.categories;
}

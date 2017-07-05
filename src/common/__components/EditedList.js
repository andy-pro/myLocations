import React from 'react';
import { connect } from 'react-redux';
import { setActiveEntry, resetActiveEntry, listAction, resetForm } from '../app/actions';
import { View, SectionList } from '../components';
import { deleteDamaged } from './Dialogs';
import { mainCSS } from '../styles';

const mapStateToProps = stateProps => state => {
  let { app } = state,
    props = {
      cmdToolbar: app.cmdToolbar,
      entry: app.activeEntry,
      sortMode: app.sortMode,
    };
  stateProps.forEach(key => (props[key] = state[key]));
  return props;
};

export default ({
  listName,
  stateProps,
  Form,
  onListMount,
  renderSectionHeader,
  renderItem,
  isDataChanged,
  toSections,
}) =>
  connect(mapStateToProps(stateProps), {
    setActiveEntry,
    resetActiveEntry,
    listAction,
    resetForm,
  })(
    class extends React.Component {
      componentWillMount() {
        let { props } = this,
          { cmdToolbar } = props;
        this.sections = this.checkAndToSections(props);
        if (cmdToolbar) {
          if (cmdToolbar.isForm) this.mode = cmdToolbar.cmd;
        }
        if (onListMount) onListMount(props);
      }

      componentWillReceiveProps(nextProps) {
        let { cmdToolbar } = nextProps;
        if (cmdToolbar !== this.props.cmdToolbar) {
          if (cmdToolbar) {
            if (cmdToolbar.isForm) {
              this.mode = cmdToolbar.cmd;
            }
          } else {
            this.mode = '';
          }
        }
        if (isDataChanged.bind(this, nextProps)) {
          this.sections = this.checkAndToSections(nextProps);
        }
      }

      checkAndToSections = props => {
        let sections = toSections(props),
          { error } = sections;
        if (error) {
          deleteDamaged(error.info);
          this.props.listAction(listName, error.indexes, 'purge');
        }
        return sections;
      };

      onItemLongPress = entry =>
        this.props.setActiveEntry({
          listName,
          entry,
        });

      renderItemSeparator = () => <View style={mainCSS.divider} />;

      render() {
        let { mode, sections } = this;
        // console.log('this EDITED LIST render', this.props, mode, sections);
        return (
          <View style={mainCSS.list}>
            {Boolean(mode) && <Form mode={mode} listName={listName} {...this.props} />}
            <SectionList
              sections={sections}
              renderSectionHeader={renderSectionHeader}
              renderItem={renderItem.bind(this)}
              ItemSeparatorComponent={this.renderItemSeparator}
              keyExtractor={item => item.id}
            />
          </View>
        );
      }
    }
  );

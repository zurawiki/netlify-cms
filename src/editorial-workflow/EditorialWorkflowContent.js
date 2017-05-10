import React, { PropTypes } from 'react';
import { HTML5DragDrop } from 'react-simple-dnd';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { partial } from 'lodash';
import { status, statusDescriptions } from '../constants/publishModes';
import EditorialWorkflowColumn from './EditorialWorkflowColumn';
import EditorialWorkflowCardList from './EditorialWorkflowCardList';
import styles from './EditorialWorkflowContent.css';

class EditorialWorkflowContent extends React.Component {
  static propTypes = {
    entries: ImmutablePropTypes.orderedMap,
    handleChangeStatus: PropTypes.func.isRequired,
    handlePublish: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
  };

  handleChangeStatus = (newStatus, dragProps) => {
    const slug = dragProps.slug;
    const collection = dragProps.collection;
    const oldStatus = dragProps.ownStatus;
    this.props.handleChangeStatus(collection, slug, oldStatus, newStatus);
  };

  requestDelete = (collection, slug, ownStatus) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      this.props.handleDelete(collection, slug, ownStatus);
    }
  };
  requestPublish = (collection, slug, ownStatus) => {
    if (ownStatus !== status.last()) {
      return;
    }
    if (window.confirm('Are you sure you want to publish this entry?')) {
      this.props.handlePublish(collection, slug, ownStatus);
    }
  };

  render() {
    const { entries } = this.props;
    return (
      <div>
        <h1>Editorial Workflow</h1>
        <div className={styles.container}>
          { entries && entries.entrySeq().map(([columnName, columnEntries]) => (
            <EditorialWorkflowColumn
              key={columnName}
              columnName={columnName}
              onChangeColumn={partial(this.handleChangeStatus, columnName)}
              heading={statusDescriptions.get(columnName)}
            >
              <EditorialWorkflowCardList
                entries={columnEntries}
                requestDelete={this.requestDelete}
                requestPublish={this.requestPublish}
              />
            </EditorialWorkflowColumn>
          ))}
        </div>
      </div>
    );
  }
}

export default HTML5DragDrop(EditorialWorkflowContent); // eslint-disable-line

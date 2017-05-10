import React, { PropTypes } from 'react';
import { DropTarget, HTML5DragDrop } from 'react-simple-dnd';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { status, statusDescriptions } from '../constants/publishModes';
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
    if (ownStatus !== status.last()) return;
    if (window.confirm('Are you sure you want to publish this entry?')) {
      this.props.handlePublish(collection, slug, ownStatus);
    }
  };

  renderColumns = (entries, column) => {
    if (!entries) return null;

    if (!column) {
      return entries.entrySeq().map(([currColumn, currEntries]) => (
        <DropTarget
          key={currColumn}
          /* eslint-disable */
          onDrop={this.handleChangeStatus.bind(this, currColumn)}
          /* eslint-enable */
        >
          {isHovered => (
            <div className={isHovered ? styles.columnHovered : styles.column}>
              <h2 className={styles.columnHeading}>
                {statusDescriptions.get(currColumn)}
              </h2>
              {this.renderColumns(currEntries, currColumn)}
            </div>
          )}
        </DropTarget>
      ));
    }
    return (
      <EditorialWorkflowCardList
        entries={entries}
        requestDelete={this.requestDelete}
        requestPublish={this.requestPublish}
      />
    );
  };

  render() {
    const columns = this.renderColumns(this.props.entries);
    return (
      <div>
        <h1>Editorial Workflow</h1>
        <div className={styles.container}>
          {columns}
        </div>
      </div>
    );
  }
}

export default HTML5DragDrop(EditorialWorkflowContent); // eslint-disable-line

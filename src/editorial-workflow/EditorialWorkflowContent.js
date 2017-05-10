import React, { PropTypes } from 'react';
import { DragSource, DropTarget, HTML5DragDrop } from 'react-simple-dnd';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';
import { status, statusDescriptions } from '../constants/publishModes';
import EditorialWorkflowCard from './EditorialWorkflowCard';
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
      <div>
        {
          entries.map((entry) => {
            // Look for an "author" field. Fallback to username on backend implementation;
            const username = entry.getIn(['metaData', 'user']);
            const author = entry.getIn(['data', 'author'], username);
            const timeStamp = moment(entry.getIn(['metaData', 'timeStamp'])).format('llll');
            const link = `collections/${ entry.getIn(['metaData', 'collection']) }/entries/${ entry.get('slug') }`;
            const slug = entry.get('slug');
            const ownStatus = entry.getIn(['metaData', 'status']);
            const collection = entry.getIn(['metaData', 'collection']);
            return (
              <DragSource
                key={slug}
                slug={slug}
                collection={collection}
                ownStatus={ownStatus}
              >
                <div className={styles.draggable}>
                  <EditorialWorkflowCard
                    collection={collection}
                    isModification={entry.get('isModification')}
                    title={entry.getIn(['data', 'title'])}
                    author={author}
                    timeStamp={timeStamp}
                    username={username}
                    linkUrl={link}
                    handleDeleteClick={this.requestDelete.bind(this, collection, slug, ownStatus)}
                    allowPublish={ownStatus === status.last() && !entry.get('isPersisting', false)}
                    handlePublishClick={this.requestPublish.bind(this, collection, slug, ownStatus)}
                  />
                </div>
              </DragSource>
            );
          })
        }
      </div>
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

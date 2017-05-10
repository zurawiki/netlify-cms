import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { OrderedMap } from 'immutable';
import { HTML5DragDrop } from 'react-simple-dnd';
import { connect } from 'react-redux';
import { partial } from 'lodash';
import history from '../routing/history';
import { 
  loadUnpublishedEntries,
  updateUnpublishedEntryStatus,
  publishUnpublishedEntry,
  deleteUnpublishedEntry 
} from '../actions/editorialWorkflow';
import { selectUnpublishedEntriesByStatus } from '../reducers';
import { EDITORIAL_WORKFLOW, status, statusDescriptions } from '../constants/publishModes';
import EditorialWorkflowColumn from './EditorialWorkflowColumn';
import EditorialWorkflowCardList from './EditorialWorkflowCardList';
import { Loader } from '../components/UI';
import styles from './EditorialWorkflow.css';

/**
 * EditorialWorkflow is the top level component for the editorial workflow,
 * essentially serving as the kanban board for the workflow's drag and drop
 * interface.
 */
class EditorialWorkflow extends Component {
  static propTypes = {
    isEditorialWorkflow: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool,
    unpublishedEntries: ImmutablePropTypes.map,
    loadUnpublishedEntries: PropTypes.func.isRequired,
    updateUnpublishedEntryStatus: PropTypes.func.isRequired,
    publishUnpublishedEntry: PropTypes.func.isRequired,
    deleteUnpublishedEntry: PropTypes.func.isRequired,
  };

  componentWillMount() {
    // Ensure that editorial workflow is inaccessible for projects that aren't
    // configured for it.
    if (!this.props.isEditorialWorkflow) {
      history.push('/');
    }
  }

  componentDidMount() {
    this.props.loadUnpublishedEntries();
  }

  handleChangeStatus = (newStatus, dragProps) => {
    const slug = dragProps.slug;
    const collection = dragProps.collection;
    const oldStatus = dragProps.ownStatus;
    this.props.updateUnpublishedEntryStatus(collection, slug, oldStatus, newStatus);
  };

  requestDelete = (collection, slug, ownStatus) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      this.props.deleteUnpublishedEntry(collection, slug, ownStatus);
    }
  };

  requestPublish = (collection, slug, ownStatus) => {
    if (ownStatus !== status.last()) {
      return;
    }
    if (window.confirm('Are you sure you want to publish this entry?')) {
      this.props.publishUnpublishedEntry(collection, slug, ownStatus);
    }
  };

  render() {
    const {
      isFetching,
      unpublishedEntries,
      updateUnpublishedEntryStatus,
      publishUnpublishedEntry,
      deleteUnpublishedEntry,
    } = this.props;

    if (isFetching) {
      return <Loader active>Loading editorial workflow entries...</Loader>;
    }

    return (
      <div>
        <h1>Editorial Workflow</h1>
        <div className={styles.container}>
          { unpublishedEntries && unpublishedEntries.entrySeq().map(([columnName, columnEntries]) => (
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

const mapStateToProps = (state) => ({
  isEditorialWorkflow: state.config.get('publish_mode') === EDITORIAL_WORKFLOW,
  isFetching: state.editorialWorkflow.getIn(['pages', 'isFetching'], false),

  /*
   * Generates an ordered Map of the available status as keys.
   * Each key containing a Sequence of available unpubhlished entries
   * Eg.: OrderedMap{'draft':Seq(), 'pending_review':Seq(), 'pending_publish':Seq()}
   */
  unpublishedEntries: status.reduce((acc, currStatus) => (
    acc.set(currStatus, selectUnpublishedEntriesByStatus(state, currStatus))
  ), OrderedMap()),
});

export default connect(mapStateToProps, {
  loadUnpublishedEntries,
  updateUnpublishedEntryStatus,
  publishUnpublishedEntry,
  deleteUnpublishedEntry,
})(HTML5DragDrop(EditorialWorkflow));

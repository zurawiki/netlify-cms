import React from 'react';
import { connect } from 'react-redux';
import Checkpoint from '../routing/Checkpoint';
import EditorialWorkflow from './EditorialWorkflow';
import { EDITORIAL_WORKFLOW } from '../constants/publishModes';
import styles from './EditorialWorkflowCheckpoint.css';

/**
 * EditorialWorkflowCheckpoint uses the Checkpoint utility component to
 * conditionally render the EditorialWorkflow, so that it can't be loaded via
 * url for users who aren't configured for it.
 */
const EditorialWorkflowCheckpoint = ({ isEditorialWorkflow }, ownProps) => (
  <Checkpoint
    test={isEditorialWorkflow}
    failureMessage="To use editorial workflow, please enable it in your configuration."
    failureMessageClassName={styles.message}
    component={EditorialWorkflow}
    componentProps={ownProps}
  />
);

const mapStateToProps = (state) => ({
  isEditorialWorkflow: state.config.get('publish_mode') === EDITORIAL_WORKFLOW,
});

export default connect(mapStateToProps)(EditorialWorkflowCheckpoint);

import React, { PropTypes } from 'react';
import styles from './EditorialWorkflowCardMeta.css';

/**
 * EditorialWorkflowCardMeta displays information about an unpublished entry,
 * such as author, or whether or not the entry was previously published.
 */
const EditorialWorkflowCardMeta = ({ meta, label }) =>
  <div className={styles.cardMeta}>
    <span className={styles.meta}>{meta}</span>
    {(label && label.length > 0)
      ? <span className={styles.label}>{label}</span>
      : ""}
  </div>;

EditorialWorkflowCardMeta.propTypes = {
  meta: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default EditorialWorkflowCardMeta;

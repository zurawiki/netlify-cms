import React from 'react';
import { DropTarget } from 'react-simple-dnd';
import styles from './EditorialWorkflowColumn.css';

/**
 * EditorialWorkflowColumn handles drag/drop functionality for columns.
 */
const EditorialWorkflowColumn = ({ columnName, onChangeColumn, heading, children }) => (
  <DropTarget onDrop={onChangeColumn}>
    {
      // react-simple-dnd uses the function-as-child pattern, and passes in
      // true for `isHovered` when the column is being hovered

      isHovered => (
        <div className={isHovered ? styles.columnHovered : styles.column}>
          <h2 className={styles.columnHeading}>{heading}</h2>
          {children}
        </div>
      )
    }
  </DropTarget>
);

export default EditorialWorkflowColumn;

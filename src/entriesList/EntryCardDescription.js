import React from 'react';
import styles from './EntryCardDescription.css';

const EntryCardDescription = ({ entry, description, remainingFields }) => {
  if (description) {
    return <p>{description}</p>;
  }

  if (remainingFields) {
    return (
      <div>
        {
          remainingFields.map(field => (
            <p key={field.get('name')} className={styles.cardList}>
              <span className={styles.cardListLabel}>{field.get('label')}:</span>
              {entry.getIn(['data', field.get('name')], '').toString()}
            </p>
          ))
        }
      </div>
    );
  }

  return null;
};

export default EntryCardDescription;

import React from 'react';
import history from '../routing/history';
import { resolvePath } from '../lib/pathHelper';
import { Card } from '../components/UI';
import EntryCardDescription from './EntryCardDescription';
import styles from './EntryCard.css';

const EntryCard = ({ entry, fields, publicFolder }) => {
  const path = `/collections/${ entry.get('collection') }/entries/${ entry.get('slug') }`;
  const title = entry.get('label') || entry.getIn(['data', fields.get('titleField')]);
  const image = entry.getIn(['data', fields.get('imageField')]);
  const imageStyle = { backgroundImage: `url(${resolvePath(image, publicFolder)})` };
  const descriptionFieldName = fields.get('descriptionField');

  return (
    <Card onClick={() => history.push(path)} className={styles.card}>
      { image && <header className={styles.cardImage} style={imageStyle} /> }
      <h1>{title}</h1>
      <EntryCardDescription
        entry={entry}
        description={descriptionFieldName && entry.getIn(['data', descriptionFieldName])}
        remainingFields={fields.get('remainingFields')}
      />
    </Card>
  );
}

export default EntryCard;

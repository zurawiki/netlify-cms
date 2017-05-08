import React from 'react';
import EntryPage from './EntryPage';
import ConfigCollection from '../valueObjects/ConfigCollection';

export default function ConfigPage(props) {
  return (
    <EntryPage
      collection={ConfigCollection}
      fields={ConfigCollection.getIn(['files', '0', 'fields'])}
      entry={ConfigCollection.getIn(['files', '0'])}
      {...props}
    />
  );
}

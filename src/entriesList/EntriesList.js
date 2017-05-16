import React from 'react';
import { connect } from 'react-redux';
import Waypoint from 'react-waypoint';
import { Map, Set } from 'immutable';
import { Loader } from '../components/UI';
import { selectFields } from '../reducers/collections';
import { selectFieldNameForRole } from '../reducers/fieldRoles';
import EntryCard from './EntryCard';
import styles from "./EntriesList.css";

const EntriesList = ({
  /**
   * collection is a single collection entity - if present, this component
   * assumes that all entries are from this collection.
   */
  collection,
  collections,
  entries,
  page,
  heading,
  noEntriesMessage,
  onLoadMore,
  isFetching,
  publicFolder,
}) => {
  if (!collections) {
    return <h1>No collections defined in your config.yml</h1>;
  }

  // TODO: move field selection logic to actions/reducers

  // Get a list of the names of each collection represented in `entries`.
  // Using `Set` to ensure against repeats.
  const collectionNamesForEntries = collection ? Set([collection]) : entries
    .reduce((collectionNames, entry) => collectionNames.add(entry.get('collection')), Set())
    .map(collectionName => collections.find(collection => collection.get('name') === collectionName));

  // Get a map of fields for each collection
  const fieldsByCollection = collectionNamesForEntries.reduce((acc, entryCollection) => {
    const titleField = selectFieldNameForRole(entryCollection, 'title');
    const descriptionField = selectFieldNameForRole(entryCollection, 'description');
    const imageField = selectFieldNameForRole(entryCollection, 'image');
    const fields = selectFields(entryCollection);
    const fieldNamesForRoles = [titleField, descriptionField, imageField];
    const remainingFields = fields && fields.filter(f => fieldNamesForRoles.indexOf(f.get('name')) === -1);
    const collectionFields = Map({ titleField, descriptionField, imageField, remainingFields });
    return acc.set(entryCollection.get('name'), collectionFields);
  }, Map());

  if (entries && !entries.isEmpty()) {
    return (
      <div>
        <h1>{heading}</h1>
        <div className={styles.cardsGrid}>
          {
            entries.map(entry => (
              <EntryCard
                key={entry.get('slug')}
                entry={entry}
                fields={fieldsByCollection.get(entry.get('collection'))}
                publicFolder={publicFolder}
              />
            ))
          }
          <Waypoint onEnter={() => onLoadMore(page + 1)}/>
        </div>
      </div>
    );
  }

  if (isFetching) {
    return <Loader active>{['Loading entries...', 'Caching entries...']}</Loader>;
  }

  return <div className={styles.noEntries}>{noEntriesMessage}</div>;
}

const mapStateToProps = (state, ownProps) => {
  const props = {
    collections: state.collections,
    publicFolder: state.config.get('public_folder'),
  };
  return Object.assign({}, props, ...ownProps);
};

export default connect(mapStateToProps)(EntriesList);

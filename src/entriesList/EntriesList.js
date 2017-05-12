import React from 'react';
import { connect } from 'react-redux';
import { Loader } from '../components/UI';
import Entries from './Entries';
import styles from "./EntriesList.css";

const EntriesList = ({
  entries,
  page,
  heading,
  noEntriesMessage,
  onLoadMore,
  isFetching,
  collection,
  collections,
  publicFolder,
}) => {
  if (!collections) {
    return <h1>No collections defined in your config.yml</h1>;
  }

  if (entries && !entries.isEmpty()) {
    return (
      <Entries
        collection={collection}
        collections={collections}
        entries={entries}
        publicFolder={publicFolder}
        page={page}
        onPaginate={onLoadMore}
      >
        {heading}
      </Entries>
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

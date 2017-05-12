import React from 'react';
import { connect } from 'react-redux';
import pluralize from 'pluralize';
import { loadEntries } from '../actions/entries';
import { selectEntries } from '../reducers';
import EntriesList from './EntriesList';

class CollectionEntriesList extends React.Component {

  componentDidMount() {
    const { collection, dispatch } = this.props;
    if (collection) {
      dispatch(loadEntries(collection));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { collection, dispatch } = this.props;
    if (nextProps.collection !== collection) {
      dispatch(loadEntries(nextProps.collection));
    }
  }

  handleLoadMore = (page) => {
    const { collection, dispatch } = this.props;
    dispatch(loadEntries(collection, page));
  };

  render() {
    const { page, entries, isFetching, collection } = this.props;
    const label = collection.get('label');

    return (
      <EntriesList
        heading={label}
        noEntriesMessage={`No ${pluralize(label)} have been published`}
        entries={entries}
        page={page}
        onLoadMore={this.handleLoadMore}
        isFetching={isFetching}
        collection={collection}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  const collection = state.collections.get(ownProps.params.name);

  return {
    collection,
    page: state.entries.getIn(['pages', collection.get('name'), 'page']),
    entries: selectEntries(state, collection.get('name')),
    isFetching: state.entries.getIn(['pages', collection.get('name'), 'isFetching'], false),
  };
}

export default connect(mapStateToProps)(CollectionEntriesList);

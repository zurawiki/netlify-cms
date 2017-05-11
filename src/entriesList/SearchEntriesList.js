import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { selectSearchedEntries } from '../reducers';
import { searchEntries as actionSearchEntries, clearSearch as actionClearSearch } from '../actions/search';
import { Loader } from '../components/UI';
import EntriesList from './EntriesList';

class SearchEntriesList extends React.Component {

  componentDidMount() {
    const { searchTerm, searchEntries } = this.props;
    searchEntries(searchTerm);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.searchTerm === nextProps.searchTerm) return;
    const { searchEntries } = this.props;
    searchEntries(nextProps.searchTerm);
  }

  componentWillUnmount() {
    this.props.clearSearch();
  }

  handleLoadMore = (page) => {
    const { searchTerm, searchEntries } = this.props;
    if (!isNaN(page)) searchEntries(searchTerm, page);
  };

  render() {
    const { collections, searchTerm, entries, isFetching, page, publicFolder } = this.props;

    return (
      <EntriesList
        heading={`Results for "${searchTerm}"`}
        noEntriesMessage={`No results for "${searchTerm}"`}
        entries={entries}
        page={page}
        onLoadMore={this.handleLoadMore}
        isFetching={isFetching}
        collections={collections}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.entries.getIn(['search', 'isFetching']),
  page: state.entries.getIn(['search', 'page']),
  entries: selectSearchedEntries(state),
  collections: state.collections.toIndexedSeq(),
  searchTerm: ownProps.params && ownProps.params.searchTerm,
});

const mapDispatchToProps = {
  searchEntries: actionSearchEntries,
  clearSearch: actionClearSearch,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchEntriesList);

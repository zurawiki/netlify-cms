import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../app/App';
import HomeRedirect from './HomeRedirect';
import EditorialWorkflowCheckpoint from '../editorialWorkflow/EditorialWorkflowCheckpoint';
import CollectionEntriesList from '../entriesList/CollectionEntriesList';
import EntryView from '../entryEditor/EntryView';
import SearchEntriesList from '../entriesList/SearchEntriesList';
import NotFoundView from '../notFound/NotFoundView';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomeRedirect} />
    <Route
      path="/editorial-workflow"
      component={EditorialWorkflowCheckpoint}
    />
    <Route
      path="/collections/:name"
      component={CollectionEntriesList}
    />
    <Route
      path="/collections/:name/entries/new"
      component={EntryView}
      newRecord
    />
    <Route
      path="/collections/:name/entries/:slug"
      component={EntryView}
    />
    <Route
      path="/search/:searchTerm"
      component={SearchEntriesList}
    />
    <Route
      path="*"
      component={NotFoundView}
    />
  </Route>
);

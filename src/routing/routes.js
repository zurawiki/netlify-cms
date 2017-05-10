import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../app/App';
import HomeRedirect from './HomeRedirect';
import EditorialWorkflow from '../editorial-workflow/EditorialWorkflow';
import CollectionPage from '../containers/CollectionPage';
import EntryPage from '../containers/EntryPage';
import SearchPage from '../containers/SearchPage';
import NotFoundPage from '../containers/NotFoundPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomeRedirect} />
    <Route
      path="/editorial-workflow"
      component={EditorialWorkflow}
    />
    <Route
      path="/collections/:name"
      component={CollectionPage}
    />
    <Route
      path="/collections/:name/entries/new"
      component={EntryPage}
      newRecord
    />
    <Route
      path="/collections/:name/entries/:slug"
      component={EntryPage}
    />
    <Route
      path="/search/:searchTerm"
      component={SearchPage}
    />
    <Route
      path="*"
      component={NotFoundPage}
    />
  </Route>
);

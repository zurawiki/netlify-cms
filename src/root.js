import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import history from './routing/history';
import configureStore from './redux/configureStore';
import { setStore } from './valueObjects/AssetProxy';
import App from './containers/App';

const store = configureStore();

setStore(store);

history.block(() => {
  if (store.getState()['entryDraft'].get('hasChanged', false)) {
    return "Are you sure you want to leave this page?";
  }
})

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route component={App}/>
    </ConnectedRouter>
  </Provider>
);

export default Root;

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import 'file?name=index.html!../example/index.html';
import 'react-toolbox/lib/commons.scss';
import Root from './root';
import registry from './lib/registry';
import editorPlugins from './editorPlugins';
import './index.css';

if (process.env.NODE_ENV !== 'production') {
  require('./utils.css'); // eslint-disable-line
}

// Log the version number
console.log(`Netlify CMS version ${NETLIFY_CMS_VERSION}`);

// Create mount element dynamically
const el = document.createElement('div');
el.id = 'root';
document.body.appendChild(el);

render((
  <AppContainer>
    <Root />
  </AppContainer>
), el);

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./root', () => {
    const NextRoot = require('./root').default; // eslint-disable-line
    render((
      <AppContainer>
        <NextRoot />
      </AppContainer>
    ), el);
  });
}

editorPlugins.forEach(plugin => registry.registerEditorComponent(plugin));

// Bootstrap CMS extension API
const CMS = Object.assign({}, registry);

if (typeof window !== 'undefined') {
  window.CMS = CMS;
  window.createClass = window.createClass || React.createClass;
  window.h = window.h || React.createElement;
}

export default CMS;

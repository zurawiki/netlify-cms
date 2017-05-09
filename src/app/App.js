import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { Layout, Panel } from 'react-toolbox/lib/layout';
import { Notifs } from 'redux-notifications';
import TopBarProgress from './TopBarProgress';
import Sidebar from '../sidebar/Sidebar';
import { loadConfig as actionLoadConfig } from '../actions/config';
import { loginUser as actionLoginUser, logoutUser as actionLogoutUser } from '../actions/auth';
import { toggleSidebar as actionToggleSidebar } from '../actions/globalUI';
import { currentBackend } from '../backends/backend';
import { runCommand as actionRunCommand } from '../actions/findbar';
import AppHeader from '../components/AppHeader/AppHeader';
import { Loader, Toast } from '../components/UI/index';
import styles from './App.css';

class App extends React.Component {

  static propTypes = {
    auth: ImmutablePropTypes.map,
    children: PropTypes.node,
    config: ImmutablePropTypes.map,
    collections: ImmutablePropTypes.orderedMap,
    logoutUser: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
    user: ImmutablePropTypes.map, runCommand: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    siteId: PropTypes.string,
  };

  static configError(config) {
    return (<div>
      <h1>Error loading the CMS configuration</h1>

      <div>
        <p>The <code>config.yml</code> file could not be loaded or failed to parse properly.</p>
        <p><strong>Error message:</strong> {config.get('error')}</p>
      </div>
    </div>);
  }

  componentDidMount() {
    this.props.dispatch(actionLoadConfig());
  }

  handleLogin(credentials) {
    this.props.dispatch(actionLoginUser(credentials));
  }

  authenticating() {
    const { auth } = this.props;
    const backend = currentBackend(this.props.config);

    if (backend == null) {
      return <div><h1>Waiting for backend...</h1></div>;
    }

    return (
      <div>
        {
          React.createElement(backend.authComponent(), {
            onLogin: this.handleLogin.bind(this),
            error: auth && auth.get('error'),
            isFetching: auth && auth.get('isFetching'),
            siteId: this.props.config.getIn(["backend", "site_domain"]),
          })
        }
      </div>
    );
  }

  render() {
    const {
      user,
      config,
      children,
      collections,
      toggleSidebar,
      runCommand,
      logoutUser,
      isFetching,
    } = this.props;

    if (config === null) {
      return null;
    }

    if (config.get('error')) {
      return App.configError(config);
    }

    if (config.get('isFetching')) {
      return <Loader active>Loading configuration...</Loader>;
    }

    if (user == null) {
      return this.authenticating();
    }

    return (
      <Sidebar>
        <Layout>
          <Notifs CustomComponent={Toast} />
          <AppHeader
            user={user}
            collections={collections}
            runCommand={runCommand}
            onLogoutClick={logoutUser}
            toggleDrawer={toggleSidebar}
          />
          <Panel scrollY className={styles.entriesPanel}>
            { isFetching && <TopBarProgress /> }
            <div>
              {children}
            </div>
          </Panel>

        </Layout>
      </Sidebar>
    );
  }
}

function mapStateToProps(state) {
  const { auth, config, collections, globalUI } = state;
  const user = auth && auth.get('user');
  const isFetching = globalUI.get('isFetching');
  return { auth, config, collections, user, isFetching };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    toggleSidebar: () => dispatch(actionToggleSidebar()),
    runCommand: (type, payload) => {
      dispatch(actionRunCommand(type, payload));
    },
    logoutUser: () => {
      dispatch(actionLogoutUser());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { Layout, Panel } from 'react-toolbox/lib/layout';
import { Notifs } from 'redux-notifications';
import ConfigMessaging from './ConfigMessaging';
import Auth from './Auth.js';
import TopBarProgress from './TopBarProgress';
import Sidebar from '../sidebar/Sidebar';
import { loadConfig as actionLoadConfig } from '../actions/config';
import { logoutUser as actionLogoutUser } from '../actions/auth';
import { toggleSidebar as actionToggleSidebar } from '../actions/globalUI';
import { runCommand as actionRunCommand } from '../actions/findbar';
import Header from './Header';
import { Toast } from '../components/UI/index';
import styles from './App.css';

class App extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    config: ImmutablePropTypes.map,
    collections: ImmutablePropTypes.orderedMap,
    logoutUser: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
    user: ImmutablePropTypes.map, runCommand: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    this.props.dispatch(actionLoadConfig());
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

    // Require config, use ConfigMessaging component to communicate status in the UI
    if (config === null) {
      return null;
    }

    const configError = config.get('error');
    const configFetching = config.get('isFetching');

    if (configError || configFetching) {
      return <ConfigMessaging error={configError} fetching={configFetching}/>
    }

    // Render the auth component if there's no user
    if (user == null) {
      return <Auth/>
    }

    // Render the app - essentially a wrapper around whatever children are provided through routes
    return (
      <Sidebar>
        <Layout>
          <Notifs CustomComponent={Toast} />
          <Header
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
  return { config, collections, user, isFetching };
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

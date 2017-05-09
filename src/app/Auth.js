import React from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions/auth';
import { currentBackend } from '../backends/backend';

const Auth = ({ auth, config, loginUser }) => {
  const backend = currentBackend(config);
  if (backend == null) {
    return <div><h1>Waiting for backend...</h1></div>;
  }
  const BackendAuth = backend.authComponent();
  return (
    <BackendAuth
      onLogin={loginUser}
      error={auth && auth.get('error')}
      isFetching={auth && auth.get('isFetching')}
      siteId={config.getIn(['backend', 'site_domain'])}
    />
  );
}

export default connect(state => ({auth: state.auth, config: state.config }), { loginUser })(Auth);

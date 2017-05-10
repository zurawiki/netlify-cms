import React from 'react';
import { Loader } from '../components/UI/index';

const ConfigMessaging = ({ error, isFetching }) => {
  if (error) {
    return (
      <div>
        <h1>Error loading the CMS configuration</h1>
        <div>
          <p>The <code>config.yml</code> file could not be loaded or failed to parse properly.</p>
          <p>
            <strong>Error message:</strong>
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (isFetching) {
    return <Loader active>Loading configuration...</Loader>;
  }

  return null;
};

export default ConfigMessaging;

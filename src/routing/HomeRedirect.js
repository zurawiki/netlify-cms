import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { SIMPLE, EDITORIAL_WORKFLOW } from '../constants/publishModes';
import history from './history';

class HomeRedirect extends Component {
  componentWillMount() {
    if (this.props.publishMode === EDITORIAL_WORKFLOW) {
      history.push('/editorial-workflow');
    } else {
      history.push(`/collections/${ this.props.firstCollection }`);
    }
  }

  render() {
    return null;
  }
}

HomeRedirect.propTypes = {
  firstCollection: PropTypes.string,
  publishMode: PropTypes.oneOf([SIMPLE, EDITORIAL_WORKFLOW]),
};

function mapStateToProps(state) {
  const { config, collections } = state;
  return {
    firstCollection: collections.first().get('name'),
    publishMode: config.get('publish_mode'),
  };
}

export default connect(mapStateToProps)(HomeRedirect);

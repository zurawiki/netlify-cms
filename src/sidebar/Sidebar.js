import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactSidebar from 'react-sidebar';
import _ from 'lodash';
import SidebarContent from './SidebarContent';
import { openSidebar } from '../actions/globalUI';
import { SIMPLE, EDITORIAL_WORKFLOW } from '../constants/publishModes';
import styles from './Sidebar.css';

class Sidebar extends React.Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    sidebarIsOpen: PropTypes.bool.isRequired,
    openSidebar: PropTypes.func.isRequired,
    publishMode: PropTypes.oneOf([SIMPLE, EDITORIAL_WORKFLOW]),
  };

  state = { sidebarDocked: false };

  componentWillMount() {
    this.mql = window.matchMedia('(min-width: 1200px)');
    this.mql.addListener(this.mediaQueryChanged);
    this.setState({ sidebarDocked: this.mql.matches });
  }

  componentWillUnmount() {
    this.mql.removeListener(this.mediaQueryChanged);
  }

  mediaQueryChanged = _.throttle(() => {
    this.setState({ sidebarDocked: this.mql.matches });
  }, 500);


  render() {
    const {
      children,
      sidebarIsOpen,
      openSidebar,
      publishMode,
    } = this.props;

    const renderSidebarContent = <SidebarContent editorialWorkflow={publishMode !== SIMPLE}/>;

    return (
      <ReactSidebar
        sidebar={renderSidebarContent}
        rootClassName={styles.root}
        sidebarClassName={styles.sidebar}
        docked={sidebarIsOpen && this.state.sidebarDocked} // ALWAYS can hide sidebar
        open={sidebarIsOpen}
        onSetOpen={openSidebar}
      >
        {children}
      </ReactSidebar>
    );
  }
}

function mapStateToProps(state) {
  const { globalUI, config } = state;
  const sidebarIsOpen = globalUI.get('sidebarIsOpen');
  const publishMode = config && config.get('publish_mode');
  return { sidebarIsOpen, publishMode };
}

export default connect(mapStateToProps, { openSidebar })(Sidebar);

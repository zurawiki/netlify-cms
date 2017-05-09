import React from 'react';
import { Navigation } from 'react-toolbox/lib/navigation';
import SidebarSection from './SidebarSection';
import CollectionLinks from './CollectionLinks';
import PublishingLinks from './PublishingLinks';
import styles from './SidebarContent.css';

const SidebarContent = ({ editorialWorkflow }) => (
  <Navigation type="vertical" className={styles.nav}>
    { editorialWorkflow &&  <SidebarSection label="Publishing" Links={PublishingLinks}/> }
    <SidebarSection label="Collections" Links={CollectionLinks}/>
  </Navigation>
);

export default SidebarContent;

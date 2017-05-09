import React from 'react';
import { IndexLink } from "react-router";
import { Navigation } from 'react-toolbox/lib/navigation';
import CollectionLinks from './CollectionLinks';
import styles from './SidebarContent.css';

export default function SidebarContent({
  editorialWorkflow,
  collections,
}) {
  const renderPublishingSection = (
    <section>
      <h1 className={styles.heading}>Publishing</h1>
      <div className={styles.linkWrapper}>
        <IndexLink to="/" className={styles.viewEntriesLink}>Editorial Workflow</IndexLink>
      </div>
    </section>
  );

  return (
    <div>
      <Navigation type="vertical" className={styles.nav}>
        { editorialWorkflow && renderPublishingSection }
        <section>
          <h1 className={styles.heading}>Collections</h1>
          <CollectionLinks collections={collections}/>
        </section>
      </Navigation>
    </div>
  );
};

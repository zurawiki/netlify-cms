import React from 'react';
import pluralize from 'pluralize';
import { IndexLink } from "react-router";
import { Navigation } from 'react-toolbox/lib/navigation';
import FontIcon from 'react-toolbox/lib/font_icon';
import { getCollectionUrl, getNewEntryUrl } from '../lib/urlHelper';
import styles from './SidebarContent.css';

export default function SidebarContent({
  editorialWorkflow,
  collections,
  onLinkClick,
  navigateToCollection,
  createNewEntryInCollection,
}) {
  return (
    <div>
      <Navigation type="vertical" className={styles.nav}>
        {
          editorialWorkflow &&
          <section>
            <h1 className={styles.heading}>Publishing</h1>
            <div className={styles.linkWrapper}>
              <IndexLink to="/" className={styles.viewEntriesLink}>Editorial Workflow</IndexLink>
            </div>
          </section>
        }
        <section>
          <h1 className={styles.heading}>Collections</h1>
          {
            collections.valueSeq().map((collection) => {
              const collectionName = collection.get('name');
              return (
                <div key={collectionName} className={styles.linkWrapper}>
                  <a
                    href={getCollectionUrl(collectionName, true)}
                    className={styles.viewEntriesLink}
                    onClick={e => onLinkClick(e, navigateToCollection, collectionName)}
                  >
                    {pluralize(collection.get('label'))}
                  </a>
                  {
                    collection.get('create') ? (
                      <a
                        href={getNewEntryUrl(collectionName, true)}
                        className={styles.createEntryLink}
                        onClick={e => onLinkClick(e, createNewEntryInCollection, collectionName)}
                      >
                        <FontIcon value="add_circle_outline" />
                      </a>
                    ) : null
                  }
                </div>
              );
            })
          }
        </section>
      </Navigation>
    </div>
  );
};

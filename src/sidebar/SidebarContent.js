import React from 'react';
import pluralize from 'pluralize';
import { IndexLink } from "react-router";
import { Navigation } from 'react-toolbox/lib/navigation';
import { getCollectionUrl, getNewEntryUrl } from '../lib/urlHelper';
import CollectionLink from './CollectionLink';
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
                <CollectionLink
                  key={collectionName}
                  href={getCollectionUrl(collectionName, true)}
                  label={pluralize(collection.get('label'))}
                  handleClick={e => onLinkClick(e, navigateToCollection, collectionName)}
                  showCreateLink={collection.get('create')}
                  createLinkHref={getNewEntryUrl(collectionName, true)}
                  handleCreateLinkClick={e => onLinkClick(e, createNewEntryInCollection, collectionName)}
                />
              );
            })
          }
        </section>
      </Navigation>
    </div>
  );
};

import React from 'react';
import { connect } from 'react-redux';
import pluralize from 'pluralize';
import SidebarLink from './SidebarLink';
import { getCollectionUrl, getNewEntryUrl } from '../lib/urlHelper';

const CollectionLinks = ({ collections }) => (
  <div>
    {
      collections.valueSeq().map((collection) => {
        const collectionName = collection.get('name');
        return (
          <SidebarLink
            key={collectionName}
            href={getCollectionUrl(collectionName)}
            label={pluralize(collection.get('label'))}
            createLinkHref={collection.get('create') && getNewEntryUrl(collectionName)}
          />
        );
      })
    }
  </div>
);

export default connect(state => ({ collections: state.collections }))(CollectionLinks);

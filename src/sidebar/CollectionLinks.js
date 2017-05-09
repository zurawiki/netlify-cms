import React from 'react';
import pluralize from 'pluralize';
import CollectionLink from './CollectionLink';
import { getCollectionUrl, getNewEntryUrl } from '../lib/urlHelper';

export default function CollectionLinks({ collections }) {
  return (
    <div>
      {
        collections.valueSeq().map((collection) => {
          const collectionName = collection.get('name');
          return (
            <CollectionLink
              key={collectionName}
              href={getCollectionUrl(collectionName)}
              label={pluralize(collection.get('label'))}
              showCreateLink={collection.get('create')}
              createLinkHref={getNewEntryUrl(collectionName)}
            />
          );
        })
      }
    </div>
  );
};

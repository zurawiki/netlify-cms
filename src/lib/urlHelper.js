export function getCollectionUrl(collectionName) {
  return `/collections/${ collectionName }`;
}

export function getNewEntryUrl(collectionName) {
  return `/collections/${ collectionName }/entries/new`;
}

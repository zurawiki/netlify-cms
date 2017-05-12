import { OrderedMap, fromJS } from 'immutable';
import { has } from 'lodash';
import consoleError from '../lib/consoleError';
import { CONFIG_SUCCESS } from '../actions/config';
import { FILES, FOLDER } from '../constants/collectionTypes';

const collections = (state = null, action) => {
  const configCollections = action.payload && action.payload.collections;
  switch (action.type) {
    case CONFIG_SUCCESS:
      return OrderedMap().withMutations((map) => {
        (configCollections || []).forEach((configCollection) => {
          if (has(configCollection, 'folder')) {
            configCollection.type = FOLDER; // eslint-disable-line no-param-reassign
          } else if (has(configCollection, 'files')) {
            configCollection.type = FILES; // eslint-disable-line no-param-reassign
          } else {
            throw new Error('Unknown collection type. Collections can be either Folder based or File based. Please verify your site configuration');
          }
          map.set(configCollection.name, fromJS(configCollection));
        });
      });
    default:
      return state;
  }
};

const formatToExtension = format => ({
  markdown: 'md',
  yaml: 'yml',
  json: 'json',
  html: 'html',
}[format]);

const selectors = {
  [FOLDER]: {
    entryExtension(collection) {
      return collection.get('extension') || formatToExtension(collection.get('format') || 'markdown');
    },
    fields(collection) {
      return collection.get('fields');
    },
    entryPath(collection, slug) {
      return `${ collection.get('folder') }/${ slug }.${ this.entryExtension(collection) }`;
    },
    entrySlug(collection, path) {
      return path.split('/').pop().replace(/\.[^\.]+$/, '');
    },
    listMethod() {
      return 'entriesByFolder';
    },
    allowNewEntries(collection) {
      return collection.get('create');
    },
    templateName(collection) {
      return collection.get('name');
    },
  },
  [FILES]: {
    fileForEntry(collection, slug) {
      const files = collection.get('files');
      return files.filter(f => f.get('name') === slug).get(0);
    },
    fields(collection, slug) {
      const file = this.fileForEntry(collection, slug);
      return file && file.get('fields');
    },
    entryPath(collection, slug) {
      const file = this.fileForEntry(collection, slug);
      return file && file.get('file');
    },
    entrySlug(collection, path) {
      const file = collection.get('files').filter(f => f.get('file') === path).get(0);
      return file && file.get('name');
    },
    listMethod() {
      return 'entriesByFiles';
    },
    allowNewEntries() {
      return false;
    },
    templateName(collection, slug) {
      return slug;
    },
  },
};

export const selectFields = (collection, slug) => selectors[collection.get('type')].fields(collection, slug);
export const selectFolderEntryExtension = (collection) => selectors[FOLDER].entryExtension(collection);
export const selectEntryPath = (collection, slug) => selectors[collection.get('type')].entryPath(collection, slug);
export const selectEntrySlug = (collection, path) => selectors[collection.get('type')].entrySlug(collection, path);
export const selectListMethod = collection => selectors[collection.get('type')].listMethod();
export const selectAllowNewEntries = collection => selectors[collection.get('type')].allowNewEntries(collection);
export const selectTemplateName = (collection, slug) => selectors[collection.get('type')].templateName(collection, slug);

export default collections;

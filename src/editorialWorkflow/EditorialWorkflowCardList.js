import React from 'react';
import moment from 'moment';
import { partial } from 'lodash';
import { DragSource } from 'react-simple-dnd';
import { status } from '../constants/publishModes';
import EditorialWorkflowCard from './EditorialWorkflowCard';
import styles from './EditorialWorkflowCardList.css';

/**
 * EditorialWorkflowCardList takes a list of unpublished entries and returns
 * them as draggable cards.
 */
const EditorialWorkflowCardList = ({ entries, requestDelete, requestPublish }) => {
  return (
    <div>
      {
        entries.map((entry) => {
          // Look for an "author" field. Fallback to username on backend implementation;
          const username = entry.getIn(['metaData', 'user']);
          const author = entry.getIn(['data', 'author'], username);
          const timeStamp = moment(entry.getIn(['metaData', 'timeStamp'])).format('llll');
          const link = `collections/${ entry.getIn(['metaData', 'collection']) }/entries/${ entry.get('slug') }`;
          const slug = entry.get('slug');
          const ownStatus = entry.getIn(['metaData', 'status']);
          const collection = entry.getIn(['metaData', 'collection']);
          return (
            <DragSource key={slug} slug={slug} collection={collection} ownStatus={ownStatus}>
              <div className={styles.draggable}>
                <EditorialWorkflowCard
                  collection={collection}
                  isModification={entry.get('isModification')}
                  title={entry.getIn(['data', 'title'])}
                  author={author}
                  timeStamp={timeStamp}
                  username={username}
                  linkUrl={link}
                  handleDeleteClick={partial(requestDelete, collection, slug, ownStatus)}
                  allowPublish={ownStatus === status.last() && !entry.get('isPersisting', false)}
                  handlePublishClick={partial(requestPublish, collection, slug, ownStatus)}
                />
              </div>
            </DragSource>
          );
        })
      }
    </div>
  );
};

export default EditorialWorkflowCardList;

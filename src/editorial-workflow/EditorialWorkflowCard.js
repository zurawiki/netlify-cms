import React from 'react';
import pluralize from 'pluralize';
import { capitalize } from 'lodash'
import { Link } from 'react-router';
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import Button from 'react-toolbox/lib/button';
import EditorialWorkflowCardMeta from './EditorialWorkflowCardMeta.js';
import styles from './EditorialWorkflowCard.css';

const EditorialWorkflowCard = ({
  collection,
  isModification,
  title,
  author,
  timeStamp,
  username,
  linkUrl,
  handleDeleteClick,
  allowPublish,
  handlePublishClick,
}) => (
  <Card className={styles.card}>
    <EditorialWorkflowCardMeta
      meta={capitalize(pluralize(collection))}
      label={isModification ? "" : "New"}
    />
    <CardTitle title={title} subtitle={`by ${ author }`}/>
    <CardText>Last updated: {timeStamp} by {username}</CardText>
    <CardActions>
      <Link to={linkUrl}>
        <Button>Edit</Button>
      </Link>
      <Button onClick={handleDeleteClick}>Delete</Button>
      { allowPublish && <Button accent onClick={handlePublishClick}>Publish now</Button> }
    </CardActions>
  </Card>
);

export default EditorialWorkflowCard;

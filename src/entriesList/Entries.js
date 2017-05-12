import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Waypoint from 'react-waypoint';
import { Map, Set } from 'immutable';
import history from '../routing/history';
import { resolvePath } from '../lib/pathHelper';
import { selectFields } from '../reducers/collections';
import { selectFieldNameForRole } from '../reducers/fieldRoles';
import { Card } from '../components/UI';
import styles from './Entries.css';

export default class Entries extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    publicFolder: PropTypes.string.isRequired,
    collections: PropTypes.oneOfType([
      ImmutablePropTypes.map,
      ImmutablePropTypes.iterable,
    ]).isRequired,
    entries: ImmutablePropTypes.list,
    onPaginate: PropTypes.func.isRequired,
    page: PropTypes.number,
  };

  handleLoadMore = () => {
    this.props.onPaginate(this.props.page + 1);
  };

  renderCard(entry, inferedFields, publicFolder) {
    const path = `/collections/${ entry.get('collection') }/entries/${ entry.get('slug') }`;
    const label = entry.get('label');
    const title = label || entry.getIn(['data', inferedFields.get('titleField')]);
    let image = entry.getIn(['data', inferedFields.get('imageField')]);
    image = resolvePath(image, publicFolder);

    return (
      <Card
        key={entry.get('slug')}
        onClick={history.push.bind(this, path)} // eslint-disable-line
        className={styles.card}
      >
        { image &&
        <header className={styles.cardImage} style={{ backgroundImage: `url(${ image })` }} />
        }
        <h1>{title}</h1>
        {inferedFields.get('descriptionField') ?
          <p>{entry.getIn(['data', inferedFields.get('descriptionField')])}</p>
          : inferedFields.get('remainingFields') && inferedFields.get('remainingFields').map(f => (
            <p key={f.get('name')} className={styles.cardList}>
              <span className={styles.cardListLabel}>{f.get('label')}:</span>{' '}
              { entry.getIn(['data', f.get('name')], '').toString() }
            </p>
          ))
        }
      </Card>
    );
  }
  renderCards = () => {
    const { collection, collections, entries, publicFolder } = this.props;

    const entriesCollections = collection ? Set([collection]) : entries
      .reduce((collectionNames, entry) => collectionNames.add(entry.get('collection')), Set())
      .map(collectionName => collections.find(collection => collection.get('name') === collectionName));

    const fieldsByCollection = entriesCollections.reduce((acc, entryCollection) => {
      const titleField = selectFieldNameForRole(entryCollection, 'title');
      const descriptionField = selectFieldNameForRole(entryCollection, 'description');
      const imageField = selectFieldNameForRole(entryCollection, 'image');
      const fields = selectFields(entryCollection);
      const inferedFields = [titleField, descriptionField, imageField];
      const remainingFields = fields && fields.filter(f => inferedFields.indexOf(f.get('name')) === -1);
      const collectionFields = Map({ titleField, descriptionField, imageField, remainingFields });
      return acc.set(entryCollection.get('name'), collectionFields);
    }, Map());

    return entries.map(entry => {
      return this.renderCard(entry, fieldsByCollection.get(entry.get('collection')), publicFolder);
    });
  };

  render() {
    const { children } = this.props;
    return (
      <div>
        <h1>{children}</h1>
        <div className={styles.cardsGrid}>
          { this.renderCards() }
          <Waypoint onEnter={this.handleLoadMore} />
        </div>
      </div>
    );
  }
}

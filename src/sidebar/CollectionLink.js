import React from 'react';
import { Link } from 'react-router';
import FontIcon from 'react-toolbox/lib/font_icon';
import styles from './CollectionLink.css';

export default function CollectionLink({
  href,
  label,
  showCreateLink,
  createLinkHref,
}) {
  const renderCreateLink = (
    <Link to={createLinkHref} className={styles.createEntryLink}>
      <FontIcon value="add_circle_outline" />
    </Link>
  );

  return (
    <div className={styles.linkWrapper}>
      <Link to={href} className={styles.viewEntriesLink}>{label}</Link>
      { showCreateLink && renderCreateLink}
    </div>
  );
};

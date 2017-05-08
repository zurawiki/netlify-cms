import React from 'react';
import FontIcon from 'react-toolbox/lib/font_icon';
import styles from './CollectionLink.css';

export default function CollectionLink({
  href,
  label,
  handleClick,
  showCreateLink,
  createLinkHref,
  handleCreateClick,
}) {
  return (
    <div className={styles.linkWrapper}>
      <a href={href} className={styles.viewEntriesLink} onClick={handleClick}>{label}</a>
      {
        showCreateLink ? (
          <a href={createLinkHref} className={styles.createEntryLink} onClick={handleCreateClick}>
            <FontIcon value="add_circle_outline" />
          </a>
        ) : null
      }
    </div>
  );
};

import React from 'react';
import { Link, IndexLink } from 'react-router';
import FontIcon from 'react-toolbox/lib/font_icon';
import styles from './SidebarLink.css';

const SidebarLink = ({ href, label, createLinkHref, toIndex }) => {
  const LinkComponent = toIndex ? IndexLink : Link;
  const renderCreateLink = (
    <Link to={createLinkHref} className={styles.createEntryLink}>
      <FontIcon value="add_circle_outline" />
    </Link>
  );

  return (
    <div className={styles.linkWrapper}>
      <LinkComponent to={toIndex ? '/' : href} className={styles.viewEntriesLink}>{label}</LinkComponent>
      { createLinkHref && renderCreateLink}
    </div>
  );
};

export default SidebarLink;

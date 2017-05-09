import React from 'react';
import styles from './SidebarSection.css';

const SidebarSection = ({ label, Links }) => (
  <section>
    <h1 className={styles.heading}>{label}</h1>
    <Links/>
  </section>
);

export default SidebarSection;

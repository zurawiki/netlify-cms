import React, { PropTypes } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import pluralize from "pluralize";
import { IndexLink } from "react-router";
import { IconMenu, Menu, MenuItem } from "react-toolbox/lib/menu";
import Avatar from "react-toolbox/lib/avatar";
import AppBar from "react-toolbox/lib/app_bar";
import FontIcon from "react-toolbox/lib/font_icon";
import FindBar from "../components/FindBar/FindBar";
import history from '../routing/history';
import { getCollectionUrl, getNewEntryUrl } from '../lib/urlHelper';
import { stringToRGB } from "../lib/textHelper";
import styles from "./Header.css";

const Header = ({ user, collections, runCommand, toggleDrawer, onLogoutClick }) => {
  const avatarStyle = { backgroundColor: `#${ stringToRGB(user.get("name")) }` };

  return (
    <AppBar fixed theme={styles} leftIcon="menu" onLeftIconClick={toggleDrawer}>
      <IndexLink to="/" className={styles.homeLink}>
        <FontIcon value="home" className={styles.icon} />
      </IndexLink>
      <IconMenu theme={styles} icon="add">
        {
          collections.filter(collection => collection.get('create')).valueSeq().map(collection => (
            <MenuItem
              key={collection.get("name")}
              value={collection.get("name")}
              onClick={e => history.push(getNewEntryUrl(collection.get("name")))}
              caption={pluralize(collection.get("label"), 1)}
            />
          ))
        }
      </IconMenu>
      <FindBar runCommand={runCommand} />
      <Avatar style={avatarStyle} title={user.get("name")} image={user.get("avatar_url")} />
      <IconMenu icon="settings" position="topRight" theme={styles}>
        <MenuItem onClick={onLogoutClick} value="log out" caption="Log Out" />
      </IconMenu>
    </AppBar>
  );
};

Header.propTypes = {
  user: ImmutablePropTypes.map.isRequired,
  collections: ImmutablePropTypes.orderedMap.isRequired,
  runCommand: PropTypes.func.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
};

export default Header;

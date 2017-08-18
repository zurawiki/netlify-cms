import React, { Component } from 'react';
import { List } from 'immutable';
import { isString } from 'lodash';
import ImmutablePropTypes from 'react-immutable-proptypes';

import FontIcon from 'react-toolbox/lib/font_icon';
import styles from './collapsible.css';

const collapsible = WrappedComponent =>
  class extends Component {
    static propTypes = {
      field: ImmutablePropTypes.map.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = { collapsed: this.props.field.getIn(['collapse', 'startCollapsed'], false) };
    }

    handleToggle = () => {
      this.setState(Object.assign({}, this.state, { collapsed: !this.state.collapsed }));
    }

    getSummary() {
      // By default, we just `toString` the value
      if (this.props.field.getIn(['collapse', 'summary'], true) === true) {
        return <div>{ this.props.value.toString() }</div>;
      }

      const summary = this.props.field.getIn(['collapse', 'summary']);
      if (isString(summary)) {
        return <div>{summary}</div>;
      }

      // If summary.fields is passed, we grab the specified fields out
      // of the value
      const summaryFields = this.props.field.getIn(['collapse', 'summary', 'fields']);
      if (summaryFields) {
        return (<div>{ summaryFields.map(field =>
          <div key={field}>{ this.props.value.get(field, '').toString() }</div>
        ) }</div>);
      }

      return "SUMMARY";
    }

    render() {
      if (this.props.field.get('collapse', false)) {
        return (<div>
          <div>
            <button onClick={this.handleToggle} className={styles.toggleButton}>
              <FontIcon value={this.state.collapsed ? 'expand_more' : 'expand_less'} />
            </button>
          </div>
          {this.state.collapsed
            ? (<div className={styles.summary}>
              {this.getSummary()}
            </div>)
            : <WrappedComponent {...this.props} />}
        </div>);
      }

      return <WrappedComponent {...this.props} />;
    }
  };

export default collapsible;

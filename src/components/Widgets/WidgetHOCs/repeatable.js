import React, { Component, PropTypes } from 'react';
import { fromJS, List, Map } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import FontIcon from 'react-toolbox/lib/font_icon';
import styles from './repeatable.css';

import uuid from 'uuid';

const RepeatableContainer = SortableContainer(
  ({ items, renderItem }) => <div>{items.map(renderItem)}</div>
);

const RepeatableItem = SortableElement(
  props => (<div>
    <DragHandle />
    {props.children}
  </div>)
);

const DragHandle = SortableHandle(
  () => <FontIcon value="drag_handle" className={styles.dragIcon} />
);

const repeatable = WrappedComponent =>
  class Repeatable extends Component {
    static propTypes = {
      field: ImmutablePropTypes.map.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.object,
        PropTypes.string,
        PropTypes.bool,
      ]),
      metadata: ImmutablePropTypes.map,
      onChange: PropTypes.func.isRequired,
      forID: PropTypes.string,
    };

    constructor(props) {
      super(props);
      this.collection = uuid.v4();
    }

    handleChangeFor = index => (newValueForIndex, newMetadata) => {
      const { value, onChange } = this.props;
      const newValue = value.set(index, newValueForIndex);
      onChange(fromJS(newValue));
    };

    handleRemoveFor = index => (e) => {
      e.preventDefault();
      const { value, metadata, onChange, forID } = this.props;
      const parsedMetadata = metadata && {
        [forID]: metadata.removeIn(value.get(index).valueSeq()),
      };
      onChange(value.remove(index), parsedMetadata);
    };

    handleAdd = (e) => {
      e.preventDefault();
      const { value, onChange } = this.props;
      onChange((value || List()).push(null));
    };

    renderItem = (options) => (item, i) => {
      const hashCode = List.isList(item) || Map.isMap(item) ? item.hashCode() : item;
      const key = options.idField ? this.props.value.getIn([i, options.idField], hashCode) : hashCode;
      return (<RepeatableItem
        key={key}
        collection={this.collection}
        index={i}
      >
        {options.create
          ? (<button className={styles.removeButton} onClick={this.handleRemoveFor(i)}>
            <FontIcon value="close" />
          </button>)
          : ''}
        <WrappedComponent
          {...this.props}
          className={styles.repeatedComponent}
          value={item}
          onChange={this.handleChangeFor(i)}
        />
      </RepeatableItem>);
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
      const oldItem = this.props.value.get(oldIndex);
      const newValue = this.props.value.delete(oldIndex).insert(newIndex, oldItem);
      this.props.onChange(newValue);
    };

    renderItems(options) {
      const { value, field, forID } = this.props;
      return (<div id={forID}>
        <RepeatableContainer
          items={value || List()}
          lockAxis="y"
          lockToContainerEdges
          onSortEnd={this.onSortEnd}
          renderItem={this.renderItem(options)}
          useDragHandle
        />
        {options.create
          ? (<button className={styles.addButton} onClick={this.handleAdd}>
            <FontIcon value="add" className={styles.addButtonText} />
            <span className={styles.addButtonText}>
              new {options.singularLabel.toLowerCase()}
            </span>
          </button>)
          : ''}
      </div>);
    }

    render() {
      const repeatField = this.props.field.get("repeat", false);
      if (repeatField) {
        const repeatDefaults = {
          create: true,
          singularLabel: this.props.field.get("label", "item"),
          idField: false,
        };
        const repeatOptions = Map.isMap(repeatField)
          ? Object.assign({}, repeatDefaults, repeatField.toJS())
          : repeatDefaults;
        return this.renderItems(repeatOptions);
      }

      return <WrappedComponent {...this.props} />;
    }
  };

export default repeatable;

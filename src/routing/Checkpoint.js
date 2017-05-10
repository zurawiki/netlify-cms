import React from 'react';

/**
 * Checkpoint allows a component to be loaded conditionally, and accepts a
 * message to show in case of failure.
 */
const Checkpoint = ({
  test,
  failureMessage,
  failureMessageClassName,
  component,
  componentProps,
}) => {
  if (test) {
    return React.createElement(component, componentProps);
  }
  return <div className={failureMessageClassName}>{failureMessage}</div>
};

export default Checkpoint;

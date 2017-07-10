import collapsible from './WidgetHOCs/collapsible';
import repeatable from './WidgetHOCs/repeatable';

// These are applied first-to-last
export const HOCs = [collapsible, repeatable];

export const applyHOCs = component => HOCs.reduce(
  (acc, HOC) => HOC(acc),
  component
);

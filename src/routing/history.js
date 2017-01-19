import { createHashHistory } from 'history';
import { useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

let history = useRouterHistory(createHashHistory)({
  queryKey: 'key',
  keyLength: 3,
});

const syncHistory = (store) => {
  history = syncHistoryWithStore(history, store);
};

export { syncHistory };
export default history;

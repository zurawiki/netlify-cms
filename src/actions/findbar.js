import history from '../routing/history';
import { SEARCH } from '../app/SearchBar';

export const RUN_COMMAND = 'RUN_COMMAND';

export function runCommand(command, payload) {
  return (dispatch) => {
    switch (command) {
      case SEARCH:
        history.push(`/search/${ payload.searchTerm }`);
        break;
      default:
        break;
    }
    dispatch({ type: RUN_COMMAND, command, payload });
  };
}

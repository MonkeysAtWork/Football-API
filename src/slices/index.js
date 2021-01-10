import gamesInfo, { actions as gamesActions, selectors as gamesSelectors } from './gamesInfoSlice';
import teamsInfo, { actions as teamsActions, selectors as teamsSelectors, setTeamsStatsAsync } from './teamsInfoSlice';

const reducers = {
  gamesInfo,
  teamsInfo,
};

const actions = {
  ...gamesActions,
  ...teamsActions,
  setTeamsStatsAsync,
};

const selectors = {
  ...gamesSelectors,
  ...teamsSelectors,
};

export default reducers;
export { actions };
export { selectors };

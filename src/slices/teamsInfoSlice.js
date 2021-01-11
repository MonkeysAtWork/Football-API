/* eslint-disable object-curly-newline */
/* eslint-disable no-prototype-builtins */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';
// import teamTestData from './teamTestData';
import { maxFiltersAmount, options, filterDefaultValue } from '../config';
import { isFilterMatch } from '../utils';

export const initialFilter = {
  goalsCompare: { action: 'equal', value: filterDefaultValue, name: 'goalsCompare' },
  missedGoalsCompare: { action: 'equal', value: filterDefaultValue, name: 'missedGoalsCompare' },
};

export const teamsInfoSlice = createSlice({
  name: 'teamsInfo',
  initialState: {
    filtredTeams: [],
    teamsFilters: [{ ...initialFilter }],
    requestState: '',
  },
  reducers: {
    addTeamsFilter: (state) => {
      const { length } = state.teamsFilters;
      if (length < maxFiltersAmount) {
        state.teamsFilters.push({ ...initialFilter });
      }
    },
    deleteLastTeamsFilter: (state) => {
      const { length } = state.teamsFilters;
      if (length > 1) {
        state.teamsFilters.pop();
      }
    },
    changeTeamsFilter: (state, action) => {
      const { paramName, index, newState } = action.payload;

      state.teamsFilters[index][paramName] = newState;
    },
    setTeamsStatsRequest: (state) => {
      state.requestState = 'requested';
    },
    setTeamsStatsFailure: (state) => {
      state.requestState = 'failured';
    },
    setTeamsStats: (state, action) => {
      state.requestState = 'success';
      state.filtredTeams = action.payload;
    },
  },
});

export const { actions } = teamsInfoSlice;

const CACHE = {};

const fetchTeamStat = (team) => {
  const { id: teamId } = team;

  if (CACHE[teamId]) {
    return Promise.resolve({ ...team, stats: CACHE[teamId] });
  }
  const url = routes.teamStatPath(teamId, maxFiltersAmount);
  return axios.get(url, options)
    .then((response) => {
      const { fixtures } = response.data.api;
      CACHE[teamId] = fixtures;
      return { ...team, stats: fixtures };
    })
    .catch((error) => {
      console.log(`ошибка при получении данных команды id: ${teamId}`);
      console.error(error);
      const response = { ...team, error };
      return response;
    });
};

// const getTestData = (team) => {
//   const { id: teamId } = team;
//   return new Promise((res, rej) => {
//     if (teamId === 33) {
//       res(teamTestData);
//       return;
//     }
//     if (teamId % 2 === 0) {
//       res(teamTestData);
//     } else {
//       rej(new Error({ id: teamId, error: 'some error ' }));
//     }
//   })
//     .then((response) => {
//       const { fixtures } = response.api;
//       CACHE[teamId] = { ...team, stats: fixtures };
//       return CACHE[teamId];
//     })
//     .catch((error) => {
//       // console.log(`ошибка при получении данных команды id: ${teamId}`);
//       // console.error(error);
//       const response = { ...team, error };
//       throw Error(response);
//     });
// };

const isTeamMatchFilters = (team, teamsFilters) => teamsFilters.every((filterParams, index) => {
  const isCurrentSideHome = team.stats[index].homeTeam.team_id === team.id;
  const { goalsHomeTeam, goalsAwayTeam } = team.stats[index];

  if (isCurrentSideHome) {
    return isFilterMatch(goalsHomeTeam, goalsAwayTeam, filterParams);
  }

  return isFilterMatch(goalsAwayTeam, goalsHomeTeam, filterParams);
});

export const setTeamsStatsAsync = (teams) => async (dispatch, getState) => {
  dispatch(actions.setTeamsStatsRequest());

  try {
    const promises = teams.map(fetchTeamStat);
    const teamsWithExtendedStats = await Promise.allSettled(promises);
    const { teamsFilters } = getState().teamsInfo;
    const successResult = teamsWithExtendedStats
      .filter(({ status }) => status === 'fulfilled')
      .map(({ value }) => value)
      .filter((team) => isTeamMatchFilters(team, teamsFilters));
    dispatch(actions.setTeamsStats(successResult));
  } catch (error) {
    console.log('ошибка в сборке промиса');
    console.error(error);
    dispatch(actions.setTeamsStatsFailure());
  }
};

export const selectFiltredTeams = (state) => {
  const { filtredTeams } = state.teamsInfo;
  const result = filtredTeams.map(({ name, id, league, country }) => (
    { name, id, league, country }
  ));

  return result;
};

export const selectTeamsFilters = (state) => state.teamsInfo.teamsFilters;

export const selectTeamsFiltersLength = (state) => state.teamsInfo.teamsFilters.length;

export const selectRequestState = (state) => state.teamsInfo.requestState;

export const selectors = {
  selectFiltredTeams,
  selectTeamsFilters,
  selectTeamsFiltersLength,
  selectRequestState,
};

export default teamsInfoSlice.reducer;

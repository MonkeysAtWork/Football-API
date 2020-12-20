/* eslint-disable object-curly-newline */
/* eslint-disable no-prototype-builtins */
import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';
// import routes from './routes';
// import serverOptions from './apiConfig';
import teamTestData from './teamTestData';

export const initialFilter = {
  goalsFilterAction: 'equal',
  goalsFilterValue: 0,
  missedGoalsFilterAction: 'equal',
  missedGoalsFilterValue: 0,
};

export const teamsInfoSlice = createSlice({
  name: 'teamsInfo',
  initialState: {
    teamsStats: {},
    teamsFilters: [{ ...initialFilter }],
  },
  reducers: {
    addTeamsFilter: (state) => {
      state.teamsFilters.push({ ...initialFilter });
    },
    deleteLastTeamsFilter: (state) => {
      const { length } = state.teamsFilters;
      if (length > 1) {
        state.teamsFilters.pop();
      }
    },
    setTeamsFilter: (state, action) => {
      state.teamsFilters[action.payload.index] = {
        ...state.teamsFilters[action.payload.index],
        ...action.payload.newParams,
      };
    },
    setTeamsStats: (state, action) => {
      state.teamsStats[action.payload.id] = action.payload.data;
    },
  },
});

export const {
  setTeamsFilter,
  addTeamsFilter,
  deleteLastTeamsFilter,
  setTeamsStats,
  resetFiltredTeams,
} = teamsInfoSlice.actions;

export const fetchTeamsStatsAsync = (teams) => (dispatch, getState) => {
  const { teamsStats } = getState().teamsInfo;

  // const getTeamStat = (team) => {
  //   const { teamId } = team;

  //   if (teamsStats.hasOwnProperty(teamId)) {
  //     return;
  //   }

  //   const url = routes.teamStatPath(teamId);
  //   axios.get(url, serverOptions)
  //     .then((response) => (
  //       dispatch(setTeamsStats({ id: teamId, data: { ...team, ...response.data } }))))
  //     .catch(console.error);
  // };

  const getTestData = (team) => {
    const { teamId } = team;
    if (teamsStats.hasOwnProperty(teamId)) {
      return;
    }
    new Promise((res) => {
      if (teamId) {
        res(teamTestData);
        return;
      }
      if (teamId % 2 === 0) {
        res({ id: teamId, name: 'ggg' });
      } else {
        res({ id: teamId, error: 'some error ' });
      }
    })
      // .then(console.log)
      .then((resp) => dispatch(setTeamsStats({ id: teamId, data: { ...team, ...resp } })))
      .catch(console.log);
  };

  teams.forEach(getTestData);
};

const filterActions = {
  equal: (realValue, filterValue) => realValue === filterValue,
  gt: (realValue, filterValue) => realValue >= filterValue,
  lt: (realValue, filterValue) => realValue <= filterValue,
};

const isFilterMatch = (goals, missedGoals, filter) => {
  const {
    goalsFilterAction,
    goalsFilterValue,
    missedGoalsFilterAction,
    missedGoalsFilterValue,
  } = filter;

  return (
    filterActions[goalsFilterAction](goals, goalsFilterValue)
    && filterActions[missedGoalsFilterAction](missedGoals, missedGoalsFilterValue)
  );
};

export const selectFiltredTeams = (state) => {
  const { teamsStats, teamsFilters } = state.teamsInfo;

  const isEveryFiltersMatch = (team) => teamsFilters.every((filterParams, index) => {
    const isCurrentSideHome = team.api.fixtures[index].homeTeam.team_id === team.id;

    const { goalsHomeTeam, goalsAwayTeam } = team.api.fixtures[index];

    if (isCurrentSideHome) {
      return isFilterMatch(goalsHomeTeam, goalsAwayTeam, filterParams);
    }

    return isFilterMatch(goalsAwayTeam, goalsHomeTeam, filterParams);
  });

  const allTeams = Object.values(teamsStats);

  const filtredTeams = allTeams.filter(isEveryFiltersMatch);

  const result = filtredTeams.map((stat) => {
    const { name, teamId, league, country } = stat;
    // const { name: league } = api.fixtures[0].league;
    return { name, id: teamId, league, country };
  });

  return result;
};

export const selectTeamsFilters = (state) => state.teamsInfo.teamsFilters;

export default teamsInfoSlice.reducer;

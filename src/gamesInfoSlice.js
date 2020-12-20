/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { setTeamsFilter } from './teamsInfoSlice';

export const gamesInfoSlice = createSlice({
  name: 'gamesInfo',
  initialState: {
    gamesStats: [],
    gamesFilter: {},
  },
  extraReducers: {
    [setTeamsFilter.type]: (state, action) => {
      if (action.payload.index === 0) {
        state.gamesFilter = {
          ...state.gamesFilter,
          ...action.payload.newParams,
        };
      }
    },
  },
});

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

export const selectFiltredTeamsIds = (state) => {
  const { gamesStats, gamesFilter } = state.gamesInfo;
  const successfulStatuses = ['FT', 'AET', 'PEN'];

  const filtredTeamsIds = gamesStats.reduce((acc, gameStat) => {
    if (!successfulStatuses.includes(gameStat.statusShort)) {
      return acc;
    }
    const { goalsHomeTeam, goalsAwayTeam } = gameStat;

    const {
      homeTeam: { team_id: homeTeamId, team_name: homeTeamName },
      awayTeam: { team_id: awayTeamId, team_name: awayTeamName },
      league: { name: leagueName, country: ligueCountry },
    } = gameStat;

    if (isFilterMatch(goalsHomeTeam, goalsAwayTeam, gamesFilter)) {
      acc[homeTeamId] = {
        id: homeTeamId,
        name: homeTeamName,
        league: leagueName,
        country: ligueCountry,
      };
    }
    if (isFilterMatch(goalsAwayTeam, goalsHomeTeam, gamesFilter)) {
      acc[awayTeamId] = {
        id: awayTeamId,
        name: awayTeamName,
        league: leagueName,
        country: ligueCountry,
      };
    }

    return acc;
  }, {});

  return Object.values(filtredTeamsIds);
};

export const selectGamesFilter = (state) => state.gamesInfo.gamesFilter;

export default gamesInfoSlice.reducer;

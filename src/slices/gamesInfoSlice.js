/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { actions as teamsActions } from './teamsInfoSlice';
import { isFilterMatch } from '../utils';

export const gamesInfoSlice = createSlice({
  name: 'gamesInfo',
  initialState: {
    gamesStats: [],
    gamesFilter: {},
  },
  extraReducers: {
    [teamsActions.changeTeamsFilter.type]: (state, action) => {
      const { paramName, index, newState } = action.payload;
      if (index === 0) {
        state.gamesFilter[paramName] = newState;
      }
    },
  },
});

const successfulStatuses = ['FT', 'AET', 'PEN'];

export const selectFiltredTeamsFromGames = (state) => {
  const { gamesStats, gamesFilter } = state.gamesInfo;

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
        stats: gameStat,
      };
    }
    if (isFilterMatch(goalsAwayTeam, goalsHomeTeam, gamesFilter)) {
      acc[awayTeamId] = {
        id: awayTeamId,
        name: awayTeamName,
        league: leagueName,
        country: ligueCountry,
        stats: gameStat,
      };
    }

    return acc;
  }, {});

  return Object.values(filtredTeamsIds);
};

// export const selectGamesFilter = (state) => state.gamesInfo.gamesFilter;

export const { actions } = gamesInfoSlice;

export const selectors = {
  selectFiltredTeamsFromGames,
};

export default gamesInfoSlice.reducer;

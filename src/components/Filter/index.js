/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectors, actions } from '../../slices';

import FilterItems from './FilterItems';

const Filter = () => {
  const teamsFilters = useSelector(selectors.selectTeamsFilters);
  const filtredTeams = useSelector(selectors.selectFiltredTeamsFromGames);
  const teamsFilterLength = useSelector(selectors.selectTeamsFiltersLength);
  const requestState = useSelector(selectors.selectRequestState);

  const dispatch = useDispatch();

  const addFilter = () => dispatch(actions.addTeamsFilter());
  const deleteFilter = () => dispatch(actions.deleteLastTeamsFilter());

  const processTeamsFilters = (e) => {
    e.preventDefault();

    if (teamsFilterLength === 1) {
      dispatch(actions.setTeamsStats(filtredTeams));
    } else {
      dispatch(actions.setTeamsStatsAsync(filtredTeams));
    }
  };

  return (
    <form className="container-fluid" onSubmit={processTeamsFilters}>
      <div className="row mb-2 flex-nowrap">
        <div className="col-1 mr-3">
          <span className="p-0">№</span>
        </div>
        <div className="col mr-2 m-0 p-0">
          <span className="p-0">Забито</span>
        </div>
        <div className="col m-0 p-0">
          <span className="p-0">Пропущено</span>
        </div>
      </div>
      {teamsFilters.map((filterState, index) => (
        <FilterItems key={index} filterState={filterState} index={index} />))}
      <div className="row mt-3 flex-nowrap justify-content-between">
        <div>
          <button
            className="btn btn-primary"
            type="submit"
            disabled={requestState === 'requested'}
          >
            {requestState === 'requested' && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
            )}
            Найти
          </button>
        </div>
        <div>
          <div className="d-flex flex-nowrap">
            <button
              className="btn btn-outline-primary p-1"
              type="button"
              onClick={addFilter}
            >
              +
            </button>
            <button
              className="btn btn-outline-primary p-1 ml-2"
              type="button"
              onClick={deleteFilter}
            >
              &minus;
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Filter;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectFiltredTeamsIds } from '../../gamesInfoSlice';
import {
  addTeamsFilter,
  deleteLastTeamsFilter,
  fetchTeamsStatsAsync,
} from '../../teamsInfoSlice';
import FilterElements from './FilterElements';

const Filter = () => {
  const filtredTeamsIds = useSelector(selectFiltredTeamsIds);

  const dispatch = useDispatch();

  const addFilter = () => dispatch(addTeamsFilter());
  const deleteFilter = () => dispatch(deleteLastTeamsFilter());

  const getFiltredTeamsIds = (e) => {
    e.preventDefault();
    console.log(filtredTeamsIds);
    dispatch(fetchTeamsStatsAsync(filtredTeamsIds));
  };

  return (
    <form className="container-fluid" onSubmit={getFiltredTeamsIds}>
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
      <FilterElements />
      <div className="row mt-3 flex-nowrap justify-content-between">
        <div>
          <button className="btn btn-primary" type="submit">
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

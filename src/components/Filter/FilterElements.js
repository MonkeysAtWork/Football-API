/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  setTeamsFilter,
  selectTeamsFilters,
} from '../../teamsInfoSlice';
// import Item from './Item';

const FilterElements = () => {
  const teamsFilters = useSelector(selectTeamsFilters);

  const dispatch = useDispatch();

  return teamsFilters.map((filterParams, index) => {
    const {
      goalsFilterAction,
      goalsFilterValue,
      missedGoalsFilterAction,
      missedGoalsFilterValue,
    } = filterParams;

    const makeNewFilterParams = (paramName, newValue) => ({
      newParams: { ...teamsFilters[index], [paramName]: newValue },
      index,
    });

    return (
      <div key={index} className="row flex-nowrap mb-2">
        <div className="col-1 mr-3 d-flex align-items-center">
          <span className="">{-index}</span>
        </div>
        <div className="col d-flex flex-nowrap p-0 mr-2">
          <select
            className="custom-select col-7"
            value={goalsFilterAction}
            onChange={(e) => dispatch(setTeamsFilter(makeNewFilterParams('goalsFilterAction', e.target.value)))}
          >
            <option value="equal">=</option>
            <option value="gt">&gt;=</option>
            <option value="lt">&lt;=</option>
          </select>
          <input
            type="number"
            className="form-control col-5"
            min="0"
            value={goalsFilterValue}
            onChange={(e) => dispatch(setTeamsFilter(makeNewFilterParams('goalsFilterValue', parseInt(e.target.value, 10))))}
            onBlur={(e) => {
              if (!e.target.value) {
                dispatch(setTeamsFilter(makeNewFilterParams('goalsFilterValue', 0)));
              }
            }}
          />
        </div>
        <div className="col d-flex flex-nowrap p-0">
          <select
            className="custom-select col-7"
            value={missedGoalsFilterAction}
            onChange={(e) => dispatch(
              setTeamsFilter(
                makeNewFilterParams('missedGoalsFilterAction', e.target.value),
              ),
            )}
          >
            <option value="equal">=</option>
            <option value="gt">&gt;=</option>
            <option value="lt">&lt;=</option>
          </select>
          <input
            type="number"
            className="form-control col-5"
            min="0"
            value={missedGoalsFilterValue}
            onChange={(e) => dispatch(setTeamsFilter(makeNewFilterParams('missedGoalsFilterValue', parseInt(e.target.value, 10))))}
            onBlur={(e) => {
              if (!e.target.value) {
                dispatch(setTeamsFilter(makeNewFilterParams('missedGoalsFilterValue', 0)));
              }
            }}
          />
        </div>
      </div>
    );
  });
};

export default FilterElements;

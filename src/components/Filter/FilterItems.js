/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch } from 'react-redux';

import { actions } from '../../slices';
import { filterDefaultValue } from '../../config';

const FilterItem = (props) => {
  const { filterState, index } = props;

  const dispatch = useDispatch();

  const {
    goalsCompare,
    missedGoalsCompare,
  } = filterState;

  const setNewFilterParameter = (newState) => {
    const data = {
      newState,
      paramName: newState.name,
      index,
    };

    dispatch(actions.changeTeamsFilter(data));
  };

  const changeFilterValue = (comparatorState) => (event) => {
    let { value } = event.target;

    const parsedValue = parseInt(value, 10);

    if (!Number.isNaN(parsedValue)) {
      value = parsedValue;
    }
    const newState = { ...comparatorState, value };

    setNewFilterParameter(newState);
  };

  const changeFilterAction = (comparatorState) => (event) => {
    const newState = { ...comparatorState, action: event.target.value };

    setNewFilterParameter(newState);
  };

  const resetParamIfNoValue = (comparatorState, defaultValue) => (event) => {
    if (!event.target.value) {
      const newState = { ...comparatorState, value: defaultValue };
      setNewFilterParameter(newState);
    }
  };

  return (
    <div className="row flex-nowrap mb-2">
      <div className="col-1 mr-3 d-flex align-items-center">
        <span className="">{-index}</span>
      </div>
      <div className="col d-flex flex-nowrap p-0 mr-2">
        <select
          className="custom-select col-7"
          value={goalsCompare.action}
          onChange={changeFilterAction(goalsCompare)}
        >
          <option value="equal">=</option>
          <option value="gt">&gt;=</option>
          <option value="lt">&lt;=</option>
        </select>
        <input
          type="number"
          className="form-control col-5"
          min={0}
          value={goalsCompare.value}
          onChange={changeFilterValue(goalsCompare)}
          onBlur={resetParamIfNoValue(goalsCompare, filterDefaultValue)}
        />
      </div>
      <div className="col d-flex flex-nowrap p-0">
        <select
          className="custom-select col-7"
          value={missedGoalsCompare.action}
          onChange={changeFilterAction(missedGoalsCompare)}
        >
          <option value="equal">=</option>
          <option value="gt">&gt;=</option>
          <option value="lt">&lt;=</option>
        </select>
        <input
          type="number"
          className="form-control col-5"
          min="0"
          value={missedGoalsCompare.value}
          onChange={changeFilterValue(missedGoalsCompare)}
          onBlur={resetParamIfNoValue(missedGoalsCompare, filterDefaultValue)}
        />
      </div>
    </div>
  );
};

export default FilterItem;

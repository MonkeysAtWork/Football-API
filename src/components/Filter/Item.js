/* eslint-disable */
import React from 'react';

const Item = (props) => {
  const { action, value } = props;

  return (
    <div className="col d-flex flex-nowrap p-0 mr-2">
      <select
        className="custom-select"
        value={action}
        onChange={(e) => dispatch(setTeamsFilter(makeNewFilterData('goalsFilterAction', e.target.value)))}
      >
        <option value="equal">=</option>
        <option value="gt">&gt;=</option>
        <option value="lt">&lt;=</option>
      </select>
      <input
        type="number"
        className="form-control col-5"
        min="0"
        value={value}
        onChange={(e) => dispatch(setTeamsFilter(makeNewFilterData('goalsFilterValue', parseInt(e.target.value, 10))))}
        onBlur={(e) => {
          if (!e.target.value) {
            dispatch(setTeamsFilter(makeNewFilterData('goalsFilterValue', 0)));
          }
        }}
      />
    </div>
  );
};

export default Item;

/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useSelector } from 'react-redux';

import { selectors } from './slices';
// import './App.css';

import Filter from './components/Filter';
import ResultsTable from './components/ResultsTable';

const App = () => {
  const formRequestState = useSelector(selectors.selectRequestState);

  return (
    <div className="container-md pt-5 d-flex flex-wrap">
      <div className="mb-5 col col-sm-5">
        <Filter />
      </div>
      {formRequestState === 'success' && (
        <div className="col col-sm-7">
          <ResultsTable />
        </div>
      )}
    </div>
  );
};

export default App;

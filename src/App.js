/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React from 'react';

// import './App.css';
import Filter from './components/Filter';
import ResultsTable from './components/ResultsTable';

const App = () => (
  <div className="container-md pt-5 d-flex flex-wrap">
    <div className="mb-5 col col-md-5">
      <Filter />
    </div>
    <div className="col col-md-7">
      <ResultsTable />
    </div>
  </div>
);

export default App;

import React from 'react';
import { useSelector } from 'react-redux';

import { selectors } from '../slices';

const ResultsTable = () => {
  const filtredTeams = useSelector(selectors.selectFiltredTeams);

  return (
    <table className="table table-borderless">
      <thead>
        <tr>
          <th>#</th>
          <th>Команда</th>
          <th>Лига</th>
          <th>Страна</th>
        </tr>
      </thead>
      <tbody>
        {filtredTeams.map((team, i) => (
          <tr key={team.id}>
            <td>{i + 1}</td>
            <td>{team.name}</td>
            <td>{team.league}</td>
            <td>{team.country}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultsTable;

/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import { format } from 'date-fns';

import App from './App';
import * as serviceWorker from './serviceWorker';
import gamesInfoReducer from './gamesInfoSlice';
import teamsInfoReducer, { initialFilter } from './teamsInfoSlice';
import routes from './routes';
import serverOptions from './apiConfig';
import data from './test_data_20-12-07';

(async () => {
  const rootElement = document.getElementById('root');

  // const currentDate = format(new Date(), 'yyyy-MM-dd');
  // const url = routes.dayStatPath(currentDate);

  // let data;

  // try {
  //   const response = await axios.get(url, serverOptions);
  //   data = response.data;
  // } catch (error) {
  //   console.error(error);
  //   rootElement.innerHTML = '<h3 class="p-3">Cервер статистики недоступен, попробуйте перезагрузить страницу.<br> При повторной ошибке обратитесь в техподдержку.</h3>';
  //   return;
  // }

  const preloadedState = {
    gamesInfo: {
      gamesStats: data.api.fixtures,
      gamesFilter: initialFilter,
    },
    teamsInfo: {
      teamsStats: {},
      teamsFilters: [initialFilter],
    },
  };

  const store = configureStore({
    reducer: {
      gamesInfo: gamesInfoReducer,
      teamsInfo: teamsInfoReducer,
    },
    preloadedState,
  });

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    rootElement,
  );

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
})();

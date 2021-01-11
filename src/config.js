export const options = {
  params: { timezone: 'Europe/Moscow' },
  headers: {
    'x-rapidapi-key': process.env.REACT_APP_API_KEY,
    'x-rapidapi-host': 'https://v2.api-football.com/',
  },
};

export const maxFiltersAmount = 3;

export const filterDefaultValue = 0;

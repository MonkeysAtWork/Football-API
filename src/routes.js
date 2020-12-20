const host = 'https://v2.api-football.com';
const prefix = 'fixtures';

export default {
  teamStatPath: (id, amount = 10) => [host, prefix, 'team', id, 'last', amount].join('/'),
  dayStatPath: (date) => [host, prefix, 'date', date].join('/'),
};

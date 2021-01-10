/* eslint-disable import/prefer-default-export */

const compareActions = {
  equal: (realValue, filterValue) => realValue === filterValue,
  gt: (realValue, filterValue) => realValue >= filterValue,
  lt: (realValue, filterValue) => realValue <= filterValue,
};

export const isFilterMatch = (goals, missedGoals, filter) => {
  const {
    goalsCompare,
    missedGoalsCompare,
  } = filter;

  const isGoalsMatchFilter = compareActions[goalsCompare.action];
  const isMissedGoalsMatchFilter = compareActions[missedGoalsCompare.action];

  return (
    isGoalsMatchFilter(goals, goalsCompare.value)
    && isMissedGoalsMatchFilter(missedGoals, missedGoalsCompare.value)
  );
};

import conditionGroups from './condition-groups';

/**
 * Returns the weather icon class depends on approximate condition.
 *
 * @example
 * `wi wi-na`
 * `wi wi-owm-804`
 * `wi wi-owm-622`
 *
 * @param {Number} condition
 * @return {string}
 *
 * @author Volodymyr Chumak <coder.ua@gmail.com>
 */
const getIconClassNameByApproxCondition = function getIconClassNameByApproxCondition(condition) {
  const groupId = parseInt((condition / 100), 10);

  if (!(groupId in conditionGroups)) {
    // N/A
    return 'wi wi-na';
  }

  let iconCondition = condition;

  if (conditionGroups[groupId].indexOf(condition) === -1) {
    // Get the most closes value to condition from the Condition group
    const index = conditionGroups[groupId].reduce((acc, curr, i, arr) => {
      return i && Math.abs(arr[acc] - condition) < Math.abs(curr - condition) ? acc : i;
    }, -1);

    iconCondition = conditionGroups[groupId][index];
  }

  return `wi wi-owm-${iconCondition}`;
};

export default getIconClassNameByApproxCondition;

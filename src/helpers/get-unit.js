import unitsMap from '../constants/units-map';

/**
 * Returns a unit for a passed system and unit type
 *
 * @example
 * getUnit('metric', 'temperature') => 'C'
 * getUnit('imperial', 'temperature') => 'F'
 *
 * @param {String} systemType Example: metric, imperial
 * @param {String} unitType Example: temperature
 * @return {String}
 *
 * @author Volodymyr Chumak <coder.ua@gmail.com>
 */
const getUnit = function getUnit(systemType, unitType) {
  return unitsMap[systemType] && unitsMap[systemType][unitType] ? unitsMap[systemType][unitType] : '';
};

export default getUnit;

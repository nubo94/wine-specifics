/**
 * Receive two values, can be 1 to 100, and return a random number between 1 and 100
 * @param1 {min} min number less than max
 * @param2 {max} max number greater than min
 * @return random number between min and max params
 */

const _getRandomInt = (min: number, max: number) => {
  if (min > max) {
    throw new Error("min cannot be greater than max");
  }
  if (!min && !max) {
    return 1;
  }
  if (!min) {
    return Math.floor(Math.random() * (max - 1)) + 1;
  }
  if (!max) {
    return Math.floor(Math.random() * (1 - min)) + min;
  }
  return Math.floor(Math.random() * (max - min)) + min;
};

export default _getRandomInt;

/**
 * Score by fields
 * @param1 {x} Total Fields
 * @param2 {y} Fields success
 * @param2 {z} limit score
 * @return number
 */

export const _score = (x, y, z) => {
  const r = (((x - (x - y)) / x) * z).toFixed(0);
  return r === "NaN" ? 0 : r;
};

import flatten from "lodash/flatten";

/**
 * Receive two values, can be 1 to 100, and return a random number between 1 and 100
 * @param2 {elements} arr to update
 * @param2 {fields} field to search and update
 * @return arr[]
 */

function _showFieldsHidden(elements, fields) {
  const updated = flatten(elements.map((i) => i.items))
    .filter((f) => !f?.show)
    .map((i) => {
      const matched =
        fields && Object.keys(fields).filter((f) => f === i.depend);
      if (matched?.length) {
        return elements.map((i) => ({
          ...i,
          items: i.items.map((_i) =>
            matched.includes(_i.depend)
              ? { ..._i, show: fields[_i.depend] === "" ? true : false }
              : { ..._i }
          ),
        }));
      }
    })[0];
  return updated;
}
export default _showFieldsHidden;

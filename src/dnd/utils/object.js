
export const get = (path, object, index = 0) => {
  const field = path[index];

  if (!path.length || !object || !field) return undefined;

  if (path.length - 1 === index) {
    return object[field];
  }

  return get(path, object[field], index + 1);
};

export const getOr = (fallback, path, object) => {
  const value = get(path, object);
  const isNil = value === undefined || value === null;

  return isNil ? fallback : value;
};

//
// export const assoc = (path, value, object, result, fields) => {
//   const calculations = path.reduce(
//     (acc, field, index) => {
//       acc.fields.push(field);
//       const nesting = get(acc.fields, object);
//       const target = path.length - 1 === index;
//
//       if (target) {
//         acc.result[field] = value;
//       }
//
//       if (nesting) {
//         acc.result[field] = nesting;
//       } else {
//         acc.result[field] = {};
//       }
//
//       return assoc(path, value, object, acc.result[field], acc.fields);
//     },
//
//     {
//       result: result || {},
//       previous: null,
//       fields: fields || [],
//     },
//   );
//
//   return calculations.result;
// };
//
// export const dissoc = () => {};

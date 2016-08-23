/**
 *
 * This is the one reading the promise: from the action.
 * And also execute it with the client.
 *
 * However I now have 2 clients so I cannot reuse this one.
 * Maybe instead of calling it promise I direct to the right api?
 *
 * website:
 * content:
 *
 * @param client
 * @returns {Function}
 */
export default function clientMiddleware(client, key) {
  return ({ dispatch, getState }) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { types, ...rest } = action; // eslint-disable-line no-redeclare
      const promise = action[key];

      console.log('THIS IS OUR REST', rest);
      if (!promise) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      // const [SUCCESS, FAILURE] = types;
      next({ ...rest, type: REQUEST });
      console.log('DOING REQUEST', REQUEST);
      // return next({...rest, type: REQUEST}).
      return promise(client).then(
        (result) => { console.log('GOT RESULT'); return next({ ...rest, result, type: SUCCESS }); },
        (error) => next({ ...rest, error, type: FAILURE })
      ).catch((error) => {
        console.error('MIDDLEWARE ERROR:', error);
        next({ ...rest, error, type: FAILURE });
      });
    };
  };
}

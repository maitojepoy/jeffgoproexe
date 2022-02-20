export const toMap = array => array.reduce((acc, user) => {
  acc[user.id] = user;
  return acc;
}, {});

export const removePropFromObject = (obj, prop) => (
  Object.keys(obj).reduce((acc, key) => {
    if (key !== prop) {
      acc[key] = obj[key];
    }
    return acc;
  }, {})
);

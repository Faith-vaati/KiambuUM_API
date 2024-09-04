const cleanObject = (obj) => {
  for (const key in obj) {
    if (obj[key] === "" || obj[key] === null) {
      delete obj[key];
    }
  }
  return obj;
};

exports.cleanObject = cleanObject;

const bcrypt = require("bcrypt");

export const hashPass = async (plainText) => {
  return bcrypt.hash(plainText, 10).then((hashString) => {
    return hashString;
  });
};

export const isSamePassword = async (plainText, hashString) => {
  return bcrypt.compare(plainText, hashString).then((result) => {
    return result;
  });
};

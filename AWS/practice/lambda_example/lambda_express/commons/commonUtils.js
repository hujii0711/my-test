const com = {};

com.uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

com.krDate = () => {
  return new Date(Date.now() + 1000 * 60 * 60 * 9).toJSON(); //2022-12-30T16:51:39.228Z
};

module.exports = com;

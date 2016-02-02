module.exports = function (o) {
  o.getGlobal = function () {
    return o;
  };
};

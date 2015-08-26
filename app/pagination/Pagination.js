var Pagination = {};

Pagination.postSorter = function (cb) {
  return arr.sort(function (a, b) {
    return a.date - b.date;
  }).reverse(cb);
}

Pagination.tenAtATime = function (cursor, i) {
  cursor.find().sort({_id: -1}).limit(10).skip(i);
}

module.exports = Pagination;

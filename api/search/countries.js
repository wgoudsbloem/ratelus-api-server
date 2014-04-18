var mongodb = require("mongodb");
var Q = require("q");

module.exports = function(q) {
  var deferred = Q.defer();
  mongodb.MongoClient.connect("mongodb://test:test123@troup.mongohq.com:10049/ratelus", function(err, db) {
    if (err !== null) {
      console.error(err);
    }
    db.collection('countries', function(err, collection) {
      if (err !== null) {
        console.error(err);
      }
      var result = collection.find({
        $or: [{
            "name": new RegExp("^"+q, "i")
          }]
      }, {_id: 0}).limit(10);

      result.toArray(function(err, items) {
        deferred.resolve(items);
        if (err !== undefined) {
          deferred.reject(err);
        }
      });
    });
  });
  return deferred.promise;
};
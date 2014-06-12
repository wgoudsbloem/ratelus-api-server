var mongodb = require("mongodb");
var Q = require("q");

module.exports = function(q) {
  var deferred = Q.defer();
  mongodb.MongoClient.connect("mongodb://test:test123@troup.mongohq.com:10049/ratelus", function(err, db) {
    if (err !== null) {
      console.error(err);
    }
    db.collection('products', function(err, products) {
      products.distinct('brand'
          , {
            $or: [{
                "brand": new RegExp("^" + q, "i")
              }]
          }
      , function(err, items) {
        deferred.resolve(items);
        if (err !== undefined) {
          deferred.reject(err);
        }
      });
    });
  });
  return deferred.promise;
};
var mongodb = require("mongodb");
var Q = require("q");

module.exports = function(product) {
  var deferred = Q.defer();
  mongodb.MongoClient.connect("mongodb://test:test123@troup.mongohq.com:10049/ratelus", function(err, db) {
    if (err !== null) {
      console.error(err);
    }
    if (!product.brand) {
      db.collection('products', function(err, products) {
        products.distinct('model'
            , {
              $or: [{
                  "model": new RegExp("^" + product.model, "i")
                }]
            }
        , function(err, items) {
          deferred.resolve(items);
          if (err !== undefined) {
            deferred.reject(err);
          }
        });
      });
    } else {
      db.collection('products', function(err, products) {
        products.distinct('model'
            , {
              $or: [{
                  "brand": new RegExp("^" + product.brand + "$", "i"),
                  "model": new RegExp("^" + product.model, "i")
                }]
            }
        , function(err, items) {
          deferred.resolve(items);
          if (err !== undefined) {
            deferred.reject(err);
          }
        });
      });
    }
  });
  return deferred.promise;
};

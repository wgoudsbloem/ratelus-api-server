var mongodb = require("mongodb");
var Q = require("q");

module.exports = function(param) {
  var deferred = Q.defer();
  mongodb.MongoClient.connect("mongodb://test:test123@troup.mongohq.com:10049/ratelus", function(err, db) {
    if (err !== null) {
      console.error(err);
    }
    db.collection('products', function(err, collection) {
      if (err !== null) {
        console.error(err);
      }
      console.info(param);

      var or = {};
      if (param.q !== undefined) {
        console.info(param.q);
        var searchArray = param.q.split(" ");
        console.info(searchArray);
        var search = [];
        searchArray.forEach(function(item) {
          search.push({brand: new RegExp("^" + item, "i")});
          search.push({model: new RegExp("^" + item, "i")});
        });
        or.$or = search;
      } else {
        var a = {};
        for (var key in param) {
          a[key] = new RegExp(param[key], "i");
        }
        or.$or = [a];
      }
      var result = collection.find(or, {_id: 0});
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

//"brand" : new RegExp("^" + q, "i")
var mongodb = require("mongodb");

module.exports = function(brand, model, product) {
  mongodb.MongoClient.connect("mongodb://test:test123@troup.mongohq.com:10049/ratelus", function(err, db) {
    if (err !== null) {
      console.error(err);
    }
    db.collection("products", function(err, products) {
      if (err !== null) {
        console.error(err);
      }
      products.insert(product, function(err, records) {
        if (err !== null) {
          console.error(err);
        } else {
           console.log("Record added as "+records[0]._id);
        }
      });
    });
  });
};

var mongodb = require("mongodb");

module.exports = function(place) {
  mongodb.MongoClient.connect("mongodb://test:test123@troup.mongohq.com:10049/ratelus", function(err, db) {
    if (err !== null) {
      console.error(err);
    }
    db.collection("places", function(err, places) {
      if (err !== null) {
        console.error(err);
      }
      places.insert(place, function(err, records) {
        if (err !== null) {
          console.error(err);
        } else {
           console.log("Record added as "+records[0]._id);
        }
      });
    });
  });
};

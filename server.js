var http = require('http');
var url = require("url");
var Q = require("q");
var express = require("express");
var cors = require("express-cors");

var HTTP_PORT = process.env.PORT || 8081;

var app = express();

app.use(cors({
  allowedOrigins: [
    'http://localhost:8383', 'ratelus-web-client.herokuapp.com'
  ]
}));

app.use(express.json());

app.get("/api/search/organization/type", function(req, res) {
  require("./api/search/organization/type")(url.parse(req.url, true).query.q)
      .then(function(val){
        return success(val, "organization_type");
  })
      .then(function(val) {
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });
        res.end(val);
      });
});

app.get("/api/search/organization/name", function(req, res) {
  require("./api/search/organization/name")(url.parse(req.url, true).query.q)
      .then(function(val){
        return success(val, "organization_name");
  })
      .then(function(val) {
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });
        res.end(val);
      });
});

app.get("/api/search/product/model", function(req, res) {
  require("./api/search/product/model")(url.parse(req.url, true).query.q)
      .then(function(val){
        return success(val, "product_model");
  })
      .then(function(val) {
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });
        res.end(val);
      });
});

app.get("/api/search/product/brand", function(req, res) {
  require("./api/search/product/brand")(url.parse(req.url, true).query.q)
      .then(function(val){
        return success(val, "product_brand");
  })
      .then(function(val) {
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });
        res.end(val);
      });
});

app.get("/api/search/product", function(req, res) {
  require("./api/search/product/product")(url.parse(req.url, true).query)
      .then(function(val){
        return success(val, "product");
  })
      .then(function(val) {
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });
        res.end(val);
      });
});

app.get("/api/search/countries", function(req, res) {
  require("./api/search/countries")(url.parse(req.url, true).query.q)
      .then(function(val){
        return success(val, "countries");
  })
      .then(function(val) {
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });
        res.end(val);
      });
});

app.listen(HTTP_PORT);

app.on('error', function(e) {
  if (e.code === 'EADDRINUSE') {
    console.error("Server did not start port '" + HTTP_PORT + "' already in use");
  }
});


var success = function(val, name) {
  //name = "werg";
  var s = "";
  val.forEach(function(obj) {
    s = s + obj + "\n";
  });
  var val01 = {};
  val01[name] = val;
  return JSON.stringify(val01, undefined, 2);
};

var http200 = function(val) {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.end(val);
  return;
};

var error = function(err) {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });
  res.end('Server Error :(');
};

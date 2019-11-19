'use strict';

let SwaggerExpress = require('swagger-express-mw');
let app = require('express')();
const swaggerUi = require('swagger-ui-express');
const mergeYaml  = require('merge-yaml');
const swaggerDocument = mergeYaml(['./api/swagger/swagger.yaml', './api/swagger/definitions/definitions.yaml']);
const db = require('./api/data/setup-data');

module.exports = app; // for testing

let config = {
  appRoot: __dirname, // required config,
  swagger: swaggerDocument
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(function (req, res, next) {
  // console.log('Time:', Date.now())
  req.db = db;
  next();
})

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  let port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});

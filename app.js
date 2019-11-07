'use strict';

let SwaggerExpress = require('swagger-express-mw');
let app = require('express')();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./api/swagger/swagger.yaml');
const db = require('./api/data/setup-data');

module.exports = app; // for testing

let config = {
  appRoot: __dirname // required config
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

'use strict';

let path = require('path');
let SwaggerExpress = require('swagger-express-mw');
let express = require('express');
const swaggerUi = require('swagger-ui-express');
const mergeYaml  = require('merge-yaml');
const swaggerDocument = mergeYaml([
  path.join(__dirname, '/server/api/swagger/swagger.yaml'),
  path.join(__dirname, './server/api/swagger/definitions/definitions.yaml')
]);
const db = require(path.join(__dirname, './server/api/data/setup-data'));
let app = express();
module.exports = app; // for testing

let config = {
  appRoot: path.join(__dirname, '/server'),
  controllersDirs: [path.join(__dirname, '/server/api/controllers')],
  swagger: swaggerDocument
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', express.static(path.join(__dirname, 'build')))

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

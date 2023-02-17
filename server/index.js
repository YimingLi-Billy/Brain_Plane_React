const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const helmet = require("helmet");

const app = express();

const PORT = 6001;

var allowedOrigins = [`http://127.0.0.1:${PORT}`, `http://localhost:${PORT}`,];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowedOrigins.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }
  } else {
    corsOptions = { origin: false }
  }
  callback(null, corsOptions)
};
const contentSecurityPolicy = {
  dev: helmet({
    contentSecurityPolicy: false,
    frameguard: false
  }),
  prod: helmet.contentSecurityPolicy({
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "default-src": ["'self'"],
      "script-src": ["'self'", "'unsafe-eval'", "'unsafe-inline'", "cdn.jsdelivr.net"],
      "script-src-elem": ["'self'", "'unsafe-inline'", "www.gstatic.com"],
      "style-src": ["'self'", "'unsafe-inline'", "fonts.googleapis.com"],
      "img-src": ["*", "data:", "*.imgur.com"],
      "frame-src": ["www.gstatic.com"]
    }
  })
};

app.disable("x-powered-by");
app.use(
  cors(corsOptionsDelegate),
  contentSecurityPolicy.dev,
  helmet.dnsPrefetchControl(),
  helmet.expectCt(),
  // helmet.frameguard(),
  helmet.hidePoweredBy(),
  helmet.hsts(),
  helmet.ieNoOpen(),
  helmet.noSniff(),
  helmet.permittedCrossDomainPolicies(),
  helmet.referrerPolicy(),
  helmet.xssFilter(),
  morgan('dev'),
  express.json(),
  express.urlencoded({ extended: true }),
);

app.use(express.static(path.join(__dirname, '/../client/dist')));

app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => console.info(`Listening on port ${PORT}`));
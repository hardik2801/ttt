var express = require('express');
var Controller = appRequire('ctrl.ttt');
var express = require('express');
var Router = express.Router();

Router.get('/getwords/:num', Controller.getFrequency);

module.exports = Router;
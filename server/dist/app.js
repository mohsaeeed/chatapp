"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var port = 3000;
app.get('/', function (req, res) { return res.send('hello world'); });
app.listen(port, function () { return console.log("app listeing on port " + port); });

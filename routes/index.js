var express = require('express');
var router = express.Router();
var servicechecker = require('../modules/checker');
var Url = require('url-parse');

// Get Services List
router.get('/', function(req, res, next) {
    res.send('ok');
});

//Add a service from the list
router.post('/', function(req, res, next) {
    var uri = req.query.url;
    var prefixa = 'http://';
    var prefixb = 'https://';
    if (uri.substr(0, prefixa.length) !== prefixa && uri.substr(0, prefixb.length) !== prefixb)
    {
        uri = prefixa + uri;
    }

    try
    {
        servicechecker.AddURI(new Url(uri));
        servicechecker.SaveToFile(); 
        res.send('ok');
    }
    catch (error)
    {
        console.error(error);
        res.send(error);
    }
});

//Delete a service from the list
router.delete('/', function(req, res, next) {
    servicechecker.RemoveURI(new Url(req.query.url));
    servicechecker.SaveToFile();
});

module.exports = router;

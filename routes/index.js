var express = require('express');
var router = express.Router();
var servicechecker = require('../modules/checker');


// Get Services List
router.get('/', function(req, res, next) {
    res.send(servicechecker.GetList());
});

//Add a service from the list
router.post('/', function(req, res, next) {
    var uri = req.query.url;
    try
    {
        servicechecker.AddURI(uri);
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
    try
    {
        servicechecker.RemoveURI(req.query.url);
        servicechecker.SaveToFile();
    }
    catch
    {
        res.send('error');
    }
    res.send('ok');
});

module.exports = router;

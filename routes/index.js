var express = require('express');
var createError = require('http-errors');
var router = express.Router();
var servicechecker = require('../modules/checker');


// Get Services List
router.get('/', function(req, res, next) {
    try
    {
        res.send({operation:'Get', data:servicechecker.GetList(), Error:false, Message: "Ok!."});
    }
    catch(error)
    {
        res.send({operation:'Get', data:null, Error:true, Message:'Unexpected error: ' + error});
    }    
});

//Add a service from the list
router.post('/', function(req, res, next) {
    var uri = req.query.url;
    try
    {
        var result = servicechecker.AddURI(uri);
        servicechecker.SaveToFile(); 
        res.send(JSON.stringify(result));
    }
    catch (error)
    {        
        res.send({operation:'Add', data:uri, Error:true, Message:'Unexpected error: ' + error});
    }
});

//Delete a service from the list
router.delete('/', function(req, res, next) {
    try
    {
        var result = servicechecker.RemoveURI(req.query.url);
        servicechecker.SaveToFile();
        res.send(JSON.stringify(result));
    }
    catch (error)
    {        
        res.send({operation:'Delete', data:uri, Error:true, Message:'Unexpected error: ' + error});
    }
});

module.exports = router;

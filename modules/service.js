var EE = require('events');
var http = require('http');
var https = require('https');

module.exports = class Checker
{
    constructor(url)
    {
        this.URI = url;
        this.Code = 0;
        this.isUp = null;                     
    }

    GetStatus()
    {
        try
        {
            this.GetServiceStatusCode(this.URI);
        }
        catch(error)
        {
            console.log(error);
        }
    }

    GetServiceStatusCode(uri)
    {
        var options = 
        {
            method: 'HEAD',
            host: uri.host,
            port: uri.port,
            protocol: uri.protocol
        };
        if (options.protocol === 'https:')
        {
            var req = https.get(options, function (r) {
                this.Code = r.statusCode;            
            });
            req.end(); 
        } else
        {            
            var req = http.get(options, function (r) {
                this.Code = r.statusCode;            
            });
            req.end(); 
        }      
    }
}
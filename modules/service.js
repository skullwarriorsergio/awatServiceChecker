var EE = require('events');
var http = require('http');
var https = require('https');
var Url = require('url-parse');

module.exports = class Service
{
    constructor(uri)
    {
        this.URI = uri;
        var prefixa = 'http://';
        var prefixb = 'https://';
        if (uri.substr(0, prefixa.length) !== prefixa && uri.substr(0, prefixb.length) !== prefixb)
        {
            uri = prefixa + uri;
        }    
        this.URLdata = new Url(uri);
        this.Code = 0; 
    }

    GetStatus()
    {
        try
        {
            this.GetServiceStatusCode(this.URLdata);
        }
        catch(error)
        {
            console.log(error);
        }
    }

    GetServiceStatusCode(URLdata)
    {
        //Allow Self Signed Certificates
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        var options = 
        {
            method: 'HEAD',
            host: URLdata.host,
            port: URLdata.port,
            protocol: URLdata.protocol
        };    
        if (options.protocol === 'https:')
        {
            var req = https.get(options, function (r) {
                this.Code = r.statusCode;            
            }.bind(this));
            req.end(); 
        } else
        {            
            var req = http.get(options, function (r) {
                this.Code = r.statusCode;            
            }.bind(this));
            req.end(); 
        }      
    }
}
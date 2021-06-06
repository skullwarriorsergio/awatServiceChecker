'use strinct';
var service = require('./service');

class Checker
{
    constructor()
    {
        this.Services = [];
    }

    //Starts the timer for checking URIs
    start() {
        setInterval(() => {
            this.Services.forEach(function(entry)
            {
                entry.GetStatus();
            }); 
        }, 10000);
    }   
    
    SaveToFile()
    {
        require('fs').writeFile(

            './services.json',
        
            JSON.stringify(this.Services),
        
            function (err) {
                if (err) {
                    console.error('Crap happens');
                }
            }
        );
    }

    //Adds a new URI to the list
    AddURI(url)
    {
        var found = this.Services.find(function (element) {
            return element.URI.host === url.host;
        });
        if (found === undefined)
                this.Services.push(new service(url));
    }

    //Remove URI from the list
    RemoveURI(url)
    {
        this.Services = this.Services.filter(function(ele){ 
            return ele.URI.host != url.host; 
        });
    }
}

module.exports = new Checker();
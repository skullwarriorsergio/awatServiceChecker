'use strinct';
var service = require('./service');
const fs = require('fs');


class Checker
{
    constructor()
    {        
        try
        {
            this.Services = [];
            var data = JSON.parse(fs.readFileSync('./services.json', 'utf8'));     
            for(const item of data )
            {
                this.Services.push(new service(item));
            };            
        }
        catch(error)
        {
        }
    }

    // Get service list
    GetList()
    {
        var result = [];
        for(const item of this.Services)
        {
            result.push({URI:item.URI, Code:item.Code});
        }
        return JSON.stringify(result);
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
        var data = [];
        this.Services.forEach(function(item)
        {
            data.push(item.URI);
        });
        require('fs').writeFile(

            './services.json',
        
            JSON.stringify(data),
        
            function (err) {
                if (err) {
                    console.error('IO error');
                }
            }
        );
    }

    //Adds a new URI to the list
    AddURI(uri)
    {
        var found = this.Services.find(function (element) {
            return element.URI === uri;
        });
        if (found === undefined)
                this.Services.push(new service(uri));
    }

    //Remove URI from the list
    RemoveURI(uri)
    {
        this.Services = this.Services.filter(function(ele){ 
            return ele.URI != uri; 
        });
    }
}

module.exports = new Checker();
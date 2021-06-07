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
        try
        {
            var found = this.Services.find(function (element) {
                return element.URI === uri;
            });
            if (found === undefined)
                    this.Services.push(new service(uri));
            else
                return {operation:'Add', data:uri, Error:true, Message: 'Service already added.'};
            return {operation:'Add', data:uri, Error:false, Message:'Service added.'};
        }
        catch(error)
        {
            return {operation:'Add', data:uri, Error:true, Message:error};
        }
    }

    //Remove URI from the list
    RemoveURI(uri)
    {
        try
        {
            var count = this.Services.length;
            this.Services = this.Services.filter(function(ele){ 
                return ele.URI != uri; 
            });
            if (count === this.Services.length) //Not found
            {
                return {operation:'Delete', data:uri, Error:true, Message:'Not Found.'};
            } else
            {
                return {operation:'Delete', data:uri, Error:false, Message:'Service deleted.'};
            }
        }
        catch(error)
        {
            return {operation:'Delete', data:uri, Error:true, Message:error};
        }
    }
}

module.exports = new Checker();
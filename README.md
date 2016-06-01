

SG Bus
========

#### Description

Giving real-time information about bus arrivals for a given bus stop in Singapore

#### Installation

Make sure to put in your webpack configuration the absolute path of the application configuration file
  
The application configuration file should look like that : 

```json
{
  "AccountKey": "xxxxxxxxxxxx",
  "UniqueUserID": "yyyyyyyyyyyyy",
  "apiUrl": "http://localhost:8080/api",
  "elasticSearchUrl": "http://xxxxxxxxx.ap-southeast-1.es.amazonaws.com"
}

```

```
curl -XPUT 'http://localhost:9200/sgbus/_mapping/bus_station' -d '
{
  
            "properties": {
                "BusStopCode": {"type": "string"},
                "Description": {"type": "string"},
                "RoadName": {"type": "string"},
                "location": {"type": "geo_point"}
            }
        
    
}
'

curl -XPUT 'http://localhost:9200/sgbus/_mapping/stats' -d '
{

            "properties": {
                "timestamp": {"type": "date"},
                "stattype": {"type": "string"},
                "key": {"type": "string"},
                "value" {"type": "double"}
            }


}
'
```


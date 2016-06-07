import json
import urllib
import urlparse3
import httplib2 as http #External library
from datetime import datetime
from elasticsearch import Elasticsearch
import apiconfig


if __name__=="__main__":
    #API parameters
    url = 'http://datamall2.mytransport.sg/ltaodataservice/BusStops'

    #Build query string & specify type of API call    #target = urlparse3.parse_url(url)
    method = 'GET'
    body = ''

    #Get handle to http
    h = http.Http()

    es = Elasticsearch(apiconfig.api["elasticSearchUrlHttp"], port=apiconfig.api["elasticSearchPort"])

    #Obtain results
    count = 0
    while (count < 6000):
        response, content = h.request(
            url+"?$skip="+str(count),
            method,
            body,
            apiconfig.headers)

        #Parse JSON to print
        jsonObj = json.loads(content.decode())["value"]
        for bus_station in jsonObj:
            bus_station["location"]={"lat":bus_station["Latitude"],"lon":bus_station["Longitude"]}
            print(bus_station)
            es.index(index="sgbus", doc_type='stations', id=bus_station["BusStopCode"], body=bus_station)

        count = count + 50

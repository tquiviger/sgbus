import json
import urllib
import urlparse3
import httplib2 as http #External library
from datetime import datetime
from elasticsearch import Elasticsearch


if __name__=="__main__":
    #Authentication parameters
    headers = { 'AccountKey' : 'aY3i4Kl7xgWb7rtqvhtS8A==',
                'UniqueUserID' : '1371ad3d-333e-447a-a4ef-22660b11271c',
                'accept' : 'application/json'} #Request results in JSON

    #API parameters
    url = 'http://datamall2.mytransport.sg/ltaodataservice/BusStops'

    #Build query string & specify type of API call    #target = urlparse3.parse_url(url)
    method = 'GET'
    body = ''

    #Get handle to http
    h = http.Http()

    es = Elasticsearch()

    #Obtain results
    count = 0
    while (count < 6000):
        response, content = h.request(
            url+"?$skip="+str(count),
            method,
            body,
            headers)

        #Parse JSON to print
        jsonObj = json.loads(content.decode())["value"]
        for bus_station in jsonObj:
            print(bus_station)
            bus_station["location"]={"lat":bus_station["Latitude"],"lon":bus_station["Longitude"]}
            #es.index(index="sgbus", doc_type='bus_station', id=bus_station["BusStopCode"], body=bus_station)

        count = count + 50

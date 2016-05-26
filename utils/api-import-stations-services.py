import json
import urllib
import urlparse3
import httplib2 as http #External library
from datetime import datetime
from kafka import KafkaProducer


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

    producer = KafkaProducer(bootstrap_servers='localhost:9092',value_serializer=lambda v: json.dumps(v).encode('utf-8'))

    #Obtain results
    count = 0
    while (count < 6000):
        print(count)
        response, content = h.request(
            url+"?$skip="+str(count),
            method,
            body,
            headers)

        #Parse JSON to print
        jsonObj = json.loads(content.decode())["value"]
        for bus_station in jsonObj:
            url2 = 'http://datamall2.mytransport.sg/ltaodataservice/BusArrival?BusStopID='+bus_station["BusStopCode"]+'&SST=True'
            response, content2 = h.request(
                        url2,
                        method,
                        body,
                        headers)
            jsonObj2 = json.loads(content2.decode())["Services"]

            for bus_service in jsonObj2:
                bus_service['stationId']=bus_station["BusStopCode"]
                producer.send('sgbus', bus_service)

        count = count + 50

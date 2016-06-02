import json
import urllib
import urlparse3
import httplib2 as http  # External library
from datetime import datetime
from elasticsearch import Elasticsearch
import apiconfig

if __name__ == "__main__":
    # API parameters
    url = 'http://datamall2.mytransport.sg/ltaodataservice/BusRoutes'

    # Build query string & specify type of API call    #target = urlparse3.parse_url(url)
    method = 'GET'
    body = ''

    # Get handle to http
    h = http.Http()

    es = Elasticsearch(apiconfig.api["elasticSearchUrlHttp"], port=apiconfig.api["elasticSearchPort"])

    # Obtain results
    count = 0
    busDict = {}
    while count < 40000:
        response, content = h.request(
            url + "?$skip=" + str(count),
            method,
            body,
            apiconfig.headers)

        # Parse JSON to print
        jsonObj = json.loads(content.decode())["value"]
        for bus in jsonObj:
            try:
                res = es.get(index="sgbus", doc_type='bus_station', id=bus["BusStopCode"])
                stopId = bus['StopSequence']
                key = str(bus['ServiceNo'])+"_"+str(bus['Direction'])
                print(key)
                if stopId < 10:
                    stopId = '0' + str(stopId)
                else:
                    stopId = str(stopId)
                newVal = {"BusStopCode" + '_' + stopId: res['_source']['BusStopCode'],
                          "BusStopName" + '_' + stopId: res['_source']['Description'],
                          "BusStopRoad" + '_' + stopId: res['_source']['RoadName'],
                          "Latitude" + '_' + stopId: res['_source']['Latitude'],
                          "Longitude" + '_' + stopId: res['_source']['Longitude'],
                          "Distance" + '_' + stopId: bus['Distance']
                          }
                if key in busDict:
                    tutu = busDict[key]
                    tutu["BusStopCode" + '_' + stopId] = res['_source']['BusStopCode']
                    tutu["BusStopName" + '_' + stopId] = res['_source']['Description']
                    tutu["BusStopRoad" + '_' + stopId] = res['_source']['RoadName']
                    tutu["Latitude" + '_' + stopId] = res['_source']['Latitude']
                    tutu["Longitude" + '_' + stopId] = res['_source']['Longitude']
                    tutu["Distance" + '_' + stopId] = bus['Distance']
                    busDict[key] = tutu
                else:
                    busDict[key] = newVal
            except Exception:
                pass

        count = count + 50
    for busStop, value in busDict.items():
        print('indexing '+busStop)
        es.index(index="sgbus", doc_type='bus_route', id=busStop, body=value)

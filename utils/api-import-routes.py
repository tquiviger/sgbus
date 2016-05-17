import json
import urllib
import urlparse3
import httplib2 as http  # External library
from datetime import datetime
from elasticsearch import Elasticsearch

if __name__ == "__main__":
    # Authentication parameters
    headers = {'AccountKey': 'aY3i4Kl7xgWb7rtqvhtS8A==',
               'UniqueUserID': '1371ad3d-333e-447a-a4ef-22660b11271c',
               'accept': 'application/json'}  # Request results in JSON

    # API parameters
    url = 'http://datamall2.mytransport.sg/ltaodataservice/BusRoutes'

    # Build query string & specify type of API call    #target = urlparse3.parse_url(url)
    method = 'GET'
    body = ''

    # Get handle to http
    h = http.Http()

    es = Elasticsearch()

    # Obtain results
    count = 0
    busDict = {}
    while count < 40000:
        response, content = h.request(
            url + "?$skip=" + str(count),
            method,
            body,
            headers)

        # Parse JSON to print
        jsonObj = json.loads(content.decode())["value"]
        for bus in jsonObj:
            try:
                print(bus['ServiceNo'])
                res = es.get(index="sgbus", doc_type='bus_station', id=bus["BusStopCode"])
                stopId = bus['StopSequence']
                if stopId < 10:
                    stopId = '0' + str(stopId)
                else:
                    stopId = str(stopId)
                newVal = {"BusStopCode" + '.' + stopId: res['_source']['BusStopCode'],
                          "BusStopName" + '.' + stopId: res['_source']['Description'],
                          "BusStopRoad" + '.' + stopId: res['_source']['RoadName'],
                          "Latitude" + '.' + stopId: res['_source']['Latitude'],
                          "Longitude" + '.' + stopId: res['_source']['Longitude'],
                          "Distance" + '.' + stopId: bus['Distance']
                          }
                if bus["ServiceNo"] in busDict:
                    tutu = busDict[bus["ServiceNo"]]
                    tutu["BusStopCode" + '.' + stopId] = res['_source']['BusStopCode']
                    tutu["BusStopName" + '.' + stopId] = res['_source']['Description']
                    tutu["BusStopRoad" + '.' + stopId] = res['_source']['RoadName']
                    tutu["Latitude" + '.' + stopId] = res['_source']['Latitude']
                    tutu["Longitude" + '.' + stopId] = res['_source']['Longitude']
                    tutu["Distance" + '.' + stopId] = bus['Distance']
                    busDict[bus["ServiceNo"]] = tutu
                else:
                    busDict[bus["ServiceNo"]] = newVal
            except Exception:
                pass

        count = count + 50
    for busStop, value in busDict.items():
        print('indexing '+busStop)
        es.index(index="sgbus", doc_type='bus_route', id=busStop, body=value)

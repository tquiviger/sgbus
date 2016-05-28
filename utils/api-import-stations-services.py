import json
import urllib
import urlparse3
import httplib2 as http #External library
from datetime import datetime
from kafka import KafkaProducer
from datetime import datetime, timezone
from dateutil.parser import parse
import apiconfig


if __name__=="__main__":
    #API parameters
    url = 'http://datamall2.mytransport.sg/ltaodataservice/BusStops'

    #Build query string & specify type of API call    #target = urlparse3.parse_url(url)
    method = 'GET'
    body = ''

    #Get handle to http
    h = http.Http()

    producer = KafkaProducer(bootstrap_servers=apiconfig.api["kafkaUrl"]+':'+str(apiconfig.api["kafkaPort"]),value_serializer=lambda v: json.dumps(v).encode('utf-8'))

    #Obtain results
    count = 0
    while (count < 6000):
        print(count)
        response, content = h.request(
            url+"?$skip="+str(count),
            method,
            body,
            apiconfig.headers)

        #Parse JSON to print
        jsonObj = json.loads(content.decode())["value"]
        for bus_station in jsonObj:
            _now = datetime.now(timezone.utc).astimezone().replace(microsecond=0)
            url2 = 'http://datamall2.mytransport.sg/ltaodataservice/BusArrival?BusStopID='+bus_station["BusStopCode"]+'&SST=True'
            response, content2 = h.request(
                        url2,
                        method,
                        body,
                        apiconfig.headers)
            jsonObj2 = json.loads(content2.decode())["Services"]

            for bus_service in jsonObj2:
                bus_stop_code = bus_station["BusStopCode"]
                service_no = bus_service['ServiceNo']
                status = bus_service['Status']
                arrival1= bus_service['NextBus']['EstimatedArrival']
                arrival2= bus_service['SubsequentBus']['EstimatedArrival']
                arrival3= bus_service['SubsequentBus3']['EstimatedArrival']
                load1 = bus_service['NextBus']['Load']
                load2 = bus_service['SubsequentBus']['Load']
                load3 = bus_service['SubsequentBus3']['Load']

                delta1=''
                delta2=''
                delta3=''
                if arrival1:
                    delta1= (parse(arrival1) - _now).total_seconds()
                    if delta1 < 0:
                        delta1 = 0
                if arrival2:
                    delta2= (parse(arrival2) - _now).total_seconds()
                    if delta2 < 0:
                        delta2 = 0
                if arrival3:
                    delta3= (parse(arrival3) - _now).total_seconds()
                    if delta3 < 0:
                        delta3 = 0
                body= str(_now.strftime('%Y%m%d%H%M%S'))+ '|' +bus_stop_code + '|' + service_no + '|' + status + '|' +str(delta1) + '|' + load1+ '|' +str(delta2) + '|' + load2+ '|' +str(delta3) + '|' + load3
                producer.send('sgbus_services', body)

        count = count + 50

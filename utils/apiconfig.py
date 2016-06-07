import json

config_directory='/Users/thomas/sgbus/config.json'
json_data=open(config_directory).read()
api = json.loads(json_data)

headers = { 'AccountKey' : api["AccountKey"],
            'UniqueUserID' : api["UniqueUserID"],
            'accept' : 'application/json'}
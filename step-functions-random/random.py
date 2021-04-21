# Random Microservice
#
# This lambda function is designed to randomly fail
#

from __future__ import print_function
import json
import random

def lambda_handler(event, context):

    print('Initiating random microservice')
    print("Received event from API Gateway: " + json.dumps(event, indent=2))

    proceed = random.randint(1,2)
    if proceed == 2:
        result = "success"
    else: 
        raise Exception('failed')
    
    return result
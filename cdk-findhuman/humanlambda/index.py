from __future__ import print_function
import boto3

def handler(event, context):

    phoneNumber = "<YOUR_PHONE_NUMBER>" # Use +61 for Australia
    smsMessage = "We found a human!"

    print('Initiating image rekognition')

    print(event)
    found = event['Payload']['found']

    if found == 'human':

        sns_client = boto3.client('sns')
        
        sms = sns_client.publish(
            PhoneNumber = phoneNumber, 
            Message= smsMessage,
        )
    else:
        raise Exception('No human detected')

    return
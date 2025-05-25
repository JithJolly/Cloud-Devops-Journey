import json
import boto3

def lambda_handler(event, context):
    # Initialize DynamoDB resource
    dynamodb = boto3.resource('dynamodb', region_name='us-east-2')  # Adjust region if needed

    # Select the DynamoDB table
    table = dynamodb.Table('employeeData')

    # Scan the table to retrieve all items
    response = table.scan()
    data = response['Items']

    # Continue scanning if necessary
    while 'LastEvaluatedKey' in response:
        response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
        data.extend(response['Items'])

    # Return the data
    return {
        'statusCode': 200,
        'body': json.dumps(data)
    }

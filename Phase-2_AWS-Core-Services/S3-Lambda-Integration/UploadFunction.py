import json
import boto3

# Create a DynamoDB object using the AWS SDK
dynamodb = boto3.resource('dynamodb')
# Use the DynamoDB object to select our table
table = dynamodb.Table('employeeData')

# Define the handler function that the Lambda service will use as an entry point
def lambda_handler(event, context):
    # Extract values from the event object
    emp_id = event['empid']
    name = event['name']
    department = event['department']
    age = event['age']
    
    # Write employee data to the DynamoDB table
    response = table.put_item(
        Item={
            'empid': emp_id,
            'name': name,
            'department': department,
            'age': age
        }
    )
    
    # Return success response
    return {
        'statusCode': 200,
        'body': json.dumps('Employee data saved successfully!')
    }

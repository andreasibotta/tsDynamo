
aws dynamodb --endpoint-url http://localhost:4569  delete-table --table-name testTable

aws dynamodb --endpoint-url http://localhost:4569  create-table \
    --table-name testTable \
    --attribute-definitions AttributeName=pk,AttributeType=S AttributeName=sk,AttributeType=S \
    --key-schema AttributeName=pk,KeyType=HASH AttributeName=sk,KeyType=RANGE \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 

aws dynamodb --endpoint-url http://localhost:4569 update-table \
    --table-name testTable \
    --attribute-definitions AttributeName=gsi1pk,AttributeType=S  AttributeName=gsi1sk,AttributeType=S \
    --global-secondary-index-updates \
    "[{\"Create\":{\"IndexName\": \"gsi1\",\"KeySchema\":[{\"AttributeName\":\"gsi1pk\",\"KeyType\":\"HASH\"}], \
    \"ProvisionedThroughput\": {\"ReadCapacityUnits\": 10, \"WriteCapacityUnits\": 5      },\"Projection\":{\"ProjectionType\":\"ALL\"}}}]"

       
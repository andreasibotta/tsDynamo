aws dynamodb --endpoint-url http://localhost:4569  put-item \
  --table-name testTable \
  --item file://./scripts/item.json 
  
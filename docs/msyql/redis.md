```
docker run -d \
  --name demo-redis \
  -p 6379:6379 \
  redis:latest \
  --requirepass "123456"
```

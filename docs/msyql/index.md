```sh
docker run --name demo \
-e MYSQL_DATABASE=demo \
-e MYSQL_ROOT_PASSWORD=123456 \
-d -p 3306:3306 mysql:5.7
```
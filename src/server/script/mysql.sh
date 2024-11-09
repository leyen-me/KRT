docker run --name demo-express-vue \
-e MYSQL_DATABASE=demo \
-e MYSQL_ROOT_PASSWORD=123456 \
-d -p 3307:3306 mysql:8.0.20
```sh
docker run --name demo-mysql \
-e MYSQL_DATABASE=demo \
-e MYSQL_ROOT_PASSWORD=123456 \
-e TZ=Asia/Shanghai \
-d -p 3306:3306 mysql:5.7
```
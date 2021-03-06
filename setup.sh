#install docker engine
apt-get install docker.io

#install curl and docker compose
apt-get install curl
curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

#build reverse proxy
docker build -t reverseproxy .

#set script permissions
chmod o+x shutdown.sh
chmod o+x startup.sh
chmod +x /usr/local/bin/docker-compose

#get admin password
cd SqlContainer
chmod o+rwx init-db.sql
echo "Enter admin account's password"
read varname
pass=`echo -n ${varname} | sha256sum | tr -d "[:space:]-"`
echo "VALUES ('admin', 'admin', 'admin', '${pass}')" >> init-db.sql
echo "GO" >> init-db.sql 
echo "This will be the password used to log into the admin page."
chmod o-wx init-db.sql

#build docker containers
cd ..
docker-compose build

#run docker containers detached
docker-compose up -d

#get container IP
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' reverseproxy_1

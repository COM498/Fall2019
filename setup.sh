#install docker engine
apt-get install docker.io

#install curl and docker compose
apt-get install curl
curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

#build reverse proxy
docker build -t reverseproxy .

#build docker containers
docker-compose build

#run docker containers detached
docker-compose up -d

#to stop running, copy and paste the following line uncommented
# docker-compose down

#get container IP
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' fall2019_reverseproxy_1

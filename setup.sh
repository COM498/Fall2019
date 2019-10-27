#install git
apt-get install git.core

#install docker engine
apt-get install docker.io

#install curl and docker compose
apt-get install curl
curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

#clone github
git clone http://github.com/COM498/Fall2019.git

#enter repository
cd Fall2019

#build docker containers
docker-compose build

#run docker containers detached
docker-compose up -d

#to stop running, copy and paste the following line uncommented
# docker-compose down

#get container IP
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' ctf-app_1
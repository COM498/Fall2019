# Fall2019# COM 497 CADS FA19 - Capture the Flag Website

<h2>Installation Instructions:</h2>
<br/>
Run: `git clone https://github.com/COM498/Fall2019.git` (make sure you have git installed)
<br/>
Maneuver into your cloned repository folder:
i.e. `cd /home/usr/Documents/Fall2019 `
<br/>
Run: `docker-compose build` (make sure you have docker installed)
<br/>
Run: `docker-compose up -d`
<br/>
Run: `docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' ctf-app_1` to get the IP address of the container. Visit this IP Address to see the working website.
<br/>
<br/>
The MSSql Container and the NodeJS Container should now be running in detached mode. You should be able to see this by running `docker ps`.
<br/>
# Fall2019# COM 497 CADS FA19 - Capture the Flag Website

<h2>Installation Instructions:</h2>
<br/>
Run: 
`git clone https://github.com/COM498/Fall2019.git` (make sure you have git installed)
<br/>
Maneuver into your cloned repository folder:
i.e. `cd Documents/GitHub/Fall2019 `
<br/>
Run: `docker-compose build` (make sure you have docker installed)
<br/>
Run: `docker-compose up -d`
<br/>
<br/>
The MSSql Container and the NodeJS Container should now be running in detached mode. You should be able to see this by running `docker ps`.
<br/>
Note: if the NodeJS app does not appear to be communicating with your database container, verify that the server name in server.js matches that of your container (i.e. on my machine, docker-build gives my sql container a name of documents_ctf-db_1 so my server.js uses this name to connect to it. This is because my docker-compose.yml exists in my documents directory.)
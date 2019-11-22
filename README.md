# COM 497 CADS FA19 - Capture the Flag Website for Linux

<h2>Installation Instructions:</h2>

Install Git onto Ubuntu using `apt-get install git.core` and clone this repository using `git clone http://github.com/COM498/Fall2019.git`

Navigate into the repository folder and execute `chmod o+x setup.sh` as sudo. Run the setup.sh file. This will install the Docker engine, docker-compose, and build our containers before running them. The script will ask for an new admin password. This will be the password to the administrator account on the site. The username is `admin`.

The MSSql Container, NodeJS Container, Web Server Container, and Redis Server Container should now be running in detached mode. You should be able to see this by running `docker ps`.

To stop the containers, run `./shutdown.sh` and to restart, use `./startup.sh`.

<h3>Notes</h3>

You can quit the containers by running `docker-compose down` and likewise `docker-compose up -d` to restart. Keep in mind though that this restarts the build process so your database will be wiped clean.

The SA password for the MSSql Database is SaintLeo123. This is set in the docker-compose.yml file and the SqlContainer/Dockerfile. To have a different SA password, edit these two files as well as the database config in server.js.

The stored procedures that deal with dates and times has been set to use `Eastern Standard Time`. Please adjust this if needed for other areas.

<h3>Troubleshooting</h3>

Make sure that you have net.ipv4.conf.all.forwarding set equal to 1 and that Chain FORWARD is set to Accept if site is not accessible via localhost:80 on the host.

These can be adjusted by `sysctl net.ipv4.conf.all.forwarding = 1` and `iptables -P FORWARD ACCEPT`

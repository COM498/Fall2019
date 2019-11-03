# Fall2019# COM 497 CADS FA19 - Capture the Flag Website

<h2>Installation Instructions:</h2>

Install Git onto Ubuntu using `apt-get install git.core` and clone this repository using `git clone http://github.com/COM498/Fall2019.git`

Navigate into the repository folder and execute chmod o+x setup.sh as sudo. Run the setup.sh file. This will install the Docker engine, docker-compose, and build our containers before running them.

The MSSql Container, NodeJS Container, and Web Server Container should now be running in detached mode. You should be able to see this by running `docker ps`.

You can stop the containers by running `docker-compose down` and likewise `docker-compose up -d` to restart in the repository's root directory.

<h3>Troubleshooting</h3>

Make sure that you have net.ipv4.conf.all.forwarding set equal to 1 and that Chain FORWARD is set to Accept if site is not accessible via localhost:80 on the host.

These can be adjusted by `sysctl net.ipv4.conf.all.forwarding = 1` and `iptables -P FORWARD ACCEPT`

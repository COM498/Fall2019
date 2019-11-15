#gets the latest image of Microsoft Sql Server for Linux
FROM microsoft/mssql-server-linux:latest

#agrees to the EULA and sets the SA Password
ENV ACCEPT_EULA=Y \
    MSSQL_SA_PASSWORD=SaintLeo123

#sets the working directory and copies the initialization files
WORKDIR /init
COPY init-db.* ./

#gives execute permissions on the database setup script and runs it
RUN chmod +x ./init-db.sh
RUN /opt/mssql/bin/sqlservr & ./init-db.sh

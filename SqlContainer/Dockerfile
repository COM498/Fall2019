FROM microsoft/mssql-server-linux:latest

ENV ACCEPT_EULA=Y \
    MSSQL_SA_PASSWORD=SaintLeo123

WORKDIR /init
COPY init-db.* ./

RUN chmod +x ./init-db.sh
RUN /opt/mssql/bin/sqlservr & ./init-db.sh

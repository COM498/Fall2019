#wait for sql server to launch fully
sleep 30s

#run the database setup script in the server instance
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P SaintLeo123 -i init-db.sql

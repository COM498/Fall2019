//required packages
var express = require('express');
var bodyParser = require('body-parser');
var sql = require('mssql');
var crypto = require('crypto');

var app = express();

app.use(bodyParser.json());
app.use(express.static('static'));

//sets the server to listen on port 8080 of localhost
var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("App is now running on port", port);
});

//sets the database login information
var dbConfig = {
    user: "saintleoCTF",
    password: "$a!nTlE0",
    server: "LOCALHOST",
    options: {
        instanceName: 'SQLEXPRESS',
        database: "CTF"
    }
    
};

//connects to sql server express and executes the query
var executeQuery = function (query, res) {
    try {
        sql.connect(dbConfig, function(err) {
            if (err) {
                console.log("Error while connecting database: ", err);
                res.send(err);
                sql.close();
            }
            else {
                var request = new sql.Request();
                request.query(query, function (err, resp) {
                    if (err) {
                        console.log("Error while querying: ", err);
                        res.send(err);
                        sql.close();
                    }
                    else {
                        res.send(resp);
                        sql.close();
                    }
                });
            }
        });

        
    }
    catch (e) {
        console.log("Error: ", e);
        sql.close();
    }
}

//creates a team with entered name and hashed password
//tested
app.post("/api/teams", function(req, res) {
    var hash = crypto.createHash('sha256');
    hash.update(req.body.Pwd);

    var query = "EXECUTE CTF.dbo.CTF_CreateTeamSp " + req.body.Name + ", '" + hash.digest('hex') + "'";
    executeQuery(query, res);
});

//adds players to the team with comma-separated list of players and team id
//tested
app.put("/api/players", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_UpdatePlayersSp " + req.body.ID + ", '" + req.body.Player + "', " + req.body.Active;
    executeQuery(query, res);
});

//retrieves all the players from the specific team with the entered id
//tested
app.post("/api/players", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_GetPlayersSp " + req.body.ID;
    executeQuery(query, res);
});

//creates an admin with first, last, and login names and hashed password
app.post("/api/admins", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_CreateAdminSp '" + req.body.First + "', '" + req.body.Last + "', '" + req.body.Username + "', '" + req.body.Pwd + "'";
    executeQuery(query, res);
});

//creates an event with beginning date and times and end date and times
app.post("/api/events", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_CreateEventSp '" + req.body.Name + "', '" + req.body.sDate + "', '" + req.body.sTime + "', '" + req.body.eDate + "', '" + req.body.eTime + "', " + req.body.Ex;
    executeQuery(query, res);
});

//creates a question with a answer and hint information
//tested
app.post("/api/questions", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_CreateQuestionSp '" + req.body.Question + "', '" + req.body.Answer + "', " + req.body.Value + ", '" + req.body.Hint + "', " + req.body.HintValue + ", " + req.body.Admin;
    executeQuery(query, res);
});

//deletes an event based on entered id
app.delete("/api/events", function(req, res) {
    if (req.body.AdminID != "") 
    {
        var query = "EXECUTE CTF.dbo.CTF_DeleteEventSp " + req.body.ID;
        executeQuery(query, res);
    }
});

//deletes a question with specific id
app.delete("/api/questions", function(req, res) {
    if (req.body.AdminID != "") 
    {
        var query = "EXECUTE CTF.dbo.CTF_DeleteQuestionSp " + req.body.ID;
        executeQuery(query, res);
    }
});

//updates event questions with new values
app.put("/api/eventquestions", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_UpdateEventQuestionSp " + req.body.EventID + ", " + req.body.QuestionID + ", " + req.body.Value + ", " + req.body.Solved + ", '" + req.body.Solves + "'";
    executeQuery(query, res);
});

//updates event with new start and end date and times
app.put("/api/events", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_UpdateEventSp " + req.body.ID + ", '" + req.body.Name + "', '" + req.body.sDate + "', '" + req.body.sTime + "', '" + req.body.eDate + "', '" + req.body.eTime + "', " + req.body.Exclusive;
    executeQuery(query, res);
});

//updates questions with new answers or hint information
app.put("/api/questions", function(req, res) {
    var hash = crypto.createHash('sha256');
    hash.update(req.body.Answer);

    var query = "EXECUTE CTF.dbo.CTF_UpdateQuestionSp " + req.body.ID + ", '" + req.body.Question + "', '" + hash.digest('hex') + "', " + req.body.Value + ", '" + req.body.Hint + "', " + req.body.HintValue;
    executeQuery(query, res);
});

//verifies log in data 
app.post("/api/login", function(req, res) {
    var loginName = req.body.Username;
    var hash = crypto.createHash('sha256');
    hash.update(req.body.Pwd);

    var pwd = req.body.Pwd;
    var pass;
    if (pwd.length > 0) {
        pass = hash.digest('hex');
    }
    else {
        pass = "";
    }

    var query = "EXECUTE CTF.dbo.CTF_VerifyLoginSp '" + loginName + "', '" + pass + "'";
    executeQuery(query, res);
});
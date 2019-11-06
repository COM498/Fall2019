//required packages
var express = require('express');
var bodyParser = require('body-parser');
var sql = require('mssql');
var crypto = require('crypto');
var multiparty = require('multiparty');
var fs = require('fs');

var app = express();

app.use(bodyParser.json({ limit: '50mb'}));
//app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000}));
app.use(express.static('static'));

//sets the server to listen on port 80 of localhost
var server = app.listen(process.env.PORT || 80, function() {
    var port = server.address().port;
    console.log("App is now running on port", port);
});

//sets the database login information
var dbConfig = {
    user: "SA", //saintleoCTF
    password: "SaintLeo123", //$a!nTlE0
    server: "ctf-db_1", //LOCALHOST
    options: {
        //instanceName: 'SQLEXPRESS', //REMOVE
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
    var query = "EXECUTE CTF.dbo.CTF_UpdatePlayersSp " + req.body.ID + ", '" + req.body.Player + "', " + req.body.Active + ", '" + req.body.Email + "'";
    executeQuery(query, res);
});

//retrieves all the players from the specific team with the entered id
//tested
app.post("/api/players", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_GetPlayersSp " + req.body.ID;
    executeQuery(query, res);
});

//creates an event with beginning date and times and end date and times
//tested
app.post("/api/events", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_CreateEventSp '" + req.body.Name + "', '" + req.body.sDate + "', '" + req.body.sTime + "', '" + req.body.eDate + "', '" + req.body.eTime + "', " + req.body.Ex;
    executeQuery(query, res);
});

//creates a question with a answer and hint information
//tested
app.post("/api/questions", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_CreateQuestionSp '" + req.body.Question + "', '" + req.body.Answer + "', " + req.body.Value + ", " + req.body.Admin + ", " + req.body.Level;
    executeQuery(query, res);
});

//tested
app.get("/api/questions", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_GetQuestionsSp";
    executeQuery(query, res);
});

//deletes an event based on entered id
//tested
app.delete("/api/events", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_DeleteEventSp " + req.body.ID;
    executeQuery(query, res);
});

//deletes a question with specific id
//tested
app.delete("/api/questions", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_DeleteQuestionSp " + req.body.ID;
    executeQuery(query, res);
});

//updates event questions with new values
//tested
app.put("/api/eventquestions", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_UpdateEventQuestionSp " + req.body.EventID + ", " + req.body.QuestionID + ", " + req.body.Value + ", " + req.body.Solved;
    executeQuery(query, res);
});

//updates event with new start and end date and times
//tested
app.put("/api/events", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_UpdateEventSp " + req.body.ID + ", '" + req.body.Name + "', '" + req.body.sDate + "', '" + req.body.sTime + "', '" + req.body.eDate + "', '" + req.body.eTime + "', " + req.body.Exclusive;
    executeQuery(query, res);
});

//updates questions with new answers or hint information
//tested
app.put("/api/questions", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_UpdateQuestionSp " + req.body.ID + ", '" + req.body.Question + "', '" + req.body.Answer + "', " + req.body.Level + ", " + req.body.Value + ", '" + req.body.Hint1 
    + "', " + req.body.HintValue1 + ", '" + req.body.Hint2 + "', " + req.body.HintValue2 + ", '" + req.body.Hint3 + "', " + req.body.HintValue3;
    executeQuery(query, res);
});

//verifies log in data 
//tested
app.post("/api/login", function(req, res) {
    var loginName = req.body.Username;
    var hash = crypto.createHash('sha256');
    hash.update(req.body.Pwd);

    var pwd = req.body.Pwd;
    var pass = hash.digest('hex');

    var query = "EXECUTE CTF.dbo.CTF_VerifyLoginSp '" + loginName + "', '" + pass + "'";
    executeQuery(query, res);
});

//tested
app.get("/api/events", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_GetEventsSp";
    executeQuery(query, res);
});

//tested
app.post("/api/hints", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_CreateHintsSp " + req.body.Question + ", '" + req.body.Hint + "', " + req.body.Value + ", " + req.body.HintID;
    executeQuery(query, res);
});

//tested
app.post("/api/eventquestions", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_GetQuestionsForEventSp " + req.body.Event + ", " + req.body.Team;
    executeQuery(query, res);
});

//tested
app.delete("/api/eventquestions", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_DeleteEventQuestionSp " + req.body.EventID + ", " + req.body.QuestionID;
    executeQuery(query, res);
});

//tested
app.post("/api/files", function(req, res) {
    var form = new multiparty.Form();
    var target_path = '';

    form.on('file', function(name, file) {
        //console.log(file);
        //console.log(name);
        //console.log(file.path);
        //console.log(__dirname);
        //console.log('filename:' + file.originalFilename);
        //console.log('fileSize: ' + (file.size / 1024));
        var tmp_path = file.path;
        target_path = __dirname + '\\' + file.originalFilename;
        fs.renameSync(tmp_path, target_path, function(err) {
            if (err) console.error(err.stack);
            else console.log(target_path);
        })
    });
    form.parse(req, function(err, fields, files) {
        //console.log(req)
        var dict = files.Contents[0];
        //console.log(dict);
        var query = "EXECUTE CTF.dbo.CTF_CreateFilesSp " + fields.ID + ", '" + dict["originalFilename"] + "', '" + target_path + "'";
        executeQuery(query, res);
    });
});

//tested
app.post("/api/submitanswer", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_VerifyAnswerSp " + req.body.EventID + ", " + req.body.TeamID + ", " + req.body.QuestionID + ", '" + req.body.Answer + "'";
    executeQuery(query, res);
});

//tested
app.get("/api/currentevent", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_GetCurrentEventSp";
    executeQuery(query, res);
});

//tested
app.post("/api/gethint", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_GetHintSp " + req.body.EventID + ", " + req.body.TeamID + ", " + req.body.QuestionID;
    executeQuery(query, res);
});

//tested
app.post("/api/scoreboard", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_GetScoresSp " + req.body.EventID;
    executeQuery(query, res);
});

//tested
app.post("/api/printscores", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_GetPrintData " + req.body.EventID;
    executeQuery(query, res);
});

//tested
app.post("/api/lookupplayer", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_GetPlayerData '" + req.body.Player + "'";
    executeQuery(query, res);
});

//tested
app.post("/api/liveupdates", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_LiveUpdates " + req.body.TeamID + ", " + req.body.EventID;
    executeQuery(query, res);
});
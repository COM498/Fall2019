//required packages
const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const crypto = require('crypto');
const multiparty = require('multiparty');
const fs = require('fs');
const fssync = require('fs-sync');
const path = require('path');
const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session);

var client = redis.createClient(process.env.REDIS_URL);
var app = express();

app.use(session({
    secret: 'saintleoctf',
    store: new redisStore({client: client, ttl: 1800}),
    saveUninitialized: false,
    resave: false
}));

app.use(bodyParser.json({ limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000}));
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
    },
    requestTimeout: 60000
};

const pool = new sql.ConnectionPool(dbConfig);
const poolConnection = pool.connect();

pool.on('error', err => {
    console.log(err);
});

//prevents sql connection being open errors
async function executeQuery(query, res) {
    await poolConnection;
    var request = pool.request();
    request.query(query, function(err, resp) {
        if (err) {
            console.log("Error while querying: ", err);
            res.send(err);
        }
        else {
            res.send(resp);

        }
    });
};

//connects to sql server express and executes the query
// var executeQuery = function (query, res) {
//     try {
//         sql.connect(dbConfig, function(err) {
//             if (err) {
//                 console.log("Error while connecting database: ", err);
//                 res.send(err);
//                 sql.close();
//             }
//             else {
//                 var request = new sql.Request();
//                 request.query(query, function (err, resp) {
//                     if (err) {
//                         console.log("Error while querying: ", err);
//                         res.send(err);
//                         sql.close();
//                     }
//                     else {
//                         res.send(resp);
//                         sql.close();
//                     }
//                 });
//             }
//         });

        
//     }
//     catch (e) {
//         console.log("Error: ", e);
//         sql.close();
//     }
// }

//verifies session
app.get('/session', function(req, res) {
    let sess = req.session;
    if (sess.username) {
        res.send("OK");
    }
    else {
        res.send("No Session");
    }
});

//starts session
app.post('/login', function(req, res) {
    req.session.username = req.body.username;
    res.send("OK");
})

//destroys session
app.get('/logout', function(req, res) {
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        else {
            res.send("OK");
        }
    });
});

//creates a team with entered name and hashed password
app.post("/api/teams", function(req, res) {
    var hash = crypto.createHash('sha256');
    hash.update(req.body.Pwd);

    var query = "EXECUTE CTF.dbo.CTF_CreateTeamSp " + req.body.Name + ", '" + hash.digest('hex') + "'";
    executeQuery(query, res);
});

//adds players to the team with comma-separated list of players and team id
app.put("/api/players", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_UpdatePlayersSp " + req.body.ID + ", '" + req.body.Player + "', " + req.body.Active + ", '" + req.body.Email + "'";
    executeQuery(query, res);
});

//retrieves all the players from the specific team with the entered id
app.post("/api/players", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_GetPlayersSp " + req.body.ID;
    executeQuery(query, res);
});

//creates an event with beginning date and times and end date and times
app.post("/api/events", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_CreateEventSp '" + req.body.Name + "', '" + req.body.sDate + "', '" + req.body.sTime + "', '" + req.body.eDate + "', '" + req.body.eTime + "', " + req.body.Ex;
    executeQuery(query, res);
});

//creates a question with a answer and hint information
app.post("/api/questions", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_CreateQuestionSp '" + req.body.Question + "', '" + req.body.Answer + "', " + req.body.Value + ", " + req.body.Admin + ", " + req.body.Level;
    executeQuery(query, res);
});

//retrieves all created questions
app.get("/api/questions", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_GetQuestionsSp";
    executeQuery(query, res);
});

//deletes an event based on entered id
app.delete("/api/events", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_DeleteEventSp " + req.body.ID;
    executeQuery(query, res);
});

//deletes a question with specific id
app.delete("/api/questions", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_DeleteQuestionSp " + req.body.ID;
    executeQuery(query, res);
});

//updates event questions with new values
app.put("/api/eventquestions", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_UpdateEventQuestionSp " + req.body.EventID + ", " + req.body.QuestionID + ", " + req.body.Value + ", " + req.body.Solved;
    executeQuery(query, res);
});

//updates event with new start and end date and times
app.put("/api/events", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_UpdateEventSp " + req.body.ID + ", '" + req.body.Name + "', '" + req.body.sDate + "', '" + req.body.sTime + "', '" + req.body.eDate + "', '" + req.body.eTime + "', " + req.body.Exclusive;
    executeQuery(query, res);
});

//updates questions with new answers or hint information
app.put("/api/questions", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_UpdateQuestionSp " + req.body.ID + ", '" + req.body.Question + "', '" + req.body.Answer + "', " + req.body.Level + ", " + req.body.Value + ", '" + req.body.Hint1 
    + "', " + req.body.HintValue1 + ", '" + req.body.Hint2 + "', " + req.body.HintValue2 + ", '" + req.body.Hint3 + "', " + req.body.HintValue3;
    executeQuery(query, res);
});

//verifies log in data 
app.post("/api/login", function(req, res) {
    var loginName = req.body.Username;
    var hash = crypto.createHash('sha256');
    hash.update(req.body.Pwd);

    var pwd = req.body.Pwd;
    var pass = hash.digest('hex');

    var query = "EXECUTE CTF.dbo.CTF_VerifyLoginSp '" + loginName + "', '" + pass + "'";
    executeQuery(query, res);
});

//retrieves all created events
app.get("/api/events", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_GetEventsSp";
    executeQuery(query, res);
});

//creates the hints for the question
app.post("/api/hints", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_CreateHintsSp " + req.body.Question + ", '" + req.body.Hint + "', " + req.body.Value + ", " + req.body.HintID;
    executeQuery(query, res);
});

//gets all questions assigned to an event
app.post("/api/eventquestions", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_GetQuestionsForEventSp " + req.body.Event + ", " + req.body.Team;
    executeQuery(query, res);
});

//removes a question from an event
app.delete("/api/eventquestions", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_DeleteEventQuestionSp " + req.body.EventID + ", " + req.body.QuestionID;
    executeQuery(query, res);
});

//creates a new question file
app.post("/api/files", function(req, res) {
    var form = new multiparty.Form();
    var target_path = '';

    form.on('file', function(name, file) {
        var tmp_path = file.path;
        target_path = process.env.FILE_PATH + file.originalFilename;
        //target_path = "C:\\Users\\brianna.weaver\\Documents\\" + file.originalFilename;
        console.log(target_path)

        var extname = path.extname(target_path);
        if (extname =='.jpg' || extname == '.png' || extname == '.ico' || extname == '.eot' || extname == '.ttf' || extname == '.svg') {
            fssync.copy(tmp_path, target_path, {encoding: 'binary'}, function(err) {
                if (err) console.log(err.stack);
                else {
                    console.log(target_path);
                }
            })
        }
        else {
            fs.copyFile(tmp_path, target_path, function(err) {
                if (err) console.error(err.stack);
                else console.log(target_path);
            })
        }
    });
    form.parse(req, function(err, fields, files) {
        var dict = files.Contents[0];
        var query = "EXECUTE CTF.dbo.CTF_CreateFilesSp " + fields.ID + ", '" + dict["originalFilename"] + "', '" + dict["originalFilename"] + "'";// target_path + "'";
        executeQuery(query, res);
    });
});

//verifies the submitted answer and adjusts points
app.post("/api/submitanswer", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_VerifyAnswerSp " + req.body.EventID + ", " + req.body.TeamID + ", " + req.body.QuestionID + ", '" + req.body.Answer + "'";
    executeQuery(query, res);
});

//gets the current event running
app.get("/api/currentevent", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_GetCurrentEventSp";
    executeQuery(query, res);
});

//gets all the hints for a particular event's question and adjusts the question value for the team
app.post("/api/gethint", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_GetHintSp " + req.body.EventID + ", " + req.body.TeamID + ", " + req.body.QuestionID;
    executeQuery(query, res);
});

//retrieves all team scores
app.post("/api/scoreboard", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_GetScoresSp " + req.body.EventID;
    executeQuery(query, res);
});

//gets the printable event data
app.post("/api/printscores", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_GetPrintData " + req.body.EventID;
    executeQuery(query, res);
});

//gets player data for all events for the given player name or email
app.post("/api/lookupplayer", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_GetPlayerData '" + req.body.Player + "'";
    executeQuery(query, res);
});

//retreives all the live update information needed for the dashboard
app.post("/api/liveupdates", function(req, res) {
    var query = "EXECUTE CTF.dbo.CTF_LiveUpdates " + req.body.TeamID + ", " + req.body.EventID;
    executeQuery(query, res);
});

// app.post("/api/getfiles", function(req, res) {
//     //const file = process.env.FILE_PATH + req.body.FileName;
//     const file = "C:\\Users\\brianna.weaver\\Documents\\" + req.body.FileName;
//     res.download(file, req.body.FileName);
// })
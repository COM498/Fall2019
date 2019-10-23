var team = false;
var eventid = sessionStorage.getItem("eventid");
var teamid = sessionStorage.getItem("teamid");

const ajaxUrlQuestions = "/api/eventquestions";
const ajaxUrlAnswers = "/api/submitanswer";
const ajaxUrlHints = "/api/gethint";
const ajaxUrlScores = "/api/scoreboard";

$(document).ready(function() {

    if (eventid != null && teamid != null) {
        team = true;
    }

    // (function poll(){
    // setTimeout(function(){
    //     $.ajax({ url: "server", success: function(data){
    //         //Update your dashboard gauge
    //         salesGauge.setValue(data.value);
    //         //Setup the next poll recursively
    //         poll();
    //     }, dataType: "json"});
    // }, 30000);
    // })();

    $.ajax({
        type: "POST",
        url: ajaxUrlScores,
        data: '{"EventID": "' + eventid + '"}',
        contentType: "application/json",
        async: false
    }).done(function(result) {
        if (result.recordset.length > 0) {
            var origDiv = document.getElementById("scorestable");

            for (var i = 0; i < result.recordset.length; i++) {
                var row = origDiv.insertRow();
                var cell = row.insertCell();
                cell.innerHTML = result.recordset[i]["team_name"];
                cell.style.padding = "5px";
                cell.setAttribute("class", "hacker");
                cell = row.insertCell();
                cell.innerHTML = result.recordset[i]["current_score"];
                cell.style.padding = "5px";
                cell.setAttribute("class", "hacker");

                if (parseInt(result.recordset[i]["team_id"]) === parseInt(teamid)) {
                    document.getElementById("level1").textContent = result.recordset[i]["level1solved"];
                    document.getElementById("level2").textContent = result.recordset[i]["level2solved"];
                    document.getElementById("level3").textContent = result.recordset[i]["level3solved"];
                    document.getElementById("level4").textContent = result.recordset[i]["level4solved"];
                    document.getElementById("level5").textContent = result.recordset[i]["level5solved"];
                    document.getElementById("currentscore").textContent = result.recordset[i]["current_score"];
                }
            }
        }
    })

    $.ajax({
        type: "POST",
        url: ajaxUrlQuestions,
        data: '{"Event": "' + eventid + '", "Team": "' + teamid + '"}',
        contentType: "application/json"
    }).done(function(result) {
        if (result.recordset.length > 0) {

            var Level1 = false;
            var Level2 = false;
            var Level3 = false;
            var Level4 = false;
            var Level5 = false;

            for (var i = 0; i < result.recordset.length; i++) {
                var nav = document.getElementById("navbar");
                var link = document.createElement("a");
                link.setAttribute("href", "javascript:;");

                if (result.recordset[i]["level"].toString() === "1" && !Level1) {
                    var label = document.createElement("label");
                    label.setAttribute("id", "lblLevel1");
                    label.setAttribute("class", "hacker");
                    label.textContent = "Level 1:";

                    nav.appendChild(label);

                    Level1 = true;
                }

                if (result.recordset[i]["level"].toString() === "2" && !Level2) {
                    var label = document.createElement("label");
                    label.setAttribute("id", "lblLevel2");
                    label.setAttribute("class", "hacker");
                    label.textContent = "Level 2:";

                    nav.appendChild(label);

                    Level2 = true;
                }

                if (result.recordset[i]["level"].toString() === "3" && !Level3) {
                    var label = document.createElement("label");
                    label.setAttribute("id", "lblLevel3");
                    label.setAttribute("class", "hacker");
                    label.textContent = "Level 3:";

                    nav.appendChild(label);

                    Level3 = true;
                }

                if (result.recordset[i]["level"].toString() === "4" && !Level4) {
                    var label = document.createElement("label");
                    label.setAttribute("id", "lblLevel4");
                    label.setAttribute("class", "hacker");
                    label.textContent = "Level 4:";

                    nav.appendChild(label);

                    Level4 = true;
                }

                if (result.recordset[i]["level"].toString() === "5" && !Level5) {
                    var label = document.createElement("label");
                    label.setAttribute("id", "lblLevel5");
                    label.setAttribute("class", "hacker");
                    label.textContent = "Level 5:";

                    nav.appendChild(label);

                    Level5 = true;
                }

                var span = document.createElement("span");
                span.setAttribute("id", "question" + result.recordset[i]["question_id"]);
                if (result.recordset[i]["team_value"] != null) {
                    span.textContent = "Question " + (i + 1) + " - " + result.recordset[i]["team_value"];
                }
                else {
                    span.textContent = "Question " + (i + 1) + " - " + result.recordset[i]["question_value"];
                }
                span.setAttribute("class", "hacker");
                link.appendChild(span);
                nav.appendChild(link);

                var main = document.getElementById("main");

                var newDialog = document.createElement("div");
                newDialog.setAttribute("id", "dialog" + result.recordset[i]["question_id"]);
                newDialog.setAttribute("class", "no-close");
                newDialog.setAttribute("title", "Question " + (i + 1));

                var br = document.createElement("br");

                var value = document.createElement("h4");
                value.setAttribute("id", "question" + result.recordset[i]["question_id"]);
                if (result.recordset[i]["team_value"] != null) {
                    value.textContent = "Value: " + result.recordset[i]["team_value"] + " points";
                }
                else {
                    value.textContent = "Value: " + result.recordset[i]["question_value"] + " points";
                }
                value.style.padding = "0px 10px 10px 10px";

                var para = document.createElement("p");
                para.setAttribute("id", "question" + result.recordset[i]["question_id"]);
                para.textContent = result.recordset[i]["question"];
                para.style.padding = "0px 10px 10px 10px";

                var area = document.createElement("input");
                area.setAttribute("id", "answer" + result.recordset[i]["question_id"]);
                area.setAttribute("resizable", true);
                area.style.padding = "0px 10px 10px 10px";

                area.addEventListener("keyup", function(event) {
                    var splitter = event.target.id.toString().split("answer")[1];
                    if (event.keyCode === 13) {
                        event.preventDefault();
                        document.getElementById("submit" + splitter).click();
                    }
                });
                
                var subButton = document.createElement("button");
                subButton.setAttribute("id", "submit" + result.recordset[i]["question_id"]);
                subButton.textContent = "Submit";

                var hintButton = document.createElement("button");
                hintButton.setAttribute("id", "hint" + result.recordset[i]["question_id"]);
                hintButton.textContent = "See Hint";

                var attach = document.createElement("a");
                attach.setAttribute("id", "file" + result.recordset[i]["question_id"]);
                attach.style.padding = "0px 10px 10px 10px";
                if (result.recordset[i]["filename"].toString() === "") {
                    attach.style.display = "none";
                }
                else {
                    attach.textContent = result.recordset[i]["filename"];
                    attach.setAttribute("href", result.recordset[i]["filepath"]);
                    var splitter = result.recordset[i]["filepath"].split("\\");
                }

                var hint = document.createElement("p");
                hint.setAttribute("id", "hintvalue" + result.recordset[i]["question_id"]);
                hint.style.padding = "0px 10px 10px 10px";
                hint.style.display = "none";

                newDialog.appendChild(value);
                newDialog.appendChild(br);
                newDialog.appendChild(para);
                newDialog.appendChild(area);
                newDialog.appendChild(br);
                newDialog.appendChild(subButton);
                newDialog.appendChild(hintButton);
                newDialog.appendChild(attach);
                newDialog.appendChild(hint);
                main.appendChild(newDialog);

                $( function() {
                    $("#" + newDialog.id).dialog();
                    $("#" + newDialog.id).dialog("close");
                } );
            }
        }
    })
});

$(document).on('click', function(event) {
    var tag = event.target.tagName;

    if (event.target.tagName === "SPAN") {
        var splitter = event.target.id.split("question")[1];

        var isOpen = $("#dialog" + splitter).dialog('isOpen');
        if (!isOpen) {
            $("#dialog" + splitter).dialog('open');
        }
        else {
            $("#dialog" + splitter).dialog('close');
        }
    }

    if (team) {
        if (event.target.tagName === "BUTTON") {
            if (event.target.id.includes("submit")) {
                var splitter = event.target.id.split("submit")[1];
                var answer = $("#answer" + splitter).val();
                var id = "question" + splitter;

                $.ajax({
                    type: "POST",
                    url: ajaxUrlAnswers,
                    data: '{"EventID": "'+ eventid + '", "TeamID": "' + teamid + '", "QuestionID": "' + splitter + '", "Answer": "' + answer + '"}',
                    contentType: "application/json"
                }).done(function(result) {
                    if (result.recordset[0]["solved"] == 3) {
                        alert("Already solved by another team.");
                        if (!$("#question" + splitter).val().includes("✗")) {
                            $("#question" + splitter).val($("#question" + splitter).val() + " ✗");
                        }
                        $("#dialog" + splitter).dialog('close');
                        document.getElementById(id).style.pointerEvents = "none";
                    }
                    else if (result.recordset[0]["solved"] == 2) {
                        alert("Already solved by your team.");
                        if (!$("#question" + splitter).val().includes("✓")) {
                            $("#question" + splitter).val($("#question" + splitter).val() + " ✓");
                        }
                        $("#dialog" + splitter).dialog('close');
                        document.getElementById(id).style.pointerEvents = "none";
                    }
                    else if (result.recordset[0]["solved"] == 0) {
                        alert("Incorrect");
                    }
                    else {
                        alert("Correct");
                        if (!$("#question" + splitter).val().includes("✓")) {
                            document.getElementById(id).textContent = document.getElementById(id).textContent + " ✓";
                        }
                        $("#dialog" + splitter).dialog('close');
                        document.getElementById(id).style.pointerEvents = "none";

                        var current = document.getElementById("currentscore").textContent;
                        var score = parseInt(current);
                        var value = parseInt(result.recordset[0]["value"]);

                        document.getElementById("currentscore").textContent = (score + value);
                    }
                })
            }
            else if (event.target.id.includes("hint")) {
                var splitter = event.target.id.split("hint")[1];

                $.ajax({
                    type: "POST",
                    url: ajaxUrlHints,
                    data: '{"EventID": "' + eventid + '", "TeamID": "' + teamid + '", "QuestionID": "' + splitter + '"}',
                    contentType: "application/json"
                }).done(function(result) {

                    document.getElementById("hintvalue" + splitter).innerHTML = "";

                    for (var i = 0; i < result.recordset.length; i++) 
                    {
                        if (result.recordset[i]["used"] === 1) {
                            document.getElementById("hintvalue" + splitter).innerHTML += result.recordset[i]["hint"] + "<br/>"; 
                            document.getElementById("hintvalue" + splitter).style.display = "block";
                            if (result.recordset[i] === result.recordset[result.recordset.length - 1]) {
                                document.getElementById("hint" + splitter).disabled = true;
                            }
                        }
                        else if (result.recordset[i]["used"] === 0) {
                            document.getElementById("hintvalue" + splitter).innerHTML += result.recordset[i]["hint"] + "<br/>"; 
                            document.getElementById("hintvalue" + splitter).style.display = "block";
                            break;
                        }
                    }
                })
            }
        }
    }
});
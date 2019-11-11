$(document).ready(function() {
    const ajaxUrlQuestions = "/api/questions";
    const ajaxUrlEvents = "/api/events";
    const ajaxUrlHints = "/api/hints";
    const ajaxUrlEventQuestions = "/api/eventquestions";
    const ajaxUrlFiles = "/api/files";
    const ajaxUrlCurrentEvent = "/api/currentevent";
    const ajaxUrlPrintScores = "/api/printscores";
    const ajaxUrlPlayers = "/api/lookupplayer";
    const ajaxUrlSession = "/session";
    const ajaxUrlLogout = "/logout"

    var gotoUrlDash = "/dashboard.html";
    var gotoUrlWait = "/wait.html";
    var gotoUrlScore = "/scoreboard.html";
    var gotoUrlLogout = "/index.html";

    var adminid = sessionStorage.getItem("adminid");

    $("#logout").click(function() {
        sessionStorage.clear();   
        $.ajax({
            type: "GET",
            url: ajaxUrlLogout
        }).done(function(result) {
            window.location.replace(gotoUrlLogout);
        })   
    });

    var eventid;

    $.ajax({
        type: "GET",
        url: ajaxUrlSession
    }).done(function(result) {
        if (result === "No Session") {
            alert("You are not logged in. Please log in again.");
            sessionStorage.clear();
            document.getElementById("logout").click();
        }
    });

    $("#playerlookup").click(function() {
        document.getElementById("printteam").style.display = "none";
        document.getElementById("updatequestion").style.display = "none";
        document.getElementById("deletequestion").style.display = "none";
        document.getElementById("deleteevent").style.display = "none";
        document.getElementById("addingquestions").style.display = "none";
        document.getElementById("createevent").style.display = "none";
        document.getElementById("eventcurrents").style.display = "none";
        document.getElementById("questioncurrents").style.display = "none";
        document.getElementById("createquestion").style.display = "none";
        document.getElementById("updateevent").style.display = "none";
        document.getElementById("lookupplayer").style.display = "block";
    });

    $("#teamprint").click(function() {
        document.getElementById("printteam").style.display = "block";
        document.getElementById("updatequestion").style.display = "none";
        document.getElementById("deletequestion").style.display = "none";
        document.getElementById("deleteevent").style.display = "none";
        document.getElementById("addingquestions").style.display = "none";
        document.getElementById("createevent").style.display = "none";
        document.getElementById("eventcurrents").style.display = "none";
        document.getElementById("questioncurrents").style.display = "none";
        document.getElementById("createquestion").style.display = "none";
        document.getElementById("updateevent").style.display = "none";
        document.getElementById("lookupplayer").style.display = "none";

        if (document.getElementById("printoptions").length > 1) {
            var selectOp = document.getElementById("printoptions");
            $("#printoptions").empty();

            var option = document.createElement("option");
            selectOp.appendChild(option);
        }

        if (document.getElementById("printoptions").length === 1) {
            
            $.ajax({
                type: "GET",
                url: ajaxUrlEvents,
                async: false
            }).done(function(result) {
                if (result.recordset.length != 0) {
                    var origDiv = document.getElementById("printoptions");
                    for (var i = 0; i < result.recordset.length; i++) {
                        var rowDiv = document.createElement("option");
                        rowDiv.textContent = result.recordset[i]["event_name"];
                        rowDiv.setAttribute("value", result.recordset[i]["event_id"]);

                        origDiv.appendChild(rowDiv);
                    }

                    if (result.recordset.lenth > 5) {
                        origDiv.setAttribute("size", result.recordset.length);
                    }
                }
            })
        }
    });
    
    $("#currentscoreboard").click(function() {
        window.location.href = gotoUrlScore;
    });

    $("#currentdashboard").click(function() {
        $.ajax({
            type: "GET",
            url: ajaxUrlCurrentEvent,
            async: false
        }).done(function(result2) {
            if (result2.recordset[0]["event_id"] > 0) {
                var today = new Date();
                var sDate = new Date(result2.recordset[0]["start_date"].replace("Z", ""));
                var sTime = new Date(result2.recordset[0]["start_time"].replace("Z", ""));
                var eTime = new Date(result2.recordset[0]["end_time"].replace("Z",""));
                var eDate = new Date(result2.recordset[0]["end_date"].replace("Z", ""));

                sDate.setHours(sTime.getHours());
                sDate.setMinutes(sTime.getMinutes());
                sDate.setSeconds(sTime.getSeconds());
                eDate.setHours(eTime.getHours());
                eDate.setMinutes(eTime.getMinutes());
                eDate.setSeconds(eTime.getSeconds());

                if (today >= sDate &&
                    today <= eDate) {
                    
                    localStorage.removeItem("teamid");

                    window.location.href = gotoUrlDash;
                }
                else {
                    window.location.href = gotoUrlWait;
                }
            }
        })
    });

    $("#questionupdate").click(function() {
        document.getElementById("updatequestion").style.display = "block";
        document.getElementById("deletequestion").style.display = "none";
        document.getElementById("deleteevent").style.display = "none";
        document.getElementById("addingquestions").style.display = "none";
        document.getElementById("createevent").style.display = "none";
        document.getElementById("eventcurrents").style.display = "none";
        document.getElementById("questioncurrents").style.display = "none";
        document.getElementById("createquestion").style.display = "none";
        document.getElementById("updateevent").style.display = "none";
        document.getElementById("printteam").style.display = "none";
        document.getElementById("lookupplayer").style.display = "none";

        if (document.getElementById("questionupdates").length > 1) {
            var selectOp = document.getElementById("questionupdates");
            $("#questionupdates").empty();

            var option = document.createElement("option");
            selectOp.appendChild(option);
        }

        if (document.getElementById("questionupdates").length === 1) {
            $.ajax({
                type: "GET",
                url: ajaxUrlQuestions
            }).done(function(result) {
                if (result.recordset.length != 0 ) {
                    for (var i = 0; i < result.recordset.length; i++) {
                        var origDiv = document.getElementById("questionupdates");
                        var rowDiv = document.createElement("option");
                        rowDiv.textContent = result.recordset[i]["question"];
                        rowDiv.setAttribute("value", result.recordset[i]["question_id"]);

                        origDiv.appendChild(rowDiv);
                    }
                }
            })
        }
    });

    $("#eventupdate").click(function() {
        document.getElementById("deletequestion").style.display = "none";
        document.getElementById("deleteevent").style.display = "none";
        document.getElementById("addingquestions").style.display = "none";
        document.getElementById("createevent").style.display = "none";
        document.getElementById("eventcurrents").style.display = "none";
        document.getElementById("questioncurrents").style.display = "none";
        document.getElementById("createquestion").style.display = "none";
        document.getElementById("updateevent").style.display = "block";
        document.getElementById("updatequestion").style.display = "none";
        document.getElementById("printteam").style.display = "none";
        document.getElementById("lookupplayer").style.display = "none";

        if (document.getElementById("eventupdates").length > 1) {
            var selectOp = document.getElementById("eventupdates");
            $("#eventupdates").empty();

            var option = document.createElement("option");
            selectOp.appendChild(option);
        }

        if (document.getElementById("eventupdates").length === 1) {
            
            $.ajax({
                type: "GET",
                url: ajaxUrlEvents,
                async: false
            }).done(function(result) {
                if (result.recordset.length != 0) {
                    for (var i = 0; i < result.recordset.length; i++) {
                        var origDiv = document.getElementById("eventupdates");
                        var rowDiv = document.createElement("option");
                        rowDiv.textContent = result.recordset[i]["event_name"];
                        rowDiv.setAttribute("value", result.recordset[i]["event_id"]);
                        
                        origDiv.appendChild(rowDiv);
                    }
                }
            })
        }
    });

    $("#questiondeletion").click(function() {
        document.getElementById("deletequestion").style.display = "block";
        document.getElementById("deleteevent").style.display = "none";
        document.getElementById("addingquestions").style.display = "none";
        document.getElementById("createevent").style.display = "none";
        document.getElementById("eventcurrents").style.display = "none";
        document.getElementById("questioncurrents").style.display = "none";
        document.getElementById("createquestion").style.display = "none";
        document.getElementById("updateevent").style.display = "none";
        document.getElementById("updatequestion").style.display = "none";
        document.getElementById("printteam").style.display = "none";
        document.getElementById("lookupplayer").style.display = "none";

        if (document.getElementById("questiondeletes").length > 0) {
            $("#questiondeletes").empty();
        }

        if (document.getElementById("questiondeletes").length === 0) {
            
            $.ajax({
                type: "GET",
                url: ajaxUrlQuestions,
                async: false
            }).done(function(result) {
                if (result.recordset.length != 0) {
                    for (var i = 0; i < result.recordset.length; i++) {
                        var origDiv = document.getElementById("questiondeletes");
                        var rowDiv = document.createElement("option");
                        rowDiv.textContent = result.recordset[i]["question"];
                        rowDiv.setAttribute("value", result.recordset[i]["question_id"]);

                        origDiv.appendChild(rowDiv);
                    }
                }
            })
        }
    });

    $("#eventdeletion").click(function() {
        document.getElementById("deleteevent").style.display = "block";
        document.getElementById("addingquestions").style.display = "none";
        document.getElementById("createevent").style.display = "none";
        document.getElementById("eventcurrents").style.display = "none";
        document.getElementById("questioncurrents").style.display = "none";
        document.getElementById("createquestion").style.display = "none";
        document.getElementById("deletequestion").style.display = "none";
        document.getElementById("updateevent").style.display = "none";
        document.getElementById("updatequestion").style.display = "none";
        document.getElementById("printteam").style.display = "none";
        document.getElementById("lookupplayer").style.display = "none";

        if (document.getElementById("eventdeletes").length > 0) {
            $("#eventdeletes").empty();
        }

        if (document.getElementById("eventdeletes").length === 0) {
            
            $.ajax({
                type: "GET",
                url: ajaxUrlEvents,
                async: false
            }).done(function(result) {
                if (result.recordset.length != 0) {
                    for (var i = 0; i < result.recordset.length; i++) {
                        var origDiv = document.getElementById("eventdeletes");
                        var rowDiv = document.createElement("option");
                        rowDiv.textContent = result.recordset[i]["event_name"];
                        rowDiv.setAttribute("value", result.recordset[i]["event_id"]);

                        origDiv.appendChild(rowDiv);
                    }
                }
            })
        }
    });

    $("#eventquestions").click(function() {
        document.getElementById("addingquestions").style.display = "block";
        document.getElementById("createevent").style.display = "none";
        document.getElementById("eventcurrents").style.display = "none";
        document.getElementById("questioncurrents").style.display = "none";
        document.getElementById("createquestion").style.display = "none";
        document.getElementById("deleteevent").style.display = "none";
        document.getElementById("deletequestion").style.display = "none";
        document.getElementById("updateevent").style.display = "none";
        document.getElementById("updatequestion").style.display = "none";
        document.getElementById("printteam").style.display = "none";
        document.getElementById("lookupplayer").style.display = "none";

        if (document.getElementById("availableevents").length > 1) {
            var selectOp = document.getElementById("availableevents");
            $("#availablevents").empty();

            var option = document.createElement("option");
            selectOp.appendChild(option);
        }

        if (document.getElementById("availableevents").length === 1) {
            
            $.ajax({
                type: "GET",
                url: ajaxUrlEvents,
                async: false
            }).done(function(result) {
                if (result.recordset.length != 0) {
                    for (var i = 0; i < result.recordset.length; i++) {
                        var origDiv = document.getElementById("availableevents");
                        var rowDiv = document.createElement("option");
                        rowDiv.textContent = result.recordset[i]["event_name"];
                        rowDiv.setAttribute("value", result.recordset[i]["event_id"]);

                        origDiv.appendChild(rowDiv);
                    }

                    if (result.recordset.lenth > 5) {
                        origDiv.setAttribute("size", result.recordset.length);
                    }
                }
            })
        }

        if (document.getElementById("availablequestions").length > 0) {
            $("#availablequestions").empty();
        }

        if (document.getElementById("availablequestions").length === 0) {

            $.ajax({
                type: "GET",
                url: ajaxUrlQuestions
            }).done(function(result) {
                if (result.recordset.length != 0) {
                    var origDiv = document.getElementById("availablequestions");

                    for (var i = 0; i < result.recordset.length; i++) {
                        var rowDiv = document.createElement("option");
                        rowDiv.textContent = result.recordset[i]["question"] + " - " + result.recordset[i]["question_value"] + " points";
                        rowDiv.setAttribute("id", result.recordset[i]["question_id"]);

                        origDiv.appendChild(rowDiv);
                        
                    }

                    if (result.recordset.length > 5) {
                        origDiv.setAttribute("size", result.recordset.length);
                    }
                }
            })
        }
    });

    $("#availableevents").change(function() {
        var selectBox = document.getElementById("availableevents");
        var selectedOp = selectBox.options[selectBox.selectedIndex].value;

        eventid = selectedOp;
        if (selectedOp != 0) {
            $.ajax({
                type: "POST",
                url: ajaxUrlEventQuestions,
                data: '{"Event": "' + selectedOp + '", "Team": "0"}',
                contentType: "application/json"
            }).done(function(result) {
                if (result.recordset.length != 0) {
                    var origDiv = document.getElementById("questionsadded");
                    for(var i = 0; i < result.recordset.length; i++) {
                        
                        var rowDiv = document.createElement("option");
                        rowDiv.textContent = result.recordset[i]["question"];
                        rowDiv.value = result.recordset[i]["question_id"];
                        var index = 0;

                        var otherDiv = document.getElementById("availablequestions");
                        
                        for (var j = 0; j < otherDiv.options.length; j++) {
                            if (otherDiv.options[j].id.toString() === rowDiv.value) {
                                index = otherDiv.options[j].index;
                                break;
                            }
                        }

                        otherDiv.remove(index);

                        origDiv.appendChild(rowDiv);
                    }

                    if (result.recordset.length > 5) {
                        origDiv.setAttribute("size", result.recordset.length);
                    }
                }
            })
        }
    });

    $("#questionupdates").change(function() {
        var selectBox = document.getElementById("questionupdates");
        var selectedId = selectBox.options[selectBox.selectedIndex].value;

        if (selectedId != "") {
            $.ajax({
                type: "GET",
                url: ajaxUrlQuestions
            }).done(function(result) {
                if (result.recordset.length != 0) {
                    for (var i = 0; i < result.recordset.length; i++) {
                        if (result.recordset[i]["question_id"].toString() === selectedId) {
                            document.getElementById("questionlabel").value = result.recordset[i]["question_id"];
                            var question = result.recordset[i]["question"];
                            document.getElementById("updatequestiontext").value = question;
                            document.getElementById("answerupdate").value = result.recordset[i]["answer"];
                            var selectBox = document.getElementById("levelupdate");
                            selectBox.selectedIndex = parseInt(result.recordset[i]["level"]);
                            document.getElementById("valueupdate").value = result.recordset[i]["question_value"];
                            document.getElementById("hint1update").value = result.recordset[i]["hint1"];
                            document.getElementById("hint1valueupdate").value = result.recordset[i]["hint1value"];
                            document.getElementById("hint2update").value = result.recordset[i]["hint2"];
                            document.getElementById("hint2valueupdate").value = result.recordset[i]["hint2value"];
                            document.getElementById("hint3update").value = result.recordset[i]["hint3"];
                            document.getElementById("hint3valueupdate").value = result.recordset[i]["hint3value"];
                        }
                    }
                }
            })
        }
        else {
            document.getElementById("questionlabel").value = "";
            document.getElementById("questionupdate").value = "";
            document.getElementById("answerupdate").value = "";
            document.getElementById("valueupdate").value = "";
            document.getElementById("hint1update").value = "";
            document.getElementById("hint1valueupdate").value = "";
            document.getElementById("hint2update").value = "";
            document.getElementById("hint2valueupdate").value = "";
            document.getElementById("hint3update").value = "";
            document.getElementById("hint3valueupdate").value = "";
        }
    });

    $("#eventupdates").change(function() {
        var selectBox = document.getElementById("eventupdates");
        var selectedId = selectBox.options[selectBox.selectedIndex].value;

        if (selectedId != "") { 
            $.ajax({
                type: "GET",
                url: ajaxUrlEvents
            }).done(function(result) {
                if (result.recordset.length != 0) {
                    for (var i = 0; i < result.recordset.length; i++) {
                        if (result.recordset[i]["event_id"].toString() === selectedId) {
                            document.getElementById("eventlabel").value = result.recordset[i]["event_id"];
                            document.getElementById("updatename").value = result.recordset[i]["event_name"];

                            var dstart = new Date(result.recordset[i]["start_date"].replace("Z", ""));
                            var tstart = new Date(result.recordset[i]["start_time"].replace("Z", ""));

                            var day = ("0" + dstart.getDate()).slice(-2);
                            var month = ("0" + (dstart.getMonth() + 1)).slice(-2);
                            var hours = ("0" + tstart.getHours()).slice(-2);
                            var minutes = ("0" + tstart.getMinutes()).slice(-2);

                            dstart = dstart.getFullYear() + "-" + month + "-" + day;
                            tstart = hours + ":" + minutes;

                            document.getElementById("updatestartdate").value = dstart;
                            document.getElementById("updatestarttime").value = tstart;

                            var dend = new Date(result.recordset[i]["end_date"].replace("Z", ""));
                            var tend = new Date(result.recordset[i]["end_time"].replace("Z", ""));

                            day = ("0" + dend.getDate()).slice(-2);
                            month = ("0" + (dend.getMonth() + 1)).slice(-2);
                            hours = ("0" + tend.getHours()).slice(-2);
                            minutes = ("0" + tend.getMinutes()).slice(-2);

                            dend = dend.getFullYear() + "-" + month + "-" + day;
                            tend = hours + ":" + minutes;

                            document.getElementById("updateenddate").value = dend;
                            document.getElementById("updateendtime").value = tend;

                            document.getElementById("updatexclusive").checked = result.recordset[i]["exclusive_flag"];
                        }
                    }
                }
            })
        }
        else {
            document.getElementById("updatename").value = "";
            document.getElementById("updatestartdate").value = "";
            document.getElementById("updatestarttime").value = "";
            document.getElementById("updateenddate").value = "";
            document.getElementById("updateendtime").value = "";
            document.getElementById("updatexclusive").checked = false;
        }
    });

    $("#questionlevel").change(function() {
        var selectBox = document.getElementById("questionlevel");
        var points = selectBox.selectedOptions[0];
        var splitter1 = points.textContent.split(" and ")[1];
        var splitter2 = splitter1.split(" points")[0];
        document.getElementById("questionvalue").value = splitter2;
    });

    $("#levelupdate").change(function() {
        var selectBox = document.getElementById("levelupdate");
        var points = selectBox.selectedOptions[0];
        var splitter1 = points.textContent.split(" and ")[1];
        var splitter2 = splitter1.split(" points")[0];
        document.getElementById("valueupdate").value = splitter2;
    });

    $("#questioncreation").click(function() {
        document.getElementById("createquestion").style.display = "block";
        document.getElementById("createevent").style.display = "none";
        document.getElementById("eventcurrents").style.display = "none";
        document.getElementById("questioncurrents").style.display = "none";
        document.getElementById("addingquestions").style.display = "none";
        document.getElementById("deleteevent").style.display = "none";
        document.getElementById("deletequestion").style.display = "none";
        document.getElementById("updateevent").style.display = "none";
        document.getElementById("updatequestion").style.display = "none";
        document.getElementById("printteam").style.display = "none";
        document.getElementById("lookupplayer").style.display = "none";
    });

    $("#eventcreation").click(function() {
        document.getElementById("createevent").style.display = "block";
        document.getElementById("createquestion").style.display = "none";
        document.getElementById("eventcurrents").style.display = "none";
        document.getElementById("questioncurrents").style.display = "none";
        document.getElementById("addingquestions").style.display = "none";
        document.getElementById("deleteevent").style.display = "none";
        document.getElementById("deletequestion").style.display = "none";
        document.getElementById("updateevent").style.display = "none";
        document.getElementById("updatequestion").style.display = "none";
        document.getElementById("printteam").style.display = "none";
        document.getElementById("lookupplayer").style.display = "none";
    });

    $("#currentquestions").click(function() {
        document.getElementById("questioncurrents").style.display = "block";
        document.getElementById("createevent").style.display = "none";
        document.getElementById("createquestion").style.display = "none";
        document.getElementById("eventcurrents").style.display = "none";
        document.getElementById("addingquestions").style.display = "none";
        document.getElementById("deleteevent").style.display = "none";
        document.getElementById("deletequestion").style.display = "none";
        document.getElementById("updateevent").style.display = "none";
        document.getElementById("updatequestion").style.display = "none";
        document.getElementById("printteam").style.display = "none";
        document.getElementById("lookupplayer").style.display = "none";

        var origDiv = document.getElementById("addedquestions");
        var count = origDiv.rows.length;

        for (var i = 0; i < count; i++) {
            if (i > 1) {
                var row = origDiv.rows[2];
                var body = origDiv.childNodes[1];
                body.removeChild(row);
            }
        }

        if (origDiv.getElementsByTagName("tr").length === 2) {

            $.ajax({
                type: "GET",
                url: ajaxUrlQuestions
            }).done(function(result) {
                if (result.recordset.length != 0) {
                    for (var i = 0; i < result.recordset.length; i++) {
                        origDiv = document.getElementById("addedquestions");
                        var rowDiv = origDiv.insertRow();

                        var question = rowDiv.insertCell();
                        question.innerHTML = result.recordset[i]["question"];
                        question.style.padding = "10px";

                        var answer = rowDiv.insertCell();
                        answer.innerHTML = result.recordset[i]["answer"];
                        answer.style.padding = "10px";

                        var value = rowDiv.insertCell();
                        value.innerHTML = result.recordset[i]["question_value"];
                        value.style.padding = "10px";

                        var hint1 = rowDiv.insertCell();
                        hint1.innerHTML = result.recordset[i]["hint1"];
                        hint1.style.padding = "10px";

                        var hint1value = rowDiv.insertCell();
                        hint1value.innerHTML = result.recordset[i]["hint1value"];
                        hint1value.style.padding = "10px";

                        var hint2 = rowDiv.insertCell();
                        hint2.innerHTML = result.recordset[i]["hint2"];
                        hint2.style.padding = "10px";

                        var hint2value = rowDiv.insertCell();
                        hint2value.innerHTML = result.recordset[i]["hint2value"];
                        hint2value.style.padding = "10px";

                        var hint3 = rowDiv.insertCell();
                        hint3.innerHTML = result.recordset[i]["hint3"];
                        hint3.style.padding = "10px";

                        var hint3value = rowDiv.insertCell();
                        hint3value.innerHTML = result.recordset[i]["hint3value"];
                        hint3value.style.padding = "10px";

                        var filename = rowDiv.insertCell();
                        filename.innerHTML = result.recordset[i]["file_name"];
                        filename.style.padding = "10px";
                    }
                }
            })
        }
    });

    $("#currentevents").click(function() {
        document.getElementById("eventcurrents").style.display = "block";
        document.getElementById("createevent").style.display = "none";
        document.getElementById("createquestion").style.display = "none";
        document.getElementById("questioncurrents").style.display = "none";
        document.getElementById("addingquestions").style.display = "none";
        document.getElementById("deleteevent").style.display = "none";
        document.getElementById("deletequestion").style.display = "none";
        document.getElementById("updateevent").style.display = "none";
        document.getElementById("updatequestion").style.display = "none";
        document.getElementById("printteam").style.display = "none";
        document.getElementById("lookupplayer").style.display = "none";

        var origDiv = document.getElementById("futureevents");
        var count = origDiv.rows.length;

        for (var i = 0; i < count; i++) {
            if (i > 1) {
                var row = origDiv.rows[2];
                var body = origDiv.childNodes[1];
                body.removeChild(row);
            }
        }

        $.ajax({
            type: "GET",
            url: ajaxUrlEvents
        }).done(function(result) {
            if (result.recordset.length != 0) {
                for (var i = 0; i < result.recordset.length; i++) {

                    
                    var rowDiv = origDiv.insertRow();
                
                    var name = rowDiv.insertCell();
                    name.innerHTML = result.recordset[i]["event_name"];
                    name.style.padding = "10px";
                    name.id = "updatename" + result.recordset[i]["event_id"];
                    var sDate = rowDiv.insertCell();

                    var d = new Date(result.recordset[i]["start_date"].replace("Z", ""));
                    sDate.innerHTML = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
                    sDate.id = "updatestartdate" + result.recordset[i]["event_id"];
                    sDate.style.padding = "10px";

                    var sTime = rowDiv.insertCell();
                    if (result.recordset[i]["start_time"] === null) {
                        sTime.innerHTML = "NULL";
                    }
                    else {
                        var t = new Date(result.recordset[i]["start_time"].replace("Z", ""));
                        sTime.innerHTML = t.getHours() + ":" + t.getMinutes();
                    }
                    sTime.id = "updatestarttime" + result.recordset[i]["event_id"];
                    sTime.style.padding = "10px";

                    var eDate = rowDiv.insertCell();
                    var d = new Date(result.recordset[i]["end_date"].replace("Z", ""));
                    eDate.innerHTML = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
                    eDate.id = "updateenddate" + result.recordset[i]["event_id"];
                    eDate.style.padding = "10px";

                    var eTime = rowDiv.insertCell();
                    var t = new Date(result.recordset[i]["end_time"].replace("Z", ""));
                    eTime.innerHTML = t.getHours() + ":" + t.getMinutes();
                    eTime.id = "updateendtime" + result.recordset[i]["event_id"];
                    eTime.style.padding = "10px";

                    var excl = rowDiv.insertCell();
                    excl.innerHTML = result.recordset[i]["exclusive_flag"] === true ? "Yes" : "No";
                    excl.id = "updatexcl" + result.recordset[i]["event_id"];
                    excl.style.padding = "10px";

                    var cancel = rowDiv.insertCell();
                    var cancelButton = document.createElement("button");
                    cancelButton.textContent = "Cancel Start";
                    cancelButton.style.backgroundColor = "#000000";
                    cancelButton.id = "cancelbutton" + result.recordset[i]["event_id"];
                    if (sTime.innerHTML === "NULL") {
                        cancelButton.style.display = "none";
                    }
                    cancel.appendChild(cancelButton);

                    var manualButton = document.createElement("button");
                    manualButton.textContent = "Manual Start";
                    manualButton.style.backgroundColor = "#000000";
                    manualButton.id = "manualbutton" + result.recordset[i]["event_id"];
                    if (sTime.innerHTML === "NULL") {
                        manualButton.style.display = "block";
                    }
                    else {
                        manualButton.style.display = "none";
                    }
                    cancel.appendChild(manualButton);

                    $("#cancelbutton" + result.recordset[i]["event_id"]).click(function(e) {
                        var id = e.target.id.split("cancelbutton")[1];
                        var name = $("#updatename" + id).text();
                        var sDate = $("#updatestartdate" + id).text();
                        var sTime = "00:00:00.000";
                        var eDate = $("#updateenddate" + id).text();
                        var eTime = $("#updateendtime" + id).text();
                        var exl = $("#updateexcl" + id).val() === true ? 1 : 0;

                        $.ajax({
                            type: "PUT",
                            url: ajaxUrlEvents,
                            data: '{"ID": "' + id + '", "Name": "' + name + '", "sDate": "' + sDate + '", "sTime": "' + sTime + '", "eDate": "' + eDate 
                            + '", "eTime": "' + eTime + '", "Exclusive": "' + exl + '"}',
                            contentType: "application/json"
                        }).done(function(result) {
                            if (result.recordset[0]["success"] != 0) {
                                document.getElementById("cancelbutton" + id).style.display = "none";
                                document.getElementById("manualbutton" + id).style.display = "block";
                                $("#updatestarttime" + id).text("NULL")
                            }
                            else {
                            }
                        })                                
                    });

                    $("#manualbutton" + result.recordset[i]["event_id"]).click(function(e) {
                        var id = e.target.id.split("manualbutton")[1];
                        var name = $("#updatename" + id).text();
                        var sDate = $("#updatestartdate" + id).text();
                        var now = new Date();
                        var sTime = now.getHours() + ":" + now.getMinutes() + ":00.000";
                        var eDate = $("#updateenddate" + id).text();
                        var eTime = $("#updateendtime" + id).text();
                        var exl = $("#updateexcl" + id).val() === true ? 1 : 0;

                        $.ajax({
                            type: "PUT",
                            url: ajaxUrlEvents,
                            data: '{"ID": "' + id + '", "Name": "' + name + '", "sDate": "' + sDate + '", "sTime": "' + sTime + '", "eDate": "' + eDate 
                            + '", "eTime": "' + eTime + '", "Exclusive": "' + exl + '"}',
                            contentType: "application/json"
                        }).done(function(result) {
                            if (result.recordset[0]["success"] != 0) {
                                document.getElementById("manualbutton" + id).style.display = "none";
                                document.getElementById("cancelbutton" + id).style.display = "block";
                                var sTime = now.getHours() + ":" + now.getMinutes();
                                $("#updatestarttime" + id).text(sTime);
                            }
                            else {
                            }
                        })  
                    })
                }
            }
        })
    });

    $("#submitcreatequestion").click(function() {

        // Get question and validate
        var question = document.getElementById("questiontext").value;

        if (question.includes('"') || question.includes("'") || question.includes('\\')) {
            document.getElementById("createquestionerror").innerHTML = "Your question cannot include single quotes, double quotes, or backslashes.<br/>";
            document.getElementById("createquestionerror").hidden = false;
            document.getElementById("createquestionerror").style.color = "red";
            return false;
        }
        else if (question.length < 1) {
            document.getElementById("createquestionerror").innerHTML = "Your question cannot be empty.<br/>";
            document.getElementById("createquestionerror").hidden = false;
            document.getElementById("createquestionerror").style.color = "red";
            return false;
        }

        // Get answer and validate
        var answer = document.getElementById("questionanswer").value;

        if (answer.includes('"') || answer.includes("'") || answer.includes("\\")){
            document.getElementById("createquestionerror").innerHTML = "Your answer cannot include single quotes, double quotes, or backslashes.<br/>";
            document.getElementById("createquestionerror").hidden = false;
            document.getElementById("createquestionerror").style.color = "red";
            return false;
        }
        else if (answer.length < 1) { 
            document.getElementById("createquestionerror").innerHTML = "Your answer cannot be empty.<br/>";
            document.getElementById("createquestionerror").hidden = false;
            document.getElementById("createquestionerror").style.color = "red";
            return false;
        }

        // Get level
        var levelSel = document.getElementById("questionlevel");
        var levelid = levelSel.selectedOptions[0].id;
        var level = levelid.split("level")[1];

        // Get question value and validate
        var value = document.getElementById("questionvalue").value;

        try {
            var ivalue = parseInt(value);
        }
        catch (e) {
            document.getElementById("createquestionerror").innerHTML = "Your question value must be numeric.<br/>";
            document.getElementById("createquestionerror").hidden = false;
            document.getElementById("createquestionerror").style.color = "red";
            return false;
        }

        if (value.length < 1) {
            document.getElementById("createquestionerror").innerHTML = "Your question value cannot be empty.<br/>";
            document.getElementById("createquestionerror").hidden = false;
            document.getElementById("createquestionerror").style.color = "red";
            return false;
        }

        // Get hints and validate
        var hint1 = document.getElementById("questionhint1").value.length === 0 ? " " : document.getElementById("questionhint1").value;
        var hintvalue1 = document.getElementById("questionhintvalue1").value.length === 0 ? " " : document.getElementById("questionhintvalue1").value;
        var hint2 = document.getElementById("questionhint2").value.length === 0 ? " " : document.getElementById("questionhint2").value;
        var hintvalue2 = document.getElementById("questionhintvalue2").value.length === 0 ? " " : document.getElementById("questionhintvalue2").value;
        var hint3 = document.getElementById("questionhint3").value.length === 0 ? " " : document.getElementById("questionhint3").value;
        var hintvalue3 = document.getElementById("questionhintvalue3").value.length === 0 ? " " : document.getElementById("questionhintvalue3").value;

        if (hint1.includes('"') || hint1.includes("'") || hint1.includes('\\') ||
            hint2.includes('"') || hint2.includes("'") || hint2.includes("\\") ||
            hint3.includes('"') || hint3.includes("'") || hint3.includes("\\")) {
            document.getElementById("createquestionerror").innerHTML = "Your hints cannot include single quotes, double quotes, or backslashes.<br/>";
            document.getElementById("createquestionerror").hidden = false;
            document.getElementById("createquestionerror").style.color = "red";
            return false;
        }
        else if (hint1.length < 2) {
            if (hint2.length < 2 && hint3.length < 2) {
                if (confirm("Are you sure you want to submit the question with no hints?")) {
                    // procede
                } 
                else {
                    return false;
                }
            }
            else {
                document.getElementById("createquestionerror").innerHTML = "You must use hint 1 first.<br/>";
                document.getElementById("createquestionerror").hidden = false;
                document.getElementById("createquestionerror").style.color = "red";
                return false;
            }
        }
        else if (hint1.length > 1) {
            try {
                var ivalue = parseInt(hintvalue1);
            }
            catch (e) {
                document.getElementById("createquestionerror").innerHTML = "Your hint value must be numeric.<br/>";
                document.getElementById("createquestionerror").hidden = false;
                document.getElementById("createquestionerror").style.color = "red";
                return false;
            }

            if (hintvalue1.length < 2) {
                document.getElementById("createquestionerror").innerHTML = "Your hint value cannot be empty.<br/>";
                document.getElementById("createquestionerror").hidden = false;
                document.getElementById("createquestionerror").style.color = "red";
                return false;
            }

            if (hint2.length < 2) {
                if (hint3.length > 1) {
                    document.getElementById("createquestionerror").innerHTML = "You must use hint 2 first.<br/>";
                    document.getElementById("createquestionerror").hidden = false;
                    document.getElementById("createquestionerror").style.color = "red";
                    return false;
                }
            }
            else {
                try {
                    var ivalue = parseInt(hintvalue2);
                }
                catch (e) {
                    document.getElementById("createquestionerror").innerHTML = "Your hint value must be numeric.<br/>";
                    document.getElementById("createquestionerror").hidden = false;
                    document.getElementById("createquestionerror").style.color = "red";
                    return false;
                }
    
                if (hintvalue2.length < 2) {
                    document.getElementById("createquestionerror").innerHTML = "Your hint value cannot be empty.<br/>";
                    document.getElementById("createquestionerror").hidden = false;
                    document.getElementById("createquestionerror").style.color = "red";
                    return false;
                }

                if (hint3.value > 1) {
                    try {
                        var ivalue = parseInt(hintvalue3);
                    }
                    catch (e) {
                        document.getElementById("createquestionerror").innerHTML = "Your hint value must be numeric.<br/>";
                        document.getElementById("createquestionerror").hidden = false;
                        document.getElementById("createquestionerror").style.color = "red";
                        return false;
                    }
        
                    if (hintvalue3.length < 1) {
                        document.getElementById("createquestionerror").innerHTML = "Your hint value cannot be empty.<br/>";
                        document.getElementById("createquestionerror").hidden = false;
                        document.getElementById("createquestionerror").style.color = "red";
                        return false;
                    }
                }
            }
        }

        // Get file name 
        var filename = document.getElementById("questionfile").value.length === 0 ? " " : document.getElementById("questionfile").value;

        var questionid = 0;

        $.ajax({
            type: "POST",
            url: ajaxUrlQuestions,
            data: '{"Question":"' + question + '", "Answer": "' 
                + answer +'", "Value": "' + value + '", "Admin": "' 
                + adminid + '", "Level": "' + level + '"}',
            contentType: "application/json",
        }).done(function(result) {
            if (result.recordset[0]["question_id"] != 0) {
                questionid = result.recordset[0]["question_id"];

                if (hint1 != ' ') {
                    $.ajax({
                        type: "POST",
                        url: ajaxUrlHints,
                        data: '{"Question":"' + questionid + '", "Hint": "' 
                        + hint1 + '", "Value": "' + hintvalue1 + '", "HintID": "' + 1 + '"}',
                        contentType: "application/json"
                    }).done(function(result2) {
                        if (result2.recordset[0]["success"] != 0) {
                        }
                    })
                }
    
                if (hint2 != ' ') {
                    $.ajax({
                        type: "POST",
                        url: ajaxUrlHints,
                        data: '{"Question":"' + questionid + '", "Hint": "' 
                        + hint2 + '", "Value": "' + hintvalue2 + '", "HintID": "' + 2 + '"}',
                        contentType: "application/json"
                    }).done(function(result3) {
                        if(result3.recordset[0]["success"] != 0) {
                        }
                    })
                }
                    
                if (hint3 != ' ') {
                    $.ajax({
                        type: "POST",
                        url: ajaxUrlHints,
                        data: '{"Question":"' + questionid + '", "Hint": "' 
                        + hint3 + '", "Value": "' + hintvalue3 + '", "HintID": "' + 3 + '"}',
                        contentType: "application/json"
                    }).done(function(result4) {
                        if(result4.recordset[0]["success"] != 0) {
                        }
                    })
                }
    
                if (filename != ' ') {
    
                    var formData = new FormData();
                    formData.append("ID", questionid);
                    formData.append("FileName", filename);
                    formData.append("Contents", $('input[type=file]')[0].files[0]);
    
                    $.ajax({
                        type: "POST",
                        url: ajaxUrlFiles,
                        data: formData,
                        contentType: false,
                        processData: false
                    }).done(function(result5) {
                        if (result5.recordset[0]["success"] != 0) {
                            alert("File Saved");
                        }
                    })
                }

                document.getElementById("questiontext").value = "";
                document.getElementById("questionanswer").value = "";
                document.getElementById("questionvalue").value = "";
        
                document.getElementById("questionhint1").value = "";
                document.getElementById("questionhintvalue1").value = "";
                document.getElementById("questionhint2").value = "";
                document.getElementById("questionhintvalue2").value = "";
                document.getElementById("questionhint3").value = "";
                document.getElementById("questionhintvalue3").value = "";
        
                document.getElementById("questionfile").value = "";
                document.getElementById("createquestionerror").hidden = true;
                document.getElementById("questionlevel").selectedIndex = 0;
            }
            else {
                alert("Question creation failed");
            }
        })

    });

    $("#submitcreateevent").click(function() {
        // Get name and validate
        var name = document.getElementById("eventname").value;

        if (name.includes('"') || name.includes("'") || name.includes("\\")) {
            document.getElementById("createeventerror").innerHTML = "Your event name cannot include single quotes, double quotes, or backslashes.<br/>";
            document.getElementById("createeventerror").hidden = false;
            document.getElementById("createeventerror").style.color = "red";
            return false;
        }
        else if (name.length < 1) {
            document.getElementById("createeventerror").innerHTML = "Your event name cannot be empty.<br/>";
            document.getElementById("createeventerror").hidden = false;
            document.getElementById("createeventerror").style.color = "red";
            return false;
        }

        // Get start date and validate
        var sDate = document.getElementById("eventstartdate").value;

        if (sDate.length < 1) {
            document.getElementById("createeventerror").innerHTML = "Your start date cannot be empty.<br/>";
            document.getElementById("createeventerror").hidden = false;
            document.getElementById("createeventerror").style.color = "red";
            return false;
        }

        // Get start time and validate
        var sTime = document.getElementById("eventstarttime").value;

        if (sTime.length < 1) {
            document.getElementById("createeventerror").innerHTML = "Your start time cannot be empty.<br/>";
            document.getElementById("createeventerror").hidden = false;
            document.getElementById("createeventerror").style.color = "red";
            return false;
        }

        // Get end date and validate
        var eDate = document.getElementById("eventenddate").value;

        if (eDate.length < 1) {
            document.getElementById("createeventerror").innerHTML = "Your end date cannot be empty.<br/>";
            document.getElementById("createeventerror").hidden = false;
            document.getElementById("createeventerror").style.color = "red";
            return false;
        }

        // Get end time and validate
        var eTime = document.getElementById("eventendtime").value;

        if (eTime.length < 1) {
            document.getElementById("createeventerror").innerHTML = "Your end time cannot be empty.<br/>";
            document.getElementById("createeventerror").hidden = false;
            document.getElementById("createeventerror").style.color = "red";
            return false;
        }

        var exl = document.getElementById("eventexclusive").checked === true ? 1 : 0;

        $.ajax({
            type: "POST",
            url: ajaxUrlEvents,
            data: '{"Name": "' + name + '", "sDate": "' + sDate + '", "sTime": "' + sTime + '", "eDate": "' + eDate 
            + '", "eTime": "' + eTime + '", "Ex": "' + exl + '"}',
            contentType: "application/json"
        }).done(function(result) {
            if (result.recordset[0]["event_id"] != 0) {
                alert("Event Creation Success");

                document.getElementById("eventname").value = "";
                document.getElementById("eventstartdate").value = "";
                document.getElementById("eventstarttime").value = "";
                document.getElementById("eventenddate").value = "";
                document.getElementById("eventendtime").value = "";
                document.getElementById("eventexclusive").checked = false;
                document.getElementById("createeventerror").hidden = true;
            }
            else {
                alert("Event Creation Failure");
                document.getElementById("createeventerror").hidden = true;
            }
        })
    });   
    
    $("#submitupdatequestion").click(function() {
        // Get question ID
        var id = document.getElementById("questionlabel").value;

        // Get question and validate
        var question = document.getElementById("updatequestiontext").value;

        if (question.includes('"') || question.includes("'") || question.includes("\\")) {
            document.getElementById("updatequestionerror").innerHTML = "Your question cannot contain single quotes, double quotes, or backslashes.<br/>";
            document.getElementById("updatequestionerror").hidden = false;
            document.getElementById("updatequestionerror").style.color = "red";
            return false;
        }
        else if (question.length < 1) {
            document.getElementById("updatequestionerror").innerHTML = "Your question cannot be empty.<br/>";
            document.getElementById("updatequestionerror").hidden = false;
            document.getElementById("updatequestionerror").style.color = "red";
            return false;
        }

        // Get answer and validate
        var answer = document.getElementById("answerupdate").value;

        if (answer.includes('"') || answer.includes("'") || answer.includes("\\")) {
            document.getElementById("updatequestionerror").innerHTML = "Your answer cannot contain single quotes, double quotes, or backslashes.<br/>";
            document.getElementById("updatequestionerror").hidden = false;
            document.getElementById("updatequestionerror").style.color = "red";
            return false;
        }
        else if (answer.length < 1) {
            document.getElementById("updatequestionerror").innerHTML = "Your answer cannot be empty.<br/>";
            document.getElementById("updatequestionerror").hidden = false;
            document.getElementById("updatequestionerror").style.color = "red";
            return false;
        }

        // Get level
        var level = document.getElementById("levelupdate").selectedIndex + 1;
    
        // Get value and validate
        var value = document.getElementById("valueupdate").value;

        try {
            var ivalue = parseInt(value);
        }
        catch (e) {
            document.getElementById("updatequestionerror").innerHTML = "Your question value must be numeric.<br/>";
            document.getElementById("updatequestionerror").hidden = false;
            document.getElementById("updatequestionerror").style.color = "red";
            return false;
        }

        // Get hints and validate
        var hint1 = document.getElementById("hint1update").value;
        var hint1value = document.getElementById('hint1valueupdate').value;
        var hint2 = document.getElementById('hint2update').value;
        var hint2value = document.getElementById("hint2valueupdate").value;
        var hint3 = document.getElementById('hint3update').value;
        var hint3value = document.getElementById('hint3valueupdate').value;

        if (hint1 === "") {
            hint1value = 0;
        }
        if (hint2 === "") {
            hint2value = 0;
        }
        if (hint3 === "") {
            hint3value = 0;
        }

        if (hint1.includes('"') || hint1.includes("'") || hint1.includes('\\') ||
            hint2.includes('"') || hint2.includes("'") || hint2.includes("\\") ||
            hint3.includes('"') || hint3.includes("'") || hint3.includes("\\")) {
            document.getElementById("updatequestionerror").innerHTML = "Your hints cannot include single quotes, double quotes, or backslashes.<br/>";
            document.getElementById("updatequestionerror").hidden = false;
            document.getElementById("updatequestionerror").style.color = "red";
            return false;
        }
        else if (hint1.length < 1) {
            if (hint2.length < 1 && hint3.length < 1) {
                if (confirm("Are you sure you want to submit the question with no hints?")) {
                    // procede
                } 
                else {
                    return false;
                }
            }
            else {
                document.getElementById("updatequestionerror").innerHTML = "You must use hint 1 first.<br/>";
                document.getElementById("updatequestionerror").hidden = false;
                document.getElementById("updatequestionerror").style.color = "red";
                return false;
            }
        }
        else if (hint1.length > 0) {
            try {
                var ivalue = parseInt(hint1value);
            }
            catch (e) {
                document.getElementById("updatequestionerror").innerHTML = "Your hint value must be numeric.<br/>";
                document.getElementById("updatequestionerror").hidden = false;
                document.getElementById("updatequestionerror").style.color = "red";
                return false;
            }

            if (hint1value.length < 1) {
                document.getElementById("updatequestionerror").innerHTML = "Your hint value cannot be empty.<br/>";
                document.getElementById("updatequestionerror").hidden = false;
                document.getElementById("updatequestionerror").style.color = "red";
                return false;
            }

            if (hint2.length < 1) {
                if (hint3.length > 0) {
                    document.getElementById("updatequestionerror").innerHTML = "You must use hint 2 first.<br/>";
                    document.getElementById("updatequestionerror").hidden = false;
                    document.getElementById("updatequestionerror").style.color = "red";
                    return false;
                }
            }
            else {
                try {
                    var ivalue = parseInt(hint2value);
                }
                catch (e) {
                    document.getElementById("updatequestionerror").innerHTML = "Your hint value must be numeric.<br/>";
                    document.getElementById("updatequestionerror").hidden = false;
                    document.getElementById("updatequestionerror").style.color = "red";
                    return false;
                }
    
                if (hint2value.length < 1) {
                    document.getElementById("updatequestionerror").innerHTML = "Your hint value cannot be empty.<br/>";
                    document.getElementById("updatequestionerror").hidden = false;
                    document.getElementById("updatequestionerror").style.color = "red";
                    return false;
                }

                if (hint3.value > 0) {
                    try {
                        var ivalue = parseInt(hint3value);
                    }
                    catch (e) {
                        document.getElementById("updatequestionerror").innerHTML = "Your hint value must be numeric.<br/>";
                        document.getElementById("updatequestionerror").hidden = false;
                        document.getElementById("updatequestionerror").style.color = "red";
                        return false;
                    }
        
                    if (hint3value.length < 1) {
                        document.getElementById("updatequestionerror").innerHTML = "Your hint value cannot be empty.<br/>";
                        document.getElementById("updatequestionerror").hidden = false;
                        document.getElementById("updatequestionerror").style.color = "red";
                        return false;
                    }
                }
            }
        }


        $.ajax({
            type: "PUT",
            url: ajaxUrlQuestions,
            data: '{"ID": "' + id + '", "Question": "' + question + '", "Answer": "' + answer + '", "Level": "' + level + '", "Value": "' + value + '", "Hint1": "' + hint1 + '", "HintValue1": "'
            + hint1value + '", "Hint2": "' + hint2 + '", "HintValue2": "' + hint2value + '", "Hint3": "' + hint3 + '", "HintValue3": "' + hint3value + '"}',
            contentType: "application/json"
        }).done(function(result) {
            if (result.recordset[0]["success"] != 0) {
                alert("Question updated successfully");

                document.getElementById("questionupdate").value = "";
                document.getElementById("answerupdate").value = "";
                document.getElementById("levelupdate").selectedIndex = 0;
                document.getElementById("valueupdate").value = "";
                document.getElementById("hint1update").value = "";
                document.getElementById("hint1valueupdate").value = "";
                document.getElementById("hint2update").value = "";
                document.getElementById('hint2valueupdate').value = "";
                document.getElementById("hint3update").value = "";
                document.getElementById("hint3valueupdate").value = "";
                document.getAnimations("updatequestionerror").hidden = true;
            }
            else {
                alert("Question update failure");
                document.getAnimations("updatequestionerror").hidden = true;
            }
        })
    });

    $("#submitupdateevent").click(function() {
        // Get event ID
        var id = document.getElementById("eventlabel").value;

        // Get name and validate
        var name = document.getElementById("updatename").value;

        if (name.includes('"') || name.includes("'") || name.includes("\\")) {
            document.getElementById("updateeventerror").innerHTML = "Your event name cannot include single quotes, double quotes, or backslashes.<br/>";
            document.getElementById("updateeventerror").hidden = false;
            document.getElementById("updateeventerror").style.color = "red";
            return false;
        }
        else if (name.length < 1) {
            document.getElementById("updateeventerror").innerHTML = "Your event name cannot be empty.<br/>";
            document.getElementById("updateeventerror").hidden = false;
            document.getElementById("updateeventerror").style.color = "red";
            return false;
        }

        // Get start date and validate
        var sDate = document.getElementById("updatestartdate").value;

        if (sDate.length < 1) {
            document.getElementById("updateeventerror").innerHTML = "Your start date cannot be empty.<br/>";
            document.getElementById("updateeventerror").hidden = false;
            document.getElementById("updateeventerror").style.color = "red";
            return false;
        }

        // Get start time and validate
        var sTime = document.getElementById("updatestarttime").value;

        if (sTime.length < 1) {
            document.getElementById("updateeventerror").innerHTML = "Your start time cannot be empty.<br/>";
            document.getElementById("updateeventerror").hidden = false;
            document.getElementById("updateeventerror").style.color = "red";
            return false;
        }

        // Get end date and validate
        var eDate = document.getElementById("updateenddate").value;

        if (eDate.length < 1) {
            document.getElementById("updateeventerror").innerHTML = "Your end date cannot be empty.<br/>";
            document.getElementById("updateeventerror").hidden = false;
            document.getElementById("updateeventerror").style.color = "red";
            return false;
        }

        // Get end time and validate
        var eTime = document.getElementById("updateendtime").value;

        if (eTime.length < 1) {
            document.getElementById("updateeventerror").innerHTML = "Your end time cannot be empty.<br/>";
            document.getElementById("updateeventerror").hidden = false;
            document.getElementById("updateeventerror").style.color = "red";
            return false;
        }

        // Get exclusivity
        var exl = document.getElementById("updatexclusive").checked === true ? 1 : 0;

        $.ajax({
            type: "PUT",
            url: ajaxUrlEvents,
            data: '{"ID": "' + id + '", "Name": "' + name + '", "sDate": "' + sDate + '", "sTime": "' + sTime + '", "eDate": "' + eDate 
            + '", "eTime": "' + eTime + '", "Exclusive": "' + exl + '"}',
            contentType: "application/json"
        }).done(function(result) {
            if (result.recordset[0]["success"] != 0) {
                alert("Event updated successfully");

                document.getElementById("updatename").value = "";
                document.getElementById("updatestartdate").value = "";
                document.getElementById("updatestarttime").value = "";
                document.getElementById("updateenddate").value = "";
                document.getElementById("updateendtime").value = "";
                document.getElementById("updateexclusive").checked = false;
                document.getElementById("updateeventerror").hidden = true;
            }
            else {
                alert("Event update failed");
                document.getElementById("updateeventerror").hidden = true;
            }
        })
    });

    $("#submitdeleteevent").click(function() {
        var selectBox = document.getElementById("eventdeletes");

        for (var i = 0; i < selectBox.selectedOptions.length; i++) {
            var eventid = selectBox.selectedOptions[i].value;
            var index = selectBox.selectedOptions[i].index;

            $.ajax({
                type: "DELETE",
                url: ajaxUrlEvents,
                data: '{"ID": "' + eventid + '"}',
                contentType: "application/json",
                async: false
            }).done(function(result) {
                if (result.recordset[0]["success"] != 0) {
                    selectBox.remove(index);
                }
            })
        }
    });

    $("#submitdeletequestion").click(function() {
        var selectBox = document.getElementById("questiondeletes");

        for (var i = 0; i < selectBox.selectedOptions.length; i++) {
            var eventid = selectBox.selectedOptions[i].value;
            var index = selectBox.selectedOptions[i].index;

            $.ajax({
                type: "DELETE",
                url: ajaxUrlQuestions,
                data: '{"ID": "' + eventid + '"}',
                contentType: "application/json",
                async: false
            }).done(function(result) {
                if (result.recordset[0]["success"] != 0) {
                    selectBox.remove(index);
                }
            })
        }
    });
    
    $("#addbutton").click(function() {
        var selectBox = document.getElementById("availablequestions"); 
        var selectBox2 = document.getElementById("questionsadded");   

        var count = selectBox.selectedOptions.length;            
        for (var i = 0; i < count; i++) {

            var questionid = selectBox.selectedOptions[0].id;
            var value = selectBox.selectedOptions[0].text.split("-")[1].trim().replace(" points", "");
            var index = selectBox.selectedOptions[0].index;

            $.ajax({
                type: "PUT",
                url: ajaxUrlEventQuestions,
                data: '{"EventID": "' + eventid + '", "QuestionID": "' + questionid + '", "Value": "' + value + '", "Solved": "0"}',
                contentType: "application/json",
                async: false
            }).done(function(result) {
                if (result.recordset[0]["success"] === 1) {
                    var option = selectBox.selectedOptions[0];
                    option.textContent = option.textContent.split(" - ")[0];
                    selectBox.remove(index);
                    selectBox2.appendChild(option);
                }
            })
        }
    });

    $("#removebutton").click(function() {
        var selectBox = document.getElementById("questionsadded");
        var selectBox2 = document.getElementById("availablequestions");
        for (var i = 0; i < selectBox.selectedOptions.length; i++) {
            var questionid = selectBox.selectedOptions[i].value;
            var index = selectBox.selectedOptions[i].index;

            $.ajax({
                type: "DELETE",
                url: ajaxUrlEventQuestions,
                data: '{"EventID": "' + eventid + '", "QuestionID": "' + questionid + '"}',
                contentType: "application/json",
                async: false
            }).done(function(result) {
                if (result.recordset[0]["success"] === 1) {
                    selectBox.remove(index);

                    $("#availablequestions").empty();
                    
                    $.ajax({
                        type: "GET",
                        url: ajaxUrlQuestions,
                        async: false
                    }).done(function(result) {
                        if (result.recordset.length != 0) {
                            var origDiv = document.getElementById("availablequestions");
                            var otherDiv = document.getElementById("questionsadded");

                            for (var i = 0; i < result.recordset.length; i++) {
                                var rowDiv = document.createElement("option");
                                rowDiv.textContent = result.recordset[i]["question"] + " - " + result.recordset[i]["question_value"] + " points";
                                rowDiv.setAttribute("id", result.recordset[i]["question_id"]);

                                var index = -1;
                                
                                for (var j = 0; j < otherDiv.options.length; j++) {
                                    if (otherDiv.options[j].value === rowDiv.id.toString()) {
                                        index = otherDiv.options[j].index;
                                        break;
                                    }
                                }

                                if (index === -1) {
                                    origDiv.appendChild(rowDiv);
                                }
                                
                            }

                            if (result.recordset.length > 5) {
                                origDiv.setAttribute("size", result.recordset.length);
                            }
                        }
                    })
                }
            })
        }
    });

    $("#submitprint").click(function() {
        var selectBox = document.getElementById("printoptions");
        for (var i = 0; i < selectBox.selectedOptions.length; i++) {
            var event = selectBox.selectedOptions[i].value;

            $.ajax({
                type: "POST",
                url: ajaxUrlPrintScores,
                data: '{"EventID": "' + event + '"}',
                contentType: "application/json"
            }).done(function(result) {
                if (result.recordsets.length > 0) {

                    var table = document.createElement("table");
                    table.id = "printtable";
                    table.border = 1;
                    //table.style.textAlign = "center";

                    var row = table.insertRow();
                    var cell = row.insertCell();
                    cell.innerHTML = "Event Data";
                    cell.colSpan = 4;
                    cell.style.padding = "5px";
                    cell.style.textAlign = "center";

                    row = table.insertRow();
                    cell = row.insertCell();
                    cell.innerHTML = "Event Name";
                    cell.colSpan = 3;
                    cell.style.padding = "5px";
                    cell.style.textAlign = "center";
                    cell = row.insertCell();
                    cell.innerHTML = "Start Date";
                    cell.style.padding = "5px";
                    cell.style.textAlign = "center";

                    var dstart = new Date(result.recordset[0]["start_date"].replace("Z", ""));

                    var day = ("0" + dstart.getDate()).slice(-2);
                    var month = ("0" + (dstart.getMonth() + 1)).slice(-2);

                    dstart = dstart.getFullYear() + "-" + month + "-" + day;

                    row = table.insertRow();
                    cell = row.insertCell();
                    cell.innerHTML = result.recordset[0]["event_name"];
                    cell.colSpan = 3;
                    cell.style.padding = "5px";
                    cell.style.textAlign = "center";
                    cell = row.insertCell();
                    cell.innerHTML = dstart;
                    cell.style.padding = "5px";
                    cell.style.textAlign = "center";

                    row = table.insertRow();
                    cell = row.insertCell();
                    cell.colSpan = 4;
                    cell.style.height = "30px";

                    row = table.insertRow();
                    cell = row.insertCell();
                    cell.innerHTML = "Team Data";
                    cell.colSpan = 4;
                    cell.style.padding = "5px";
                    cell.style.textAlign = "center";

                    row = table.insertRow();
                    cell = row.insertCell();
                    cell.innerHTML = "Team Name";
                    cell.style.padding = "5px";
                    cell.style.textAlign = "center";
                    cell = row.insertCell();
                    cell.innerHTML = "Team Score";
                    cell.style.padding = "5px";
                    cell.style.textAlign = "center";
                    cell = row.insertCell();
                    cell.innerHTML = "Player";
                    cell.style.padding = "5px";
                    cell.style.textAlign = "center";
                    cell = row.insertCell();
                    cell.innerHTML = "Email";
                    cell.style.padding = "5px;"
                    cell.style.textAlign = "center";


                    for (var j = 0; j < result.recordset.length; j++) {
                        row = table.insertRow();
                        cell = row.insertCell();
                        cell.innerHTML = result.recordset[j]["team_name"];
                        cell.style.padding = "5px";

                        cell = row.insertCell();
                        cell.innerHTML = result.recordset[j]["current_score"];
                        cell.style.padding = "5px";
                        
                        cell = row.insertCell();
                        cell.innerHTML = result.recordset[j]["player_name"];
                        cell.style.padding = "5px";

                        cell = row.insertCell();
                        cell.innerHTML = result.recordset[i]["player_email"];
                        cell.style.padding = "5px";
                    }

                    var newWin = window.open("");
                    newWin.document.write(table.outerHTML);
                }
                else {
                    alert("No event data");
                }
            })

            break;
        }
    });

    $("#submitlookup").click(function() {
        // Get player value and validate
        var player = document.getElementById("playername").value.toUpperCase();

        if (player.includes("'") || player.includes('"') || player.includes("\\")) {
            document.getElementById("lookupplayererror").innerHTML = "The player name or email cannot include single quotes, double quotes, or backslashes.<br/>";
            document.getElementById("lookupplayererror").hidden = false;
            document.getElementById("lookupplayererror").style.color = "red";
            return false;
        }
        else if (player.length < 1) {
            document.getElementById("lookupplayererror").innerHTML = "The player name or email cannot be empty.<br/>";
            document.getElementById("lookupplayererror").hidden = false;
            document.getElementById("lookupplayererror").style.color = "red";
            return false;
        }

        var origDiv = document.getElementById("playerdata");
        var count = origDiv.rows.length;

        for (var i = 0; i < count; i++) {
            if (i > 0) {
                var row = origDiv.rows[1];
                var body = origDiv.childNodes[1];
                body.removeChild(row);
            }
        }

        $.ajax({
            type: "POST",
            url: ajaxUrlPlayers,
            data: '{"Player": "' + player + '"}',
            contentType: "application/json"
        }).done(function(result) {
            if (result.recordsets.length > 0) {
                for (var i = 0; i < result.recordset.length; i++) {
                    var row = origDiv.insertRow();

                    var cell = row.insertCell();
                    cell.innerHTML = result.recordset[i]["event_name"];
                    cell.style.padding = "5px";
                    
                    if (result.recordset[i]["start_date"] != null) {
                        var dstart = new Date(result.recordset[i]["start_date"].replace("Z", ""));

                        var day = ("0" + dstart.getDate()).slice(-2);
                        var month = ("0" + (dstart.getMonth() + 1)).slice(-2);

                        dstart = dstart.getFullYear() + "-" + month + "-" + day;

                        cell = row.insertCell();
                        cell.innerHTML = dstart;
                        cell.style.padding = "5px";
                    }
                    else {
                        cell = row.insertCell();
                        cell.style.padding = "5px";
                    }

                    cell = row.insertCell();
                    cell.innerHTML = result.recordset[i]["team_name"];
                    cell.style.padding = "5px";
                    
                    cell = row.insertCell();
                    cell.innerHTML = result.recordset[i]["current_score"];
                    cell.style.padding = "5px";

                    cell = row.insertCell();
                    cell.innerHTML = result.recordset[i]["rank"];
                    cell.style.padding = "5px";
                }

                document.getElementById("lookupplayererror").hidden = true;
            }
            else {
                alert("No player data");
                document.getElementById("lookupplayererror").hidden = true;
                document.getElementById("playername").value = "";
            }
        })
    });
});
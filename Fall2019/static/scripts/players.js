$(document).ready(function() {
    const ajaxUrl = "/api/players";
    const ajaxUrlEvent = "/api/currentevent";
    const gotoUrlTeam = "/dashboard.html";
    const gotoUrlWait = "/wait.html";
    
    const teamid = sessionStorage.getItem("teamid"); 

    var selectedPlayer = "";

    $("#btnSubmit").click(function() {
        var name = document.getElementById("tbName").value;
        var email = document.getElementById("tbEmail").value;

        if (name.includes('"') || name.includes("'") || name.includes("\\")) {
            document.getElementById("playererror").innerHTML = "Your player's name cannot contain single quotes, double quotes, or backslashes.<br/>";
            document.getElementById("playererror").hidden = false;
            return false;
        }
        else if (name.length < 1) {
            document.getElementById("playererror").innerHTML = "Your player's name cannot be empty.<br/>";
            document.getElementById("playererror").hidden = false;
            return false;
        }

        if (email.includes('"') || email.includes("'") || email.includes("\\")) {
            document.getElementById("playererror").innerHTML = "Your player's email cannot contain single quotes, double quotes, or backslashes.<br/>";
            document.getElementById("playererror").hidden = false;
            return false;
        }
        else if (email.length < 1) {
            document.getElementById("playererror").innerHTML = "Your player's email cannot be empty.<br/>";
            document.getElementById("playererror").hidden = false;
            return false;
        }

        var confirm = window.confirm("Are these the correct values?\nName: " + name + "\nEmail: " + email);
        if (confirm == true) {

            $.ajax({
                type: "PUT",
                url: ajaxUrl,
                data: '{"ID":' + teamid + ', "Player": "' + name +'", "Active": 1, "Email": "' + email + '"}',
                contentType: "application/json"
            }).done(function(result) {
                if (result.recordset[0]["player_id"] != 0) {
                    
                    $.ajax({
                        type: "POST",
                        url: ajaxUrl,
                        data: '{"ID":' + teamid + '}',
                        contentType: "application/json"
                    }).done(function(result) {
                        if (result.recordsets.length != 0) {
                            for (var i = 0; i < result.recordset.length; i++) {
                                var list = document.getElementById("lbPlayers");
                                var listitem = document.createElement("li");
                                var listlink = document.createElement("a");
                                listlink.textContent = result.recordset[i]["player_name"];
                                listlink.setAttribute("href", "javascript:;");
                                listlink.setAttribute("ID", result.recordset[i]["player_email"]);
                                listlink.style.color = "rgb(24, 163, 113)";

                                listitem.appendChild(listlink);

                                var existing = list.getElementsByTagName("li");
                                
                                var match = false;
                                for (var x = 0; x < existing.length; x++) {
                                    if (existing[x].innerHTML === listitem.innerHTML) {
                                        match = true;
                                        break;
                                    }
                                }

                                if (!match) {
                                    list.appendChild(listitem);
                                }
                            }
                        }
                    })
                    
                    document.getElementById("btnSubmit").disabled = false;
                    document.getElementById("tbName").value = "";
                    document.getElementById("tbEmail").value = "";
                }
                else {
                    alert("Player already exists");
                    document.getElementById("btnSubmit").disabled = false;
                }
            });
        }
    });

    $("#btnDelete").click(function() {
        document.getElementById("btnDelete").disabled = true;

        var name = document.getElementById("tbName").value;
        var email = document.getElementById("tbEmail").value;

        $.ajax({
            type: "PUT",
            url: ajaxUrl,
            data: '{"ID":' + teamid + ', "Player": "' + name +'", "Active": 0, "Email": "' + email + '"}',
 
            contentType: "application/json"
        }).done(function(result) {
            if (result.recordset[0]["player_id"] != 0) {
                
                $.ajax({
                    type: "POST",
                    url: ajaxUrl,
                    data: '{"ID":' + teamid + '}',
                    contentType: "application/json"
                }).done(function(result) {
                    if (result.recordsets.length != 0) {
                        $("#lbPlayers").empty();
                        for (var i = 0; i < result.recordset.length; i++) {
                            var list = document.getElementById("lbPlayers");
                            var listitem = document.createElement("li");
                            var listlink = document.createElement("a");
                            listlink.textContent = result.recordset[i]["player_name"];
                            listlink.setAttribute("href", "javascript:;");
                            listlink.setAttribute("ID", result.recordset[i]["player_email"]);

                            listitem.appendChild(listlink);

                            var existing = list.getElementsByTagName("li");
                            
                            var match = false;
                            for (var x = 0; x < existing.length; x++) {
                                if (existing[x].innerHTML === listitem.innerHTML) {
                                    match = true;
                                    break;
                                }
                            }

                            if (!match) {
                                list.appendChild(listitem);
                            }
                        }
                    }
                })
                document.getElementById("btnDelete").disabled = false;
                document.getElementById("tbName").value = "";
                document.getElementById("tbEmail").value = "";
            }
            else {
                alert("Player delete failure");
                document.getElementById("btnDelete").disabled = false;
            }
        });
    });

    $("#btnFinish").click(function() {
        $.ajax({
            type: "GET",
            url: ajaxUrlEvent,
            async: false
        }).done(function(result2) {
            if (result2.recordset[0].length > 0) {
                if (result2.recordset[0]["event_id"] > 0) {

                    sessionStorage.setItem("eventid", result2.recordset[0]["event_id"]);

                    if (result2.recordset[0]["start_time"] != null) {

                        var today = new Date();
                        var sDate = new Date(result2.recordset[0]["start_date"].replace("Z", ""));
                        var sTime = new Date(result2.recordset[0]["start_time"].replace("Z", ""));
                        var eDate = new Date(result2.recordset[0]["end_date"].replace("Z",""));
                        var eTime = new Date(result2.recordset[0]["end_time"].replace("Z",""));

                        sDate.setHours(sTime.getHours());
                        sDate.setMinutes(sTime.getMinutes());
                        sDate.setSeconds(sTime.getSeconds());
                        eDate.setHours(eTime.getHours());
                        eDate.setMinutes(eTime.getMinutes());
                        eDate.setSeconds(eTime.getSeconds());

                        sessionStorage.setItem("eventid", result2.recordset[0]["event_id"]);

                        if (today >= sDate &&
                            today <= eDate) {
                            
                            window.location.replace(gotoUrlTeam);
                        }
                        else {
                            window.location.replace(gotoUrlWait);
                        }   
                    }
                    else {
                        window.location.replace(gotoUrlWait);
                    }
                }
                else {
                    window.location.replace(gotoUrlWait);
                }
            }
            else {
                alert("No event created");
            }
        })
    });

    document.querySelector("body").addEventListener("click", function(e) {
        var anchor = e.target.closest('a');
        if (anchor !== null) {
            document.getElementById("tbName").value = anchor.textContent;
            document.getElementById("tbEmail").value = anchor.id;
        }
    });
});
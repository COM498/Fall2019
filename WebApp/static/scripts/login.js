$(document).ready(function() {
    //ajax urls
    const ajaxUrl = "/api/login";
    const ajaxUrlEvent = "/api/currentevent";
    const ajaxUrlLogin = "/login";

    //navigation urls
    const gotoUrlAdmin = "/admin.html";
    const gotoUrlTeam = "/dashboard.html";
    const gotoUrlRegister = "/register.html";
    const gotoUrlWait = "/wait.html";
    const gotoUrlScore = "/scoreboard.html";
    const gotoUrlAbout = "/about.html";

    var input = document.getElementById("tbPassword");

    //captures Enter Key press 
    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("btnLogin").click();
        }
    });

    //verifies username and password against database
    $("#btnLogin").click(function() {
        var user = document.getElementById("tbUsername").value;
        var pass = document.getElementById("tbPassword").value;

        $.ajax({
            type: "POST",
            url: ajaxUrl,
            data: '{"Username":"' + user + '", "Pwd": "' + pass + '"}',
            contentType: "application/json",
            async: false
        }).done(function(result) {
            if (result.recordset[0]["success"] == 2) {
                sessionStorage.setItem("adminid", result.recordset[0]["id"]);

                $.ajax({
                    type: "POST",
                    url: ajaxUrlLogin,
                    data: '{"username": "' + user + '"}',
                    contentType: "application/json"
                }).done(function(result) {
                    console.log(result);
                });

                window.location.replace(gotoUrlAdmin);
            }
            else if (result.recordset[0]["success"] == 1) {

                $.ajax({
                    type: "POST",
                    url: ajaxUrlLogin,
                    data: '{"username": "' + user + '"}',
                    contentType: "application/json",
                    async: false
                }).done(function(result) {
                    console.log(result);
                });

                //checks the status of next event and redirects appropriately
                $.ajax({
                    type: "GET",
                    url: ajaxUrlEvent,
                    async: false
                }).done(function(result2) {
                    if (result2.recordset[0]["event_id"] > 0) {

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

                            sessionStorage.setItem("teamid", result.recordset[0]["id"]);
                            sessionStorage.setItem("eventid", result2.recordset[0]["event_id"]);

                            if (today >= sDate &&
                                today <= eDate) {
                                
                                window.location.href = gotoUrlTeam;
                            }
                            else {
                                window.location.href = gotoUrlWait;
                            }
                        }
                        else {
                            sessionStorage.setItem("teamid", result.recordset[0]["id"]);
                            sessionStorage.setItem("eventid", result2.recordset[0]["event_id"]);
                            window.location.href = gotoUrlWait;
                        }
                    }
                })
            }
            else {
                alert("You do not have an account");
            }
        });
    });

    //redirects to team registration page
    $("#btnRegister").click(function() {
        window.location.href = gotoUrlRegister;
    });

    //redirects to scoreboard
    $("#btnScore").click(function() {
        window.location.href = gotoUrlScore;
    });

    //redirects to about page
    $("#btnAbout").click(function() {
        window.location.href = gotoUrlAbout;
    });
});
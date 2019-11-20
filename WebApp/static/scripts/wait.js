var waiting = true;

$(document).ready(function() {
    
    const ajaxUrlEvent = "/api/currentevent";
    const ajaxUrlSession = "/session";
    const ajaxUrlLogout = "/logout";
    const ajaxUrlPlayes = "/api/players";
    var gotoUrlDash = "/dashboard.html";
    var gotoUrlLogout = "/index.html";
    var gotoUrlPlayers = "/players.html";

    var teamid = sessionStorage.getItem("teamid");

    document.getElementById("players").onclick = function() {
        window.location.href = gotoUrlPlayers;
    }

    $.ajax({
        type: "POST",
        url: ajaxUrlPlayes,
        data: '{"ID": "' + teamid + '"}',
        contentType: "application/json",
        async: false
    }).done(function(result) {
        if (result.recordset.length == 0) {
            alert("You have no players on your team. Please add at least one player.");
            window.location.href = gotoUrlPlayers;
        }
    });

    var eventid;
    var countDownDate = new Date();
    $.ajax({
        type: "GET",
        url: ajaxUrlEvent
    }).done(function(result) {
        if (result.recordset[0]["event_id"] > 0) {
            eventid = result.recordset[0]["event_id"];
            
            if (result.recordset[0]["start_time"] != null) {
                eventid = result.recordset[0]["event_id"];
                var sDate = new Date(result.recordset[0]["start_date"].replace("Z",""));
                var sTime = new Date(result.recordset[0]["start_time"].replace("Z", ""));

                sDate.setHours(sTime.getHours());
                sDate.setMinutes(sTime.getMinutes());
                sDate.setSeconds(sTime.getSeconds());

                countDownDate = sDate;

                sessionStorage.setItem("eventid", result.recordset[0]["event_id"]);
                waiting = false;
            }
        }
    })

    $.ajax({
        type: "GET",
        url: ajaxUrlSession
    }).done(function(result) {
        if (result === "OK") {
        }
        else {
            alert("You are no longer logged in. Please log in again. You will be taken straight to the dashboard.");
            sessionStorage.clear();
            $.ajax({
                type: "GET",
                url: ajaxUrlLogout
            }).done(function(result2) {
                window.location.replace(gotoUrlLogout);
            })
        }
    })

    if (!waiting) {
        countDownDate = countDownDate.getTime();
    }

    var x = setInterval(function() {

        if (!waiting) {
            var now = new Date().getTime();
            var distance = countDownDate - now;
                
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
            document.getElementById("txt").innerHTML = days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ";
                
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("txt").innerHTML = "LOADING...";

                $.ajax({
                    type: "GET",
                    url: ajaxUrlSession
                }).done(function(result) {
                    if (result === "OK") {
                        window.location.replace(gotoUrlDash);
                    }
                    else {
                        alert("You are no longer logged in. Please log in again. You will be taken straight to the dashboard.");
                        sessionStorage.clear();
                        $.ajax({
                            type: "GET",
                            url: ajaxUrlLogout
                        }).done(function(result2) {
                            window.location.replace(gotoUrlLogout);
                        })
                    }
                })
            }
        }
        else {
            document.getElementById("txt").innerHTML = "Waiting for start...";
            loadevent();
        }
    }, 1000);

});

function loadevent() {
    const ajaxUrlEvent = "http://localhost:8080/api/currentevent";
    var gotoUrlDash = "http://localhost:8080/dashboard.html";

    var eventid;
    var countDownDate = new Date();
    $.ajax({
        type: "GET",
        url: ajaxUrlEvent
    }).done(function(result) {
        if (result.recordset[0]["event_id"] > 0) {
            eventid = result.recordset[0]["event_id"];
            
            if (result.recordset[0]["start_time"] != null) {
                eventid = result.recordset[0]["event_id"];
                var sDate = new Date(result.recordset[0]["start_date"].replace("Z",""));
                var sTime = new Date(result.recordset[0]["start_time"].replace("Z", ""));

                sDate.setHours(sTime.getHours());
                sDate.setMinutes(sTime.getMinutes());
                sDate.setSeconds(sTime.getSeconds());

                countDownDate = sDate;

                sessionStorage.setItem("eventid", result.recordset[0]["event_id"]);
                waiting = false;
            }
        }
    })

    if (!waiting) {
        countDownDate = countDownDate.getTime();
    }
}
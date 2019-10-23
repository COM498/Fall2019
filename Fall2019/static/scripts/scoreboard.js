$(document).ready(function() {

    const ajaxUrlEvents = "/api/currentevent";
    const ajaxUrlScore = "/api/scoreboard";

    var origDiv = document.getElementById("scoreboard");
    var count = origDiv.rows.length;
    var event;

    for (var i = 0; i < count; i++) {
        if (i > 0) {
            var row = origDiv.rows[1];
            var body = origDiv.childNodes[1];
            body.removeChild(row);
        }
    }

    $.ajax({
      type: "GET",
      url: ajaxUrlEvents,
      async: false
    }).done(function(result) {
      if (result.recordset[0]["event_id"] != 0) {
        event = result.recordset[0]["event_id"];
        $.ajax({
          type: "POST",
          url: ajaxUrlScore,
          data: '{"EventID": "' + event + '"}',
          contentType: "application/json",
          async: false
        }).done(function(result) {
          if (result.recordset.length > 0) {
            for (var i = 0; i < result.recordset.length; i++) {
              var origDiv = document.getElementById("scoreboard");

              var tr = origDiv.insertRow();
              var td = tr.insertCell();
              td.innerHTML = result.recordset[i]["team_name"];
              td.id = "name" + result.recordset[i]["team_id"];

              td = tr.insertCell();
              td.innerHTML = result.recordset[i]["level1solved"] + " / " + result.recordset[i]["level1total"];
              td.id = "level1" + result.recordset[i]["team_id"];

              td = tr.insertCell();
              td.innerHTML = result.recordset[i]["level2solved"] + " / " + result.recordset[i]["level2total"];
              td.id = "level2" + result.recordset[i]["team_id"];

              td = tr.insertCell();
              td.innerHTML = result.recordset[i]["level3solved"] + " / " + result.recordset[i]["level3total"];
              td.id = "level3" + result.recordset[i]["team_id"];

              td = tr.insertCell();
              td.innerHTML = result.recordset[i]["level4solved"] + " / " + result.recordset[i]["level4total"];
              td.id = "level4" + result.recordset[i]["team_id"];

              td = tr.insertCell();
              td.innerHTML = result.recordset[i]["level5solved"] + " / " + result.recordset[i]["level5total"];
              td.id = "level5" + result.recordset[i]["team_id"];

              td = tr.insertCell();
              td.innerHTML = result.recordset[i]["attempts"];
              td.id = "attempts" + result.recordset[i]["team_id"];

              td = tr.insertCell();
              td.innerHTML = result.recordset[i]["solved"];
              td.id = "solved" + result.recordset[i]["team_id"];

              td = tr.insertCell();
              td.innerHTML = result.recordset[i]["current_score"];
              td.id = "score" + result.recordset[i]["team_id"];
            }
          }
        });
      }
    });

    (function poll(){
    setTimeout(function(){
      $.ajax({
          type: "POST",
          url: ajaxUrlScore,
          data: '{"EventID": "' + event + '"}',
          contentType: "application/json",
          async: false
        }).done(function(result) {
          if (result.recordset.length > 0) {

            var origDiv = document.getElementById("scoreboard");
            var count = origDiv.rows.length;

            for (var i = 0; i < count; i++) {
              if (i > 0) {
                  var row = origDiv.rows[1];
                  var body = origDiv.childNodes[1];
                  body.removeChild(row);
              }
            }

            for (var i = 0; i < result.recordset.length; i++) {

              var origDiv = document.getElementById("scoreboard");

              var tr = origDiv.insertRow();
              var td = tr.insertCell();
              td.innerHTML = result.recordset[i]["team_name"];
              td.id = "name" + result.recordset[i]["team_id"];

              td = tr.insertCell();
              td.innerHTML = result.recordset[i]["level1solved"] + " / " + result.recordset[i]["level1total"];
              td.id = "level1" + result.recordset[i]["team_id"];

              td = tr.insertCell();
              td.innerHTML = result.recordset[i]["level2solved"] + " / " + result.recordset[i]["level2total"];
              td.id = "level2" + result.recordset[i]["team_id"];

              td = tr.insertCell();
              td.innerHTML = result.recordset[i]["level3solved"] + " / " + result.recordset[i]["level3total"];
              td.id = "level3" + result.recordset[i]["team_id"];

              td = tr.insertCell();
              td.innerHTML = result.recordset[i]["level4solved"] + " / " + result.recordset[i]["level4total"];
              td.id = "level4" + result.recordset[i]["team_id"];

              td = tr.insertCell();
              td.innerHTML = result.recordset[i]["level5solved"] + " / " + result.recordset[i]["level5total"];
              td.id = "level5" + result.recordset[i]["team_id"];

              td = tr.insertCell();
              td.innerHTML = result.recordset[i]["attempts"];
              td.id = "attempts" + result.recordset[i]["team_id"];

              td = tr.insertCell();
              td.innerHTML = result.recordset[i]["solved"];
              td.id = "solved" + result.recordset[i]["team_id"];

              td = tr.insertCell();
              td.innerHTML = result.recordset[i]["current_score"];
              td.id = "score" + result.recordset[i]["team_id"];
            }
          }

          poll();
        });
    }, 30000);
    })();
  });
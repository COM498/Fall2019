$(document).ready(function() {
    // ajax urls
    const ajaxUrlEvents = "/api/currentevent";
    const ajaxUrlScore = "/api/scoreboard";

    var origDiv = document.getElementById("scoreboard");
    var count = origDiv.rows.length;
    var event;

    //clears scoreboard before filling
    for (var i = 0; i < count; i++) {
        if (i > 0) {
            var row = origDiv.rows[1];
            var body = origDiv.childNodes[1];
            body.removeChild(row);
        }
    }

    //gets current event
    $.ajax({
      type: "GET",
      url: ajaxUrlEvents,
      async: false
    }).done(function(result) {
      if (result.recordset[0]["event_id"] != 0) {
        event = result.recordset[0]["event_id"];
        document.getElementById("eventheader").textContent += result.recordset[0]["event_name"];

        //gets event scores and loads table
        $.ajax({
          type: "POST",
          url: ajaxUrlScore,
          data: '{"EventID": "' + event + '"}',
          contentType: "application/json",
          async: false
        }).done(function(result) {
          if (result.recordsets.length > 0) {
            for (var i = 0; i < result.recordset.length; i++) {
              var origDiv = document.getElementById("scoreboard");

              var tr = origDiv.insertRow();
              var td = tr.insertCell();
              td.innerHTML = result.recordset[i]["team_name"];
              td.id = "name" + result.recordset[i]["team_id"];

              td = tr.insertCell();
              var div = document.createElement("div");
              div.id = "progress1" + result.recordset[i]["team_id"];
              var span = document.createElement("div");
              span.innerHTML = result.recordset[i]["level1solved"] + " / " + result.recordset[i]["level1total"];
              span.id = "label";
              div.appendChild(span);
              td.appendChild(div);

              $("#progress1" + result.recordset[i]["team_id"]).progressbar({ 
                value: 100 * (parseFloat(result.recordset[i]["level1solved"]) / parseFloat(result.recordset[i]["level1total"]))
              });

              td.id = "level1" + result.recordset[i]["team_id"];

              td = tr.insertCell();
              div = document.createElement("div");
              div.id = "progress2" + result.recordset[i]["team_id"];
              span = document.createElement("div");
              span.innerHTML = result.recordset[i]["level2solved"] + " / " + result.recordset[i]["level2total"];
              span.id = "label";
              div.appendChild(span);
              td.appendChild(div);

              $("#progress2" + result.recordset[i]["team_id"]).progressbar({ 
                value: 100 * (parseFloat(result.recordset[i]["level2solved"]) / parseFloat(result.recordset[i]["level2total"]))
              });

              td.id = "level2" + result.recordset[i]["team_id"];

              td = tr.insertCell();
              div = document.createElement("div");
              div.id = "progress3" + result.recordset[i]["team_id"];
              span = document.createElement("div");
              span.innerHTML = result.recordset[i]["level3solved"] + " / " + result.recordset[i]["level3total"];
              span.id = "label";
              div.appendChild(span);
              td.appendChild(div);

              $("#progress3" + result.recordset[i]["team_id"]).progressbar({ 
                value: 100 * (parseFloat(result.recordset[i]["level3solved"]) / parseFloat(result.recordset[i]["level3total"]))
              });

              td.id = "level3" + result.recordset[i]["team_id"];

              td = tr.insertCell();
              div = document.createElement("div");
              div.id = "progress4" + result.recordset[i]["team_id"];
              span = document.createElement("div");
              span.innerHTML = result.recordset[i]["level4solved"] + " / " + result.recordset[i]["level4total"];
              span.id = "label";
              div.appendChild(span);
              td.appendChild(div);

              $("#progress4" + result.recordset[i]["team_id"]).progressbar({ 
                value: 100 * (parseFloat(result.recordset[i]["level4solved"]) / parseFloat(result.recordset[i]["level4total"]))
              });

              td.id = "level4" + result.recordset[i]["team_id"];

              td = tr.insertCell();
              div = document.createElement("div");
              div.id = "progress5" + result.recordset[i]["team_id"];
              span = document.createElement("div");
              span.innerHTML = result.recordset[i]["level5solved"] + " / " + result.recordset[i]["level5total"];
              span.id = "label";
              div.appendChild(span);
              td.appendChild(div);

              $("#progress5" + result.recordset[i]["team_id"]).progressbar({ 
                value: 100 * (parseFloat(result.recordset[i]["level5solved"]) / parseFloat(result.recordset[i]["level5total"]))
              });

              td.id = "level5" + result.recordset[i]["team_id"];

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

    //live updates to scores
    (function poll(){
    setTimeout(function(){
      $.ajax({
          type: "POST",
          url: ajaxUrlScore,
          data: '{"EventID": "' + event + '"}',
          contentType: "application/json",
          async: false
        }).done(function(result) {
          if (result.recordsets.length > 0) {

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
              var div = document.createElement("div");
              div.id = "progress1" + result.recordset[i]["team_id"];
              var span = document.createElement("div");
              span.innerHTML = result.recordset[i]["level1solved"] + " / " + result.recordset[i]["level1total"];
              span.id = "label";
              div.appendChild(span);
              td.appendChild(div);

              $("#progress1" + result.recordset[i]["team_id"]).progressbar({ 
                value: 100 * (parseFloat(result.recordset[i]["level1solved"]) / parseFloat(result.recordset[i]["level1total"]))
              });

              td.id = "level1" + result.recordset[i]["team_id"];

              td = tr.insertCell();
              div = document.createElement("div");
              div.id = "progress2" + result.recordset[i]["team_id"];
              span = document.createElement("div");
              span.innerHTML = result.recordset[i]["level2solved"] + " / " + result.recordset[i]["level2total"];
              span.id = "label";
              div.appendChild(span);
              td.appendChild(div);

              $("#progress2" + result.recordset[i]["team_id"]).progressbar({ 
                value: 100 * (parseFloat(result.recordset[i]["level2solved"]) / parseFloat(result.recordset[i]["level2total"]))
              });

              td.id = "level2" + result.recordset[i]["team_id"];

              td = tr.insertCell();
              div = document.createElement("div");
              div.id = "progress3" + result.recordset[i]["team_id"];
              span = document.createElement("div");
              span.innerHTML = result.recordset[i]["level3solved"] + " / " + result.recordset[i]["level3total"];
              span.id = "label";
              div.appendChild(span);
              td.appendChild(div);

              $("#progress3" + result.recordset[i]["team_id"]).progressbar({ 
                value: 100 * (parseFloat(result.recordset[i]["level3solved"]) / parseFloat(result.recordset[i]["level3total"]))
              });

              td.id = "level3" + result.recordset[i]["team_id"];

              td = tr.insertCell();
              div = document.createElement("div");
              div.id = "progress4" + result.recordset[i]["team_id"];
              span = document.createElement("div");
              span.innerHTML = result.recordset[i]["level4solved"] + " / " + result.recordset[i]["level4total"];
              span.id = "label";
              div.appendChild(span);
              td.appendChild(div);

              $("#progress4" + result.recordset[i]["team_id"]).progressbar({ 
                value: 100 * (parseFloat(result.recordset[i]["level4solved"]) / parseFloat(result.recordset[i]["level4total"]))
              });

              td.id = "level4" + result.recordset[i]["team_id"];

              td = tr.insertCell();
              div = document.createElement("div");
              div.id = "progress5" + result.recordset[i]["team_id"];
              span = document.createElement("div");
              span.innerHTML = result.recordset[i]["level5solved"] + " / " + result.recordset[i]["level5total"];
              span.id = "label";
              div.appendChild(span);
              td.appendChild(div);

              $("#progress5" + result.recordset[i]["team_id"]).progressbar({ 
                value: 100 * (parseFloat(result.recordset[i]["level5solved"]) / parseFloat(result.recordset[i]["level5total"]))
              });

              td.id = "level5" + result.recordset[i]["team_id"];

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
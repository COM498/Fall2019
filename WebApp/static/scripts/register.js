$(document).ready(function() {

    var input = document.getElementById("tbConfirm");

    //captures Enter Key press
    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("btnSubmit").click();
        }
    });

    //creates team with name and password
    $("#btnSubmit").click(function() {
        const ajaxUrl = "/api/teams";
        var registerUrl = "/players.html";

        var user = document.getElementById("tbName").value.trim();
        var pass = document.getElementById("tbPass").value.trim();
        var confirm = document.getElementById("tbConfirm").value.trim();

        if (user.includes('"') || user.includes("'") || user.includes("\\")) {
            document.getElementById("teamerror").innerHTML = "Your team's name cannot contain single quotes, double quotes, or backslashes.<br/>";
            document.getElementById("teamerror").hidden = false;
            return false;
        }
        else if (user.length < 1) {
            document.getElementById("teamerror").innerHTML = "Your team's name cannot be empty.<br/>";
            document.getElementById("teamerror").hidden = false;
            return false;
        }
        else if ($.isNumeric(user.charAt(0))) {
            document.getElementById("teamerror").innerHTML = "Your team's name cannot start with a number.<br/>";
            document.getElementById("teamerror").hidden = false;
            return false;
        }

        if (pass.length < 1) {
            document.getElementById("teamerror").innerHTML = "Your team's password cannot be empty.<br/>";
            document.getElementById("teamerror").hidden = false;
            return false;
        }

        if (pass === confirm) {
            $.ajax({
                type: "POST",
                url: ajaxUrl,
                data: '{"Name":"' + user + '", "Pwd": "' + pass +'"}',
                contentType: "application/json"
            }).done(function(result) {
                if (result.recordset[0]["team_id"] != 0) {
                    sessionStorage.setItem("teamid", result.recordset[0]["team_id"]);
                    window.location.replace(registerUrl);
                }
                else {
                    alert("Account creation failure");
                    document.getElementById("btnSubmit").disabled = false;
                }
            });
        }
        else {
            alert("Passwords do not match");
            document.getElementById("btnSubmit").disabled = false;
        }
    });
});
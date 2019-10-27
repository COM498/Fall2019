$(document).ready(function() {

    var input = document.getElementById("tbConfirm");

    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("btnSubmit").click();
        }
    });

    $("#btnSubmit").click(function() {
        const ajaxUrl = "/api/teams";
        var registerUrl = "/players.html";

        var user = document.getElementById("tbName").value;
        var pass = document.getElementById("tbPass").value;
        var confirm = document.getElementById("tbConfirm").value;

        if (user.includes('"') || user.includes("'") || user.includes("\\")) {
            document.getElementById("teamerror").innerHTML = "Your team's name cannot contain single quotes, double quotes, or backslashes.<br/>";
            document.getElementById("teamerror").hidden = false;
            document.getElementById("teamerror").style.color = "red";
            return false;
        }
        else if (user.length < 1) {
            document.getElementById("teamerror").innerHTML = "Your team's name cannot be empty.<br/>";
            document.getElementById("teamerror").hidden = false;
            document.getElementById("teamerror").style.color = "red";
            return false;
        }

        if (pass.length < 1) {
            document.getElementById("teamerror").innerHTML = "Your team's password cannot be empty.<br/>";
            document.getElementById("teamerror").hidden = false;
            document.getElementById("teamerror").style.color = "red";
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
(function () {
    "use strict";

    // The initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {
        $(document).ready(function () {
            app.initialize();
            $('#GetAtomicNumber').click(GetAtomicNumber);

        });
    };
    function GetAtomicNumber(elementname) {

        var inputtext = $("#input")[0].value;
        $("#Result2").html("<table><tr></table>");
        if (inputtext == "") {
            app.showNotification("ERROR:", "Input text cannot be null");
        }
        else {
            var codebehindPage = "../temppage.aspx?requesttype=getatomicnumber&input=" + inputtext;
            var xmlhttp;
            try {
                xmlhttp = new XMLHttpRequest();
                xmlhttp.open("GET", codebehindPage, false);
                xmlhttp.send(null);
                if (xmlhttp.status == 200) {
                    var result = xmlhttp.responseText;
                    var myResultArray = result.split("~");
                    var htmlstring = "<table class='hoverTable'>";
                    for (var i = 1; i < myResultArray.length; i++) {
                        var finalValue = myResultArray[i].trim().split(",");
                        htmlstring += "<tr background-color=#ffff99><td>" + finalValue[0] + "</td><td>" + finalValue[1] + "</td></tr>";
                    }
                    htmlstring += "</table>";
                    $("#Result2").html(htmlstring);
                    //$("#Result2").visible = false;
                }
                if (xmlhttp.status == 405) {
                    app.showNotification("ERROR:", xmlhttp.status);
                }
            }
            catch (ex) {
                app.showNotification("ERROR:", xmlhttp.message);
            }
        }
    }
})();
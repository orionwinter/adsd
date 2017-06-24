var fs = require("fs"),
    rp = require("request-promise");

var appendOnFile = function(before, gotError, i) {
    var after = new Date();

    var text = i + "," + Number(before) + "," + Number(after) + "," + Number(after - before) + "," + gotError + "\n";

    fs.appendFile(__dirname + "/output.csv", text, function(err) {
        if(err) {
            return console.log(err);
        }
        if (!gotError){
            console.log("The file was saved!");
        }
    });
};

var makeRequest = function(i) {
    var before = new Date();
    rp("http://150.165.85.4:10400/get_best_trips?route=507&time=17:00:00&date=2017-02-04&bus_stop_id=26255&closest_trip_type=single_trip")
        .then(function (response) {
            appendOnFile(before, false, i);
        })
        .catch(function (err) {
            appendOnFile(before, true, i);
        });
};

// TODO: Fazer a quantidade de requisições por minuto necessárias
for (var i = 0; i < 10; i++) {
    makeRequest(i);
}


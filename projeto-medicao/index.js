var fs = require("fs"),
    rp = require("request-promise");

var start = new Date();

var argument = process.argv.slice(2, 3),
    directory = process.argv.slice(3, 4);

var appendOnFile = function(before, gotError, i, directory) {
    var after = new Date();

    var text = Number(start) + "," + argument + "," + i + "," + Number(before) + "," + Number(after) + "," + Number(after - before) + "," + gotError + "\n";

    fs.appendFile(directory + "/output.csv", text, function(err) {
        if(err) {
            return console.log(err);
        }
        if (!gotError){
            console.log("The file was saved!");
        }
    });
};

var makeRequest = function(i, directory) {
    var before = new Date();
    rp("http://150.165.85.4:10400/get_best_trips?route=507&time=17:00:00&date=2017-02-04&bus_stop_id=26255&closest_trip_type=single_trip")
        .then(function (response) {
            appendOnFile(before, false, i, directory);
        })
        .catch(function (err) {
            appendOnFile(before, true, i, directory);
        });
};

if (argument == "") {argument = 5;}
if (directory == "") {directory = __dirname;}


console.log("Irei executar " + argument + " requisições");

for (var i = 0; i < Number(argument); i++) {
    makeRequest(i, directory);
}


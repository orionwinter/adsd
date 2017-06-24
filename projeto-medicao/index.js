var fs = require('fs')

for (var i = 0; i < 10; i++) {
    var antes = new Date();

    // TODO Fazer requisição para o best-trip-recommender

    var depois = new Date();

    var text = Number(antes) + "," + Number(depois) + "," + Number(depois - antes) + "\n";

    fs.appendFile("/home/orion/Documentos/adsd/projeto-medicao/output.txt", text, function(err) {
        if(err) {
          return console.log(err);
}
        console.log("The file was saved!");
    });
}

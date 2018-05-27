var ResponseUtils = appRequire('utils.response');
var http = require('http');

function getFrequency(req, res) {


    var wordDict = {};
    var count = req.params.num;
    var toSort = [];
    http.get('http://terriblytinytales.com/test.txt', (resp) => {
        var data = '';


        resp.on('data', (chunk) => {
            data += chunk;
        });


        resp.on('end', () => {
            // data = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";
            data = data.split(/\s+/);

            data.forEach(function (datum) {
                datum = datum.toLowerCase();
                datum = datum.replace(/[`~!@#$%^&*()_|+\-=÷¿?;:'",.<>\{\}\[\]\\\/]/gi, ' ').trim();
                if (datum) {
                    if (datum.indexOf(' ') >= 0) {
                        datum = datum.split(/\s+/);
                        datum.forEach(function (childDatum) {
                            if (wordDict[childDatum]) {
                                wordDict[childDatum] += 1;
                            } else {
                                wordDict[childDatum] = 1;
                            }
                        });
                    } else {
                        if (wordDict[datum]) {
                            wordDict[datum] += 1;
                        } else {
                            wordDict[datum] = 1;
                        }
                    }
                }
            });

            // push into array
            for (var word in wordDict) {
                toSort.push([word, wordDict[word]]);
            }


            // sort the array
            toSort.sort(function (a, b) {
                return b[1] - a[1];
            });

            return res.json(ResponseUtils.responseMessage(true, 'success', toSort.slice(0, count)));
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
        return res.json(ResponseUtils.responseError(err));
    });
}







module.exports = {
    getFrequency: getFrequency
};
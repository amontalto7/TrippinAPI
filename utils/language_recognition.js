// set endpoint and your access key
require('dotenv').config();
var axios = require("axios");
let languageDetected;
// var ip = '160.39.7.165'
var access_key = process.env.ACCESS_KEY;

function recogLang(ip) {
    var queryURL = 'http://api.ipstack.com/' + ip + '?access_key=' + access_key;

    return axios.get(queryURL).then(
        function (response) {
            // console.log(response.data);
            // console.log(" Country Code: " + response.data.location.languages[0].code);
            console.log("English to " + response.data.location.languages[0].name);
            const countryCode = response.data.location.languages[0].code;
            const countryLanguage = response.data.location.languages[0].name;

            return { countryCode: countryCode, countryLanguage: countryLanguage };
            // languageDetected = response.data.location.languages[0].name;
        });
};

module.exports = recogLang;
const axios = require("axios");
const translate = require("./translate-text")
const recogLang = require("./language_recognition");
var URL = "https://www.ipapi.co/";
// console.log(URL);
URL += "json";


module.exports = (phrases) => axios.get(URL).then(async () => {
    // const geoLoc = await recogLang(response.data.ip);
    // console.log(phrases);
    const geoLoc = await recogLang("77.136.14.169");
    // console.log("geoLoc");
    translate(geoLoc.countryCode, phrases);

});

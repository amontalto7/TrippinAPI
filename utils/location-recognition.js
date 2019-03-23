const axios = require("axios");
const translate = require("./translate-text")
const recogLang = require("./language_recognition");
var URL = "https://www.ipapi.co/";
// console.log(URL);
URL += "json";

axios.get(URL).then(async response => {
    // const geoLoc = await recogLang(response.data.ip);

    const geoLoc = await recogLang("77.136.14.169");
    // console.log(geoLoc);
    translate(geoLoc.countryCode);

});

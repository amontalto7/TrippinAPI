let data = [];
let Axios = require("axios");
let apiObj = { data };

const Parser = require("rss-parser");
const parser = new Parser();
(async () => {
  let feed = await parser.parseURL(
    "https://travel.state.gov/_res/rss/TAsTWs.xml"
  );

  feed.items.forEach(item => {
    let country = item.title.match(/.+?(?= -)/gm);
    let level = item.title.match(/([0-9])/gm);
    let profile = {
      country: country,
      content: item.content,
      title: item.title,
      level: level,
      link: item.link,
      flagUrl: item.flagUrl
    };

    data.push(profile);
  });

  data.forEach(item => {
    item.country = item.country.toString().trim();
    item.countrySearchable = item.country.toLowerCase().replace(/\s/g, "");
    item.level = parseInt(item.level);
  });
})();

module.exports = {
  data: data,
  apiObj: apiObj
};

//=============================================================================================
//=============================================================================================
//=============================================================================================
//=============================================================================================
//=============================================================================================
//=============================================================================================
//random comments and logging
//   console.log(feed.items[0]);
//   console.log(feed.items[0].content);
//    Each title will have to be parsed and pla`ced into  an array and assigned a country code.
//   console.log(feed.title);
//   console.log("feed length is: " + feed.items.length + " items");
// countries.push(countrieslist);
// console.log(countries);
// console.log("\n" + item.title + "\n" + item.link + "\n");
// console.log({countryProfile})

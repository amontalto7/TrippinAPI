let countriesList = [];

const Parser = require("rss-parser");
const parser = new Parser();

(async () => {
  let feed = await parser.parseURL(
    "https://travel.state.gov/_res/rss/TAsTWs.xml"
  );

  //   console.log(feed.items[0]);
  //   console.log(feed.items[0].content);

  //    Each title will have to be parsed and pla`ced into  an array and assigned a country code.

  //   console.log(feed.title);

  //   console.log("feed length is: " + feed.items.length + " items");

  feed.items.forEach(item => {
    let countryProfile = {
      country: item.title.match(/.+?(?= -)/gm),
      content: item.contentSnippet,
      title: item.title,
      level: item.title.match(/Level ?(.*)/gm),
      link: item.link
    };

    countriesList.push(countryProfile);

    // countries.push(countrieslist);
    // console.log(countries);
    // console.log("\n" + item.title + "\n" + item.link + "\n");
    // console.log({countryProfile})
  });
})();

module.exports = {
  countriesList: countriesList
};

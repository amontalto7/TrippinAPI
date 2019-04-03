require("dotenv").config();
// const request = require('request');
var Promise = require("bluebird");
var request = Promise.promisifyAll(require("request"));
const uuidv4 = require("uuid/v4");
// let request = require('async-request');
require("./language_recognition.js");
const phrase_controller = require("../controllers/phraseController");

/* Checks to see if the subscription key is available
as an environment variable. If you are setting your subscription key as a
string, then comment these lines out.
If you want to set your subscription key as a string, replace the value for
the Ocp-Apim-Subscription-Key header as a string. */
const subscriptionKey = process.env.TRANSLATOR_TEXT_KEY;

async function translate(language, phrases, req, res) {
  //   language = "es";
  // if language is english, default to spanish instead
  if (language === "en") {
    language = "es";
  }

  // map incoming phrases to a format the API can read
  let phraselist = phrases.map(phrase => ({ Text: phrase.phrase }));
  let response;
  if (!subscriptionKey) {
    throw new Error(
      "Environment variable for your subscription key is not set."
    );
  }

  let options = {
    method: "POST",
    baseUrl: "https://api.cognitive.microsofttranslator.com/",
    url: "translate",
    qs: {
      "api-version": "3.0",
      to: language
    },
    headers: {
      "Ocp-Apim-Subscription-Key": subscriptionKey,
      "Content-type": "application/json",
      "X-ClientTraceId": uuidv4().toString()
    },
    body: phraselist,
    json: true
  };
  try {
    response = await request.postAsync(options);

    // map the API response to a format that can be read by the client
    let data = response.body.map((translated, i) => ({
      og_language: translated.detectedLanguage.language,
      og_phrase: phrases[i].phrase,
      id: phrases[i]._id,
      tr_language: translated.translations[0].to,
      tr_phrase: translated.translations[0].text
    }));
    res.send(data);
    // console.log(response.body[0].translations[0].text);
  } catch (error) {
    console.error(error);
  }
}

module.exports = translate;

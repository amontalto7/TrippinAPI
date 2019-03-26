require('dotenv').config();
// const request = require('request');
var Promise = require("bluebird");
var request = Promise.promisifyAll(require("request"));
const uuidv4 = require('uuid/v4');
// let request = require('async-request');
require('./language_recognition.js')
const phrase_controller = require("../controllers/phraseController");

/* Checks to see if the subscription key is available
as an environment variable. If you are setting your subscription key as a
string, then comment these lines out.
If you want to set your subscription key as a string, replace the value for
the Ocp-Apim-Subscription-Key header as a string. */
const subscriptionKey = process.env.TRANSLATOR_TEXT_KEY;
// let phrases = ["Hello",
//     "Goodbye",
//     "Excuse me",
//     "Do you speak English?",
//     "Thank you",
//     "Please",
//     "You're Welcome",
//     "I want that",
//     "What is this?",
//     "I don't understand",
//     "My name is John",
//     "What is your name?",
//     "Where is the bathroom?",
//     "How much does it cost?",
//     "Yes",
//     "No",
//     "Taxi",
//     "Hotel",
//     "Restaurant"
// ];

async function translate(language, phrases, req, res) {
    // console.log("im here", language);
    // const phrases = await phrase_controller.phrase_list_get(false, false);
    // console.log(phrases);
    let counter = 1;
    let data = [];
    let response;
    for (let i = 0; i < phrases.length; i++) {

        if (!subscriptionKey) {
            throw new Error('Environment variable for your subscription key is not set.');
        }

        let options = {
            method: 'POST',
            baseUrl: 'https://api.cognitive.microsofttranslator.com/',
            url: 'translate',
            qs: {
                'api-version': '3.0',
                to: language
            },
            headers: {
                'Ocp-Apim-Subscription-Key': subscriptionKey,
                'Content-type': 'application/json',
                'X-ClientTraceId': uuidv4().toString()
            },
            body: [
                {
                    text: phrases[i].phrase
                }
            ],
            json: true
        };
        try {
            response = await request.postAsync(options);
            console.log(response.body[0].translations[0].text);
        }
        catch (error) {
            console.error(error);
        }
        data[i] = {
            "og_language": phrases[i].language,
            "og_phrase": phrases[i].phrase,
            "id": phrases[i]._id,
            tr_language: language,
            tr_phrase: response.body[0].translations[0].text
        }
        counter++;

        // console.log('>>> ', counter, " ", phrases.length);


        // console.log(translatedPhrases);
        if (counter == phrases.length) {
            // console.log(data);
            res.send(data);
        }

        // await request(options, function (err, response, body) {
        //     if (err) {
        //         console.error(err);
        //     }
        //     // console.log(body);
        //     translatedPhrases.push(body[0].translations[0].text);
        //     console.log(body[0].translations[0]);
        //     console.log(phrases[i]);
        //     // console.log(phrases);
        //     // console.log(phrases);
        //     // console.log(translatedPhrases);
        //     data[i] = {
        //         "og_language": phrases[i].language,
        //         "og_phrase": phrases[i].phrase,
        //         "id": phrases[i]._id,
        //         tr_language: language,
        //         tr_phrase: translatedPhrases[i]
        //     }
        //     while (translatedPhrases.length >= phrases.length) {



        //         // console.log(translatedPhrases);
        //         if (translatedPhrases.length === phrases.length) {
        //             // console.log(data);
        //             res.send(data);


        //             break;
        //         }
        //     }
        // console.log(translatedPhrases);
        // console.log(phrases[i]);
        // console.log(body);
        // console.log("English: " + phrases[i] + "   " + "French" + ": " + JSON.stringify(body[0].translations[0].text, null, 5));
        // console.log("--------------------------------");
        // });
    }
    // console.log(translatedPhrases);
};

module.exports = translate;


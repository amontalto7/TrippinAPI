require('dotenv').config();
const request = require('request');
const uuidv4 = require('uuid/v4');
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

async function translate(language, phrases) {
    // console.log("im here", language);
    // const phrases = await phrase_controller.phrase_list_get(false, false);
    // console.log(phrases);
    const translatedPhrases = [];
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
                    text: phrases[i]
                }
            ],
            json: true
        };

        await request(options, function (err, res, body) {
            translatedPhrases.push(body[0].translations[0].text);
            while (translatedPhrases.length >= phrases.length) {
                console.log(translatedPhrases);
                if (translatedPhrases.length === phrases.length) {
                    break;
                }
            }
            // console.log(translatedPhrases);
            // console.log(phrases[i]);
            // console.log(body);
            // console.log("English: " + phrases[i] + "   " + "French" + ": " + JSON.stringify(body[0].translations[0].text, null, 5));
            // console.log("--------------------------------");
        });
    }
    // console.log(translatedPhrases);
};

module.exports = translate;


const axios = require("axios")
require('dotenv').config()
const logger = require("@bunnylogger/bunnylogger")

module.exports = checkWordAgainsSpacy

async function checkWordAgainsSpacy(wordObject) {

    return new Promise(async (resolve, reject) => {
        let cityWords = []
        for (let index = 0; index < wordObject.length; index++) {
            const element = wordObject[index];
            await axios.post(`${process.env.SPACY_URL}/dep`, {
                "text": element,
                "model": "en_core_web_md",
                "collapse_punctuation": 0,
                "collapse_phrases": 1
            }).then((res) => {
                if (res.data.words[0].tag == "NNP") {
                    cityWords.push(res.data.words[0])
                }
            }).catch(function (error) {
                logger.error(error.message);
            });
        }
        resolve(cityWords)
    })

}
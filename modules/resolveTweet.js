require('dotenv').config({ path: '../.env' })
const axios = require("axios")
module.exports = resolveTweet


async function resolveTweet(tweetID) {
    return new Promise(async (resolve, reject) => {
        let tweetObject = {}
        let requestData = await axios.get(`https://api.twitter.com/2/tweets?ids=${tweetID}&tweet.fields=entities`, {
            headers: {
                'Authorization': 'Bearer ' + process.env.TWITTER_TOKEN
            }
        }).catch(function (error) {
            logger.error(error.message);
        })
        requestData = requestData.data.data[0]
        tweetObject.id = requestData.id
        tweetObject.text = requestData.text.replace(/(\r\n|\n|\r)/gm, "");
        try {
            tweetObject.image = requestData.entities.urls[0].images[0].url
        } catch { }
        tweetObject.created = new Date()
        resolve(tweetObject)
    })

}
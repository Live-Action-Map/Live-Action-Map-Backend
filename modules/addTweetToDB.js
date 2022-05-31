require('dotenv').config({ path: '../.env' })
const db = require("./db")
const axios = require("axios")
const getLatLong = require("./getTweetLatLong")
module.exports = addTweetToDB

async function addTweetToDB(tweetID) {
    let tweetObject = {}
    let requestData = await axios.get(`https://api.twitter.com/2/tweets?ids=${tweetID}&tweet.fields=entities`, {
        headers: {
            'Authorization': 'Bearer ' + process.env.TWITTER_TOKEN
        }
    })
    requestData = requestData.data.data[0]
    tweetObject.id = requestData.id
    tweetObject.text = requestData.text.replace(/(\r\n|\n|\r)/gm, "");
    try {
        tweetObject.image = requestData.entities.urls[0].images[0].url
    } catch { }
    tweetObject.created = new Date()
    tweetObject.position = await getLatLong(tweetObject)
    await db.insert("tweets", { id: tweetObject.id }, tweetObject)
}

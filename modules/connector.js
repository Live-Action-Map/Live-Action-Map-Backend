const io = require('socket.io-client');
const socket = io.connect('http://10.2.0.30:25566')
const resolveTweet = require("./resolveTweet")
const lintTweet = require("./lintTweet")
const logger = require("@bunnynode/bunnylogger");
const checkWordsAgainstSpacy = require("./checkWordsAgainstSpacy")
const addToFeed = require("./socket");
const getCitesPostion = require('./getCityPosition');
const db = require("./db");
const removeUkraineWord = require('./removeUkraineWord');


socket.on('connect', function (socket) {
    logger.log('WS Connected!');
});

socket.on('tweet', async function (msg) {
    let tweet = await resolveTweet(msg.message.data.id)
    addToFeed(tweet)
    tweet.text = lintTweet(tweet.text)
    let cityList = await checkWordsAgainstSpacy(tweet.text.split(" "))
    if (cityList.length == 0) return;
    cityList = await removeUkraineWord(cityList)
    tweet.position = await getCitesPostion(cityList)
    db.insert("tweets", { id: tweet.id }, tweet)
});
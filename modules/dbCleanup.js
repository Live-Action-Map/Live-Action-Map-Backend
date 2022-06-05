require('dotenv').config()

const db = require("./db")
const cron = require("node-cron")
async function cleanDB() {
    let tweets = await db.read("tweets")
    const currentTime = new Date
    tweets.forEach(tweet => {
        const msBetweenDates = Math.abs(tweet.created.getTime() - currentTime.getTime());
        const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);
        if (hoursBetweenDates > 24) {
            console.log(tweet)
            db.remove("tweets", { id: tweet.id })
        }
        if (tweet.position.length < 1) {
            console.log(tweet)
            db.remove("tweets", { id: tweet.id })
        }
    });
}



cron.schedule('0 * * * *', () => {
    cleanDB()
});
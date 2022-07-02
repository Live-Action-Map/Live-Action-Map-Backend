require('dotenv').config()

const db = require("./db")
const cron = require("node-cron")
async function cleanDB() {
    let tweets = await db.read("tweets", { created: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } })
    tweets.forEach(tweet => {
        db.remove("tweets", { id: tweet.id })
    });
}



cron.schedule('* * * * *', () => {
    cleanDB()
});
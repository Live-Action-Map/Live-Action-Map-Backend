const cron = require("node-cron")
const db = require("./db")

let citiesList = []
let rejectedWords = []
async function getRejectedWords() {
    rejectedWords = await db.read("rejectedWords")
    
}

async function getKnownCities() {
    citiesList = await db.read("cities")
}

module.exports = checkCityAgainstDB

getRejectedWords()
getKnownCities()
cron.schedule('0 * * * *', () => {
    getRejectedWords()
    getKnownCities()
});

function checkCityAgainstDB(word) {
    return new Promise((resolve, reject) => {
        let answer = {
            position: [],
            rejected: true
        }
        let pickedReject = rejectedWords.find(o => o.rejectedWord == word.toLowerCase());
        if (pickedReject != undefined) {
            console.log(`Rejected: ${pickedReject}`)
            console.log(answer)
            resolve(answer)
        }
        try {
            let picked = citiesList.find(o => o.city == word.toLowerCase());
            console.log(citiesList)
            answer.position.push(picked.lat)
            answer.position.push(picked.lon)
            answer.rejected = false
            console.log(answer)
            resolve(answer)
        } catch (error) {
            console.log(`Errored: ${word}`)
            db.insert("analizeWords", {
                word: word.toLowerCase()
            }, { word: word.toLowerCase() })
            reject()
        }



    })
}


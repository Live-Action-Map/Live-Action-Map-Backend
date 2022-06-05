module.exports = getLatLong
const axios = require("axios")
require('dotenv').config()
const checkCityAgainstDB = require("./checkTweetsAgainstPredefined")

async function getLatLong(data) {
    return new Promise(async (resolve, reject) => {
        let textArray = []
        let position = []

        await axios.post(`${process.env.SPACY_URL}/dep`, {
            "text": data.text,
            "model": "en_core_web_md",
            "collapse_punctuation": 0,
            "collapse_phrases": 1
        }).then((res) => {
            textArray = res.data.words
        }).catch(function (error) {
            console.log(error.message);
        });

        textArray.forEach(async (element) => {
            if (element.tag == "NNP") {
                try {
                    answer = await checkCityAgainstDB(element.text)
                    console.log(answer)
                    console.log("A")
                    resolve(answer.position)
                    if (answer.reject) {
                        reject()
                    }
                } catch (error) {
                    let text = element.text.replace('‘', '')
                    text = text.replace("\'", '')
                    text = text.replace("\"", '')
                    let lat = ""
                    let lon = ""
                    let temp
                    await axios.get(`https://nominatim.openstreetmap.org/search.php?q=${text}&format=json`).then((res) => {
                        temp = res.data
                        lat = res.data[0].lat
                        lon = res.data[0].lon
                    }).catch(function (error) {
                        console.log(text)
                        // console.log(error)
                    });
                    await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`).then((res) => {
                        if (res.data.address.couSntry_code == "ua") {
                            position.push(lat)
                            position.push(lon)
                            resolve(position)
                        }
                    }).catch(function (error) {
                        // console.log(error)
                    });
                }

            }
        });

    })
}
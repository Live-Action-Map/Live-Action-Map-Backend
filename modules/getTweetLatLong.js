module.exports = getLatLong
const axios = require("axios")
require('dotenv').config()


async function getLatLong(data) {
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
            let text = element.text.replace('‘', '')
            text = text.replace("\'", '')
            text = text.replace("\"", '')
            let lat = ""
            let lon = ""
            await axios.get(`https://nominatim.openstreetmap.org/search.php?q=${text}&format=json`).then((res) => {
                lat = res.data[0].lat
                lon = res.data[0].lon
            }).catch(function (error) {
                console.log(error.message)
            });
            await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`).then((res) => {
                if (res.data.address.country_code == "ua") {
                    position.push(lat)
                    position.push(lon)
                }
            }).catch(function (error) {
                console.log(error.message)
            });
        }
    });

    return position
}
module.exports = getLatLong
const axios = require("axios")

async function getLatLong(data) {
    let text = data.text.replace('/', '')
    text = text.replace('#', '')
    text = text.replace('i…', '')
    text = text.replace('-', '')
    text = text.replace('…', '')
    textArray = text.split(" ")
    let position = []
    console.log(data.text)
    if (textArray.length) {
        for (let index = 0; index < textArray.length; index++) {
            const element = textArray[index];
            let lat = ""
            let lon = ""
            try {
                //THIS IS STUPID
                await axios.get(`https://nominatim.openstreetmap.org/search.php?q=${element}&format=json`).then((res) => {
                    lat = res.data[0].lat
                    lon = res.data[0].lon
                }).catch()
                await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`).then((res) => {
                    if (res.data.address.country_code == "ua") {
                        position.push(lat)
                        position.push(lon)
                    }
                    console.log(res.data.address.country_code)
                    console.log(position)
                }).catch()

            } catch (e) {
                console.log(e)
            }
        }
    }
    return position
}
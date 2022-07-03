module.exports = getCitesPostion
const axios = require("axios")
const logger = require("@bunnynode/bunnylogger")
async function getCitesPostion(cities) {
    return new Promise(async (resolve, reject) => {
        for (let index = 0; index < cities.length; index++) {
            const city = cities[index];
            let lat = ""
            let lon = ""
            await axios.get(`https://nominatim.openstreetmap.org/search.php?q=${city.text}&format=json`).then((res) => {
                lat = res.data[0].lat
                lon = res.data[0].lon
            }).catch(function (error) {
                logger.error(error)
            });
            if (lat != "" && lon != "") {
                await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`).then((res) => {
                    if (res.data.address.country_code == "ua") {
                        let position = []
                        position.push(lat)
                        position.push(lon)
                        resolve(position)
                    }
                }).catch(function (error) {
                    logger.error(error)
                });
            }


        }
    })
}
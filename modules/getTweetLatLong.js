// const nominatim = require('nominatim-client');
// const client = nominatim.createClient({
//     useragent: "Live Action Map",             // The name of your application
//     referer: 'https://live-action-map.com',  // The referer link
// });

const cities = require('all-the-cities');

module.exports = getLatLong

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
            
            try {
                let location = cities.filter(city => city.name.match(element))
                if (location.length) {
                    if (location[0].country == "UA") {
                        position = location[0].loc.coordinates
                    }
                }
            } catch (e) {
                console.log(e)
            }
        }
    }
    return position
}


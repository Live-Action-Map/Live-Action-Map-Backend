module.exports = removeUkraineWord

function removeUkraineWord(wordsList) {
    return new Promise(async (resolve, reject) => {
        let returnList = []
        for (let index = 0; index < wordsList.length; index++) {
            const element = wordsList[index];
            if (element.text.toLowerCase().includes("ukraine")) return
            returnList.push(element)
        }
        resolve(returnList)
    })
}
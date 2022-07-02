module.exports = lint

function lint(tweetText) {
    let lintTweet = tweetText.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
    lintTweet = lintTweet.replace(/[^a-z0-9 -]/gi, '');
    return lintTweet
}
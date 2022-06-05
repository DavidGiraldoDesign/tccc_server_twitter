const config = require('dotenv').config()
const needle = require('needle');
const token = process.env.BEARER_TOKEN;

const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";
//const user = 'josedavidgm1995'
//-is:retweet
async function getRequest(user) {
    const params = {
        'query': `from:${user} #sidemissions'`,
        'tweet.fields': 'id,text,created_at,public_metrics,lang,author_id,attachments',
        'expansions': 'attachments.media_keys',
        'media.fields': 'url,preview_image_url'
    }
    const res = await needle('get', endpointUrl, params, {
        headers: {
            "User-Agent": "v2RecentSearchJS",
            "authorization": `Bearer ${token}`
        }
    })

    if (res.body) {
        return res.body;
    } else {
        throw new Error('Unsuccessful request');
    }
}

module.exports = getRequest;
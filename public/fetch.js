const endpointUrl = "https://api.twitter.com/2/tweets/search/recent?query=from%3Ajosedavidgm1995%20%23sidemissions%20-is%3Aretweet&tweet.fields=id,text,created_at,public_metrics,lang,author_id,attachments&expansions=attachments.media_keys&media.fields=url,preview_image_url";


async function getRequest() {

    const getRequest = {
        method: 'GET',
        mode:'cors',
        headers: {
            "User-Agent": "v2RecentSearchJS",
            "authorization": `Bearer AAAAAAAAAAAAAAAAAAAAAA0jdAEAAAAAemKOy%2FO6nvA98AgXEVPcU00xdzI%3DdrnYqzVtKMP6HZ4T5ubCSWLTz0o24478pCfmue8dV12uBwu36w`
        }
    }
    const request = await fetch(endpointUrl, getRequest);
    const data = await request.json();
    return data
    //console.log('data: ' + data);
    //players = data;
}

(async () => {

    try {
        // Make request
        const response = await getRequest();
        console.dir(response, {
            depth: null
        });

    } catch (e) {
        console.log(e);
    }
})();
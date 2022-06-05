const os = require('os');
const express = require('express')
const cors = require('cors')
const getRequest = require('./twitter')

const serverHTTP = express();
const PORT = 5050
const IPaddress = os.networkInterfaces().en0[1].address;

serverHTTP.use(express.json());
serverHTTP.use(cors({
    origin: '*'
}))

//ngrok http 5050

serverHTTP.post('/last_tweet', (req, res) => {
    console.log('Recieved: ' + req.body.user + ' from: ' + req.body.msn);

    (async () => {
        try {
            // Make request
            const response = await getRequest(req.body.user);
            console.dir(response, {
                depth: null
            });
            if (response.meta.result_count != 0) {
                const lastTweet = {
                    text: response.data[0].text,
                    date: response.data[0].created_at,
                    mediaUrl: response.includes.media[0].type == 'video' ? response.includes.media[0].preview_image_url : response.includes.media[0].url
                }
                res.send(lastTweet)
            } else {
                res.send({
                    status: 'Cero Tweets'
                })
            }

        } catch (e) {
            console.log(e);
            res.send({
                status: 'error'
            })
        }
    })()
})

serverHTTP.listen(PORT, (error) => {
    console.log(`http://${IPaddress}:${PORT}`);
})
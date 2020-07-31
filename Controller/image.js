const Clarifai = require('clarifai')
// import Clarifai from "clarifai"; because it display the key api in the front end - that would be risk
//https://leaverou.github.io/css3patterns/#honeycomb: BACKGROUND OF INPUT
// API of Clarifai, detect face, https://www.clarifai.com/developer/welcome
//AND https://github.com/Clarifai/clarifai-javascript/blob/master/src/index.js
const app = new Clarifai.App({
        apiKey: "ee01703741704094a0c382aa18ea6207",
});
const handleAPICall = (req, res) => {
        app.models.predict('c0c0ac362b03416da06ab3fa36fb58e3', req.body.input)
                .then(data => {
                        res.json(data);
                }).catch(err => res.status(400).json('unable to work with API'))

}
const handleImage = (req, res, db) => {
        //A request body is data sent by the client to your API.
        //A response body is the data your API sends to the client.
        // Your API almost always has to send a response body.
        //But clients don't necessarily need to send request bodies all the time.
        const { id } = req.body;
        db('users').where('id', '=', id)
                .increment('entries', 1)
                .returning('entries')
                .then(entries => {
                        console.log(entries[0])
                        res.json(entries[0])
                })
                .catch(err => res.status(400).json('unable to get entries'))
}
module.exports = {
        handleImage,
        handleAPICall
}

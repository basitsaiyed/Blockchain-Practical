const express = require("express");
const Blockchain = require("./blockchain");
const DEFAULT_PORT = 8080;
const app = express();
const PubSub = require("./publishsubscriber.js");
const request = require("request");
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;


const myChain = new Blockchain();
const pubSub = new PubSub(myChain);


// setTimeout(() => pubSub.broadcastChain(), 1000);


app.use(express.json());
app.get("/blockchainData", (req, res) => {
    res.json(myChain.chain);
});


app.post("/addDataToChain", (req, res) => {
    const { data } = req.body;
    myChain.addBlock({ data });
    pubSub.broadcastChain();
    console.log("Done added");
    res.json({ myChain });
});


const synChains = () => {
    request({ url: `${ROOT_NODE_ADDRESS}/blockchainData` }, (err, res, body) => {
        if (!err && res.statusCode === 200) {
            const rootChain = JSON.parse(body);
            console.log(rootChain);
            console.log("Rootchain:", rootChain);
        }
    });
};


let PEER_PORT;
if (process.env.GENERATE_PEER_PORT === "true") {
    PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}
const PORT = PEER_PORT || DEFAULT_PORT;


app.listen(PORT, () => {
    console.log("Server is listening at :", PORT);
    synChains();
});




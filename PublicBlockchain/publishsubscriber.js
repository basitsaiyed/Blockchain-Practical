const redis = require("redis");


const CHANNEL = {
    TEST: "TEST", BLOCKCHAIN: "BLOCKCHAIN",
};


class PubSub {
    constructor(blockChain) {
        this.blockChain = blockChain;
        this.publisher = redis.createClient();
        this.subscriber = redis.createClient();
        this.subscriber.subscribe(CHANNEL.TEST);
        this.subscriber.subscribe(CHANNEL.BLOCKCHAIN);
        this.subscriber.on("message", (channel, message) =>
            this.handleMessage(channel, message)
        );
    }


    handleMessage(channel, message) {
        console.log(`Message "${message}" received on channel "${channel}"`);
        const parseMessage = JSON.parse(message);
    }


    publish({ channel, message }) {
        this.publisher.publish(channel, message);
    }


    broadcastChain() {
        this.publish({
            channel: CHANNEL.BLOCKCHAIN,
            message: JSON.stringify(this.blockChain.chain),
        });
    }
}


module.exports = PubSub;

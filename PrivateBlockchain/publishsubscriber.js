const redis = require("redis");

const CHANNELS = {
    TEST: 'TEST',
    BLOCKCHAIN: 'BLOCKCHAIN'
};

class PubSub {
    constructor(blockchain) {
        this.blockchain = blockchain;

        // Create publisher and subscriber clients
        this.publisher = redis.createClient();
        this.subscriber = redis.createClient();

        // Connect both clients and handle errors
        this.connectClients();

        // Subscribe to the blockchain channel
        this.subscriber.subscribe(CHANNELS.BLOCKCHAIN);
        this.subscriber.on('message', (channel, message) => 
            this.handleMessage(channel, message)
        );
    }

    async connectClients() {
        try {
            await this.publisher.connect();
            await this.subscriber.connect();
        } catch (error) {
            console.error('Error connecting to Redis:', error);
        }

        // Handle errors for publisher
        this.publisher.on('error', (err) => {
            console.error('Publisher Error:', err);
        });

        // Handle errors for subscriber
        this.subscriber.on('error', (err) => {
            console.error('Subscriber Error:', err);
        });
    }

    handleMessage(channel, message) {
        console.log(`Message received. Channel: ${channel}. Message: ${message}`);
        const parsedMessage = JSON.parse(message);

        if (channel === CHANNELS.BLOCKCHAIN) {
            this.blockchain.replaceChain(parsedMessage);
        }
    }

    async publish({ channel, message }) {
        try {
            await this.publisher.publish(channel, message);
        } catch (error) {
            console.error('Error publishing message:', error);
        }
    }

    broadcastChain() {
        this.publish({
            channel: CHANNELS.BLOCKCHAIN,
            message: JSON.stringify(this.blockchain.chain)
        });
    }

    async close() {
        await this.publisher.quit();
        await this.subscriber.quit();
    }
}

module.exports = PubSub;

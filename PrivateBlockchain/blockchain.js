const SHA256 = require("crypto-js/sha256");
class Block {
    constructor(index, timestamp, data, previousHash = "") {
        this.index = index; this.timestamp = timestamp;
        this.data = data; this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }


    //For calculating the hash of block
    calculateHash() {
        return SHA256(
            this.index + this.timestamp + JSON.stringify(this.data) +
            this.previousHash).toString();
    }
}


// Class of Blockchain
class Blockchain {
    createGenesisBlock() {
        return new Block(0, Date.now(), "Genesis Block", "0");
    }


    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 100; // Adjust the difficulty for mining
        this.pendingTransactions = [];
    }


    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }


    // For adding new block 
    addBlock({ data }) {
        const newBlock = this.mineBlock({
            prevBlock: this.chain[this.chain.length - 1],
            data,
        });
        this.chain.push(newBlock);
    }


    // Proof of work using simple function.
    mineBlock({ prevBlock, data }) {
        let hash = "divyesh",
            timestamp;
        const prevHash = prevBlock.hash;
        const index = prevBlock.index + 1;
        let { difficulty } = prevBlock;
        const nonce = Math.floor(Math.random() * 100) + 1;
        console.log(nonce);
        let temp = -1;
        do {
            temp++; timestamp = Date.now();
            hash = SHA256(
                hash, timestamp, nonce, difficulty, data, prevHash).toString();
        } while (temp != nonce);
        console.log("mining");
        return {
            index, timestamp, prevHash, nonce, data, hash,
        };
    }


    // For checking chain is valid or not.
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }


    // To replace the chain if any big chain is build
    replaceChain(chain) {
        if (chain.length <= this.chain.length) {
            console.error("The incoming chain is not longer");
            return;
        }
        if (!Blockchain.isValidChain(chain)) {
            console.error("The incoming chain is not valid");
            return;
        }
        this.chain = chain;
    }
}
module.exports = Blockchain;

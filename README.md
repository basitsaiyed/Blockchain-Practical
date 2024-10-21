# Blockchain Practical

This project contains blockchain-related practicals using Node.js and Solidity. It includes both JavaScript-based blockchain projects and Solidity-based smart contracts, such as a crowdfunding smart contract, which can be executed on the Remix Ethereum IDE.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Requirements](#requirements)
3. [Installation](#installation)
4. [Saving Code](#saving-code)
5. [Running the JavaScript Blockchain Project](#running-the-javascript-blockchain-project)
6. [Running the Solidity Smart Contract](#running-the-solidity-smart-contract)
7. [Interacting with the Solidity Smart Contract](#interacting-with-the-solidity-smart-contract)
8. [Contributing](#contributing)
9. [License](#license)

## Project Overview

This project includes practical implementations of blockchain technology using JavaScript and Solidity. The JavaScript portion demonstrates how to create private and public blockchains, while the Solidity portion contains a smart contract (e.g., crowdfunding) to be deployed on Ethereum-based platforms such as Remix Ethereum IDE.

## Requirements

- Node.js (version 16.x or higher)
- npm (Node package manager)
- Remix Ethereum IDE (for Solidity code)

## Installation

### JavaScript Blockchain Setup

1. **Create a new directory for the project**:
   Open your terminal and run the following command to create a directory and navigate into it:

   ```bash
   mkdir blockchain-practical
   cd blockchain-practical
   ```

2. **Initialize the Node.js project**:
   Run the following command to create a `package.json` file:

   ```bash
   npm init -y
   ```

3. **Install any required dependencies**:
   If your JavaScript blockchain code requires additional Node.js packages, install them using npm. For example:

   ```bash
   npm install
   ```

4. **Create a JavaScript file**:
   Create a JavaScript file to store the blockchain code:

   ```bash
   touch index.js
   ```

5. **Copy and paste the JavaScript code**:
   Open `index.js` in your code editor, paste the blockchain code, and save the file.

### Solidity Smart Contract Setup

1. **Create a Solidity file**:
   In your local environment or directly in Remix, create a Solidity file named `crowdFunding.sol`:

   ```bash
   touch crowdFunding.sol
   ```

2. **Copy and paste the Solidity code**:
   Open the `crowdFunding.sol` file in your text editor (or directly in Remix), copy the Solidity code for the crowdfunding smart contract, and paste it into the file.

## Saving Code

### JavaScript

- After setting up the project as mentioned above, ensure that you save the blockchain code in the `index.js` file.
  
### Solidity

- Save the Solidity code in the `crowdFunding.sol` file in your local directory or copy it into Remix IDE.

## Running the JavaScript Blockchain Project

1. **Run the JavaScript file**:
   After saving the blockchain code in `index.js`, run it using Node.js with the following command:

   ```bash
   node index.js
   ```

2. **Verify the Output**:
   Check the terminal output to ensure the blockchain logic runs successfully. This may include logs related to blocks, transactions, or Proof of Work (PoW).

## Running the Solidity Smart Contract

### Step 1: Open Remix Ethereum IDE

1. Go to [Remix Ethereum IDE](https://remix.ethereum.org/).

2. In the Remix file explorer, create a new file by clicking the "+" icon.

3. Name the file `crowdFunding.sol`.

### Step 2: Copy and Paste the Solidity Code

1. Open the newly created `crowdFunding.sol` file in the Remix IDE.
2. Copy the Solidity code from your local `crowdFunding.sol` file and paste it into the Remix editor.

### Step 3: Compile the Solidity Code

1. In Remix, click on the **"Solidity Compiler"** tab from the left sidebar.
2. Ensure that the correct Solidity version is selected (match the version in the code).
3. Click the **"Compile crowdFunding.sol"** button.
4. If the contract compiles successfully, you will see a green checkmark.

### Step 4: Deploy the Smart Contract

1. Go to the **"Deploy & Run Transactions"** tab in Remix.
2. Choose the environment for deployment (e.g., **JavaScript VM** or **Injected Web3** for MetaMask).
3. Click **Deploy** to deploy your smart contract.

## Interacting with the Solidity Smart Contract

Once you have deployed the contract, follow these steps to interact with it:

### Step 1: Go to the "Deploy & Run Transactions" Tab

1. Open the **"Deploy & Run Transactions"** tab in the left sidebar of Remix.
2. You will see your deployed contract in the **"Deployed Contracts"** section along with the contract address (e.g., `CrowdSource at 0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8`).

### Step 2: Contribute Ethers to the Contract

1. The contract functions will be listed under the deployed contract section.
2. To contribute ethers to the contract, follow these steps:
   - **Click** the `contribute` function button.
   - In the "Value" field located above the functions, **enter 2** and select **ether** from the dropdown.
   - **Click** the **transact** button to send 2 ethers to the contract.

### Step 3: Wait for the Transaction to Be Mined

1. After clicking **transact**, Remix will process the transaction.
2. Wait for the transaction to be mined. Once it is confirmed, you will see the events emitted in the Remix console.

### Step 4: Check the Contract State

- Use the functions under the deployed contract to interact with other aspects of the contract. You can check contributions, retrieve balances, and test other functionalities through the Remix interface.

---

## Contributing

If you would like to contribute to this project, please fork the repository, create a new branch, and submit a pull request. Ensure that your code is well-documented and follows best practices.

## License

This project is licensed under the MIT License.

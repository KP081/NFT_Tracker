# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```

---

## 🛠 1) Hardhat Installation & Setup (Sepolia + Ignition Deployment)

### 📦 Install Dependencies:

```bash
npm install --save-dev hardhat
npm install @openzeppelin/contracts
npm install --save-dev @nomicfoundation/hardhat-toolbox @nomicfoundation/hardhat-ignition dotenv
```

---

### ⚙️ Configure `hardhat.config.js`:

```js
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  ignition: {
    modules: "./ignition/modules",
  },
};
```

---

### 🔐 Create `.env` File:

```env
INFURA_API_KEY=your_infura_project_id
PRIVATE_KEY=your_sepolia_wallet_private_key
```

> ⚠️ Don’t share this file — always keep `.env` in `.gitignore`.

---

### 🚀 Deploy to Sepolia:

1. Compile contract:

```bash
npx hardhat compile
```

2. Deploy using Ignition:

```bash
npx hardhat ignition deploy ignition/modules/deploy.js --network Sepolia
```

Copy the deployed **contract address** — you’ll need it in the subgraph setup.

✅ Done! Contract deployed to **Ethereum Sepolia Testnet** using **Ignition**.

---

## 📡 2) Subgraph Setup with Graph Studio

### 🔧 Step 1: Create Subgraph in Studio

1. Visit: [https://thegraph.com/studio](https://thegraph.com/studio)
2. Log in → Click **"+ Subgraph"**
3. Name it (e.g., `NFT_Tracker`)
4. Choose **Ethereum → Sepolia**
5. Click **Create Subgraph**

---

### ⚙️ Step 2: Local Setup

#### ✅ Install Graph CLI:

```bash
npm install -g @graphprotocol/graph-cli
```

#### 📁 Initialize the Subgraph:

```bash
graph init NFT_Tracker
```

Respond to prompts:

* Network → `Ethereum mainnet`
* Contract address (from Sepolia deployment)
* ABI path
* Start block (find on [https://sepolia.etherscan.io](https://sepolia.etherscan.io))

> ⚠️ after this replace mainnet to a sepolia in all files in NFT_Tracjer folder.
---

### ⚙️ Setup & Deploy

1. Go to subgraph folder:

```bash
cd subgraph
```

2. Install dependencies:

```bash
npm install
```

3. Codegen & build:

```bash
graph codegen
graph build
```

4. Authenticate CLI:

```bash
graph auth YOUR_DEPLOY_KEY
```

> You’ll find the deploy key in your Graph Studio dashboard → Deploy → Access Token.

5. Deploy to Graph Studio:

```bash
graph deploy NFT_Tracker
```

✅ You’ll get a GraphQL endpoint like:

```
https://api.studio.thegraph.com/query/YOUR_ID/NFT_Tracker/version
```

Copy this URL — you’ll need it in your frontend Apollo config.

---

## 🌐 3) Frontend Installation & Setup (Vite + Tailwind + Apollo)

### ⚡ Create Vite + React App (If not already):

```bash
npm create vite@latest frontend -- --template react-ts
cd frontend
```

---

### 💨 Install TailwindCSS:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Update `tailwind.config.js`:

```js
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]
```

In `src/index.css`, add:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### 🔌 Install Apollo + GraphQL:

```bash
npm install @apollo/client graphql
```

Create `src/apollo.ts`:

```ts
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://api.studio.thegraph.com/query/YOUR_ID/NFT_Tracker/version", // replace with actual endpoint
  cache: new InMemoryCache(),
});
```

---

### ▶️ Run Frontend:

```bash
npm run dev
```

Open in browser:

```
http://localhost:5173
```
---
import { useEffect, useState } from "react";
// import { ethers } from "ethers";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
import NFTList from "./components/NFTList";

function App() {
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    async function connectWallet() {
      if ((window as any).ethereum) {
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        setAddress(accounts[0]);
      }
    }
    connectWallet();
  }, []);

  return (
    <ApolloProvider client={client}>
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-4">NFT Tracker Dashboard</h1>
        {address ? (
          <div>
            <p className="mb-2 text-gray-600">Wallet: {address}</p>
            <NFTList owner={address} />
          </div>
        ) : (
          <p>Please connect MetaMask</p>
        )}
      </div>
    </ApolloProvider>
  );
}

export default App;

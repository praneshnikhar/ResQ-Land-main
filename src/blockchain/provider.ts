import { ethers } from "ethers";

// Connect to local Ganache blockchain
export const localProvider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

// Connect MetaMask account and get signer
export async function getSigner() {
  if (!window.ethereum) {
    throw new Error("MetaMask not found. Please install MetaMask.");
  }

  // Request wallet connection
  await window.ethereum.request({ method: "eth_requestAccounts" });

  // Connect to MetaMask wallet
  const browserProvider = new ethers.BrowserProvider(window.ethereum);
  const signer = await browserProvider.getSigner();
  console.log("Connected Wallet:", await signer.getAddress());
  return signer;
}

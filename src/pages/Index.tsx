import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  BrowserProvider,
  Contract,
  AbstractProvider,
} from "ethers";
import Header from "@/components/Header";
import LoginView from "@/components/LoginView";
import DashboardView from "@/components/DashboardView";
import RegistryView from "@/components/RegistryView";
import TransferView from "@/components/TransferView";
import { authStorage } from "@/utils/authStorage";

// ✅ Smart Contract (from Ganache/Hardhat deployment)
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const CONTRACT_ABI = [
  {
    inputs: [
      { internalType: "uint256", name: "landId", type: "uint256" },
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "string", name: "metadata", type: "string" },
    ],
    name: "registerLand",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "landId", type: "uint256" }],
    name: "getLandOwner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "landId", type: "uint256" },
      { internalType: "address", name: "newOwner", type: "address" },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const Index = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme");
    return (saved as "light" | "dark") || "light";
  });

  const [currentPage, setCurrentPage] = useState<
    "login" | "dashboard" | "registry" | "transfer"
  >("login");

  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [provider, setProvider] = useState<AbstractProvider | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);

  // ✅ Restore session
  useEffect(() => {
    const currentUser = authStorage.getCurrentUser();
    if (currentUser) {
      setUserEmail(currentUser.email);
      if (currentUser.walletAddress) {
        setWalletAddress(currentUser.walletAddress);
        setCurrentPage("dashboard");
      }
    }
  }, []);

  // ✅ Theme toggle
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // ✅ Connect MetaMask Wallet
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        toast.error("MetaMask is not installed. Please install it.");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const address = accounts[0];

      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      if (chainId !== "0x539") {
        toast.warning("Switching MetaMask to Ganache network...");
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x539" }],
        });
      }

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const c = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      setWalletAddress(address);
      setProvider(provider);
      setContract(c);

      authStorage.updateCurrentUser({ walletAddress: address });
      setCurrentPage("dashboard");

      toast.success("✅ Wallet connected successfully!");
      console.log("Connected to:", address);
    } catch (error: any) {
      console.error("Wallet connection error:", error);
      toast.error(error.message || "Failed to connect MetaMask");
    }
  };

  // ✅ Improved Register Land Function
  const registerLand = async (
    landId: string,
    owner: string,
    location: string,
    coordinates: { lat: number; lng: number },
    documentUrl?: string,
    polygonCoords?: [number, number][]
  ) => {
    try {
      if (!contract) {
        toast.error("Smart contract not initialized. Connect your wallet first.");
        throw new Error("contract-not-initialized");
      }

      toast.loading("Registering land on blockchain...");

      // Ensure numeric Land ID
      const landIdNumber = parseInt(landId.replace(/\D/g, "") || "0", 10);
      if (isNaN(landIdNumber) || landIdNumber <= 0) {
        toast.dismiss();
        toast.error("Please enter a valid numeric Land ID (e.g., 101)");
        throw new Error("invalid-land-id");
      }

      const metadata = JSON.stringify({
        location,
        coordinates,
        documentUrl,
        polygonCoords,
      });

      console.log("⏳ Sending transaction...");
      const tx = await contract.registerLand(landIdNumber, owner, metadata);
      console.log("Transaction sent:", tx.hash);

      const receipt = await tx.wait(1); // Wait for 1 confirmation
      console.log("Transaction receipt:", receipt);

      if (receipt.status === 1 || receipt.status === "0x1") {
        toast.dismiss();
        toast.success("✅ Land registered successfully!");
        return { success: true, txHash: tx.hash };
      } else {
        toast.dismiss();
        toast.error("Transaction mined but failed");
        throw new Error("tx-failed");
      }
    } catch (err: any) {
      console.error("registerLand error:", err);

      toast.dismiss();
      if (err?.code === 4001 || err?.message?.toLowerCase?.().includes("user rejected")) {
        toast.error("Transaction rejected by user.");
      } else if (err?.reason || err?.message) {
        toast.error(err.reason || err.message);
      } else {
        toast.error("Transaction failed or timed out.");
      }

      throw err;
    }
  };

  // Transfer Ownership
  const transferOwnership = async (landId: string, newOwner: string) => {
    try {
      if (!contract) {
        toast.error("Smart contract not initialized. Connect your wallet first.");
        return;
      }

      toast.loading("Transferring ownership...");

      const tx = await contract.transferOwnership(landId, newOwner);
      const receipt = await tx.wait(1);

      toast.dismiss();
      if (receipt.status === 1 || receipt.status === "0x1") {
        toast.success("Ownership transferred successfully!");
        console.log("Transfer Tx:", tx.hash);
      } else {
        toast.error("⚠️ Transfer failed");
      }
    } catch (error: any) {
      toast.dismiss();
      console.error("Transfer error:", error);
      toast.error(error.message || "Failed to transfer ownership");
    }
  };

  //  Handle user login success
  const handleAuthSuccess = (email: string) => {
    setUserEmail(email);
    setCurrentPage("dashboard");
  };

  return (
    <div className="min-h-screen bg-background transition-smooth">
      {currentPage !== "login" && (
        <Header theme={theme} toggleTheme={toggleTheme} walletAddress={walletAddress} />
      )}

      {currentPage === "login" && (
        <>
          <Header theme={theme} toggleTheme={toggleTheme} walletAddress={null} />
          <LoginView connectWallet={connectWallet} onAuthSuccess={handleAuthSuccess} />
        </>
      )}

      {currentPage === "dashboard" && (
        <DashboardView
          setCurrentPage={(page: string) =>
            setCurrentPage(page as "login" | "dashboard" | "registry" | "transfer")
          }
          walletAddress={walletAddress}
        />
      )}

      {currentPage === "registry" && (
        <RegistryView walletAddress={walletAddress} registerLand={registerLand} />
      )}

      {currentPage === "transfer" && (
        <TransferView walletAddress={walletAddress} transferOwnership={transferOwnership} />
      )}
    </div>
  );
};

// Extend window type for MetaMask
declare global {
  interface Window {
    ethereum?: any;
  }
}

export default Index;

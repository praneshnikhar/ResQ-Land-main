import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import LoginView from '@/components/LoginView';
import DashboardView from '@/components/DashboardView';
import RegistryView from '@/components/RegistryView';
import TransferView from '@/components/TransferView';
import { authStorage } from '@/utils/authStorage';

// Hardcoded blockchain variables
const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const CONTRACT_ABI = [
  {
    "inputs": [
      { "internalType": "uint256", "name": "landId", "type": "uint256" },
      { "internalType": "address", "name": "owner", "type": "address" },
      { "internalType": "string", "name": "metadata", "type": "string" }
    ],
    "name": "registerLand",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "landId", "type": "uint256" }],
    "name": "getLandOwner",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "landId", "type": "uint256" },
      { "internalType": "address", "name": "newOwner", "type": "address" }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
const RPC_URL = 'http://127.0.0.1:8545';

const Index = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark') || 'light';
  });
  
  const [currentPage, setCurrentPage] = useState<'login' | 'dashboard' | 'registry' | 'transfer'>('login');
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Check for existing logged in user on mount
  useEffect(() => {
    const currentUser = authStorage.getCurrentUser();
    if (currentUser) {
      setUserEmail(currentUser.email);
      if (currentUser.walletAddress) {
        setWalletAddress(currentUser.walletAddress);
        setCurrentPage('dashboard');
      }
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleAuthSuccess = (email: string) => {
    setUserEmail(email);
    // After successful auth, user can connect wallet or go to dashboard
    setCurrentPage('dashboard');
  };

  const connectWallet = async () => {
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum === 'undefined') {
        toast.error('MetaMask is not installed. Please install MetaMask extension.');
        return;
      }

      // Simulate Ethers.js v6 connection
      toast.loading('Connecting to MetaMask...');
      
      // Request account access
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      const address = accounts[0];
      setWalletAddress(address);
      
      // Update user with wallet address
      authStorage.updateCurrentUser({ walletAddress: address });
      
      setCurrentPage('dashboard');
      
      toast.success('Wallet connected successfully!');
      
      console.log('Connected to:', address);
      console.log('Contract Address:', CONTRACT_ADDRESS);
      console.log('RPC URL:', RPC_URL);
    } catch (error) {
      console.error('Connection error:', error);
      toast.error('Failed to connect wallet');
    }
  };

  const registerLand = async (
    landId: string, 
    owner: string, 
    location: string, 
    coordinates: { lat: number; lng: number }
  ) => {
    try {
      toast.loading('Initiating blockchain transaction...');
      
      // Simulate transaction delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const metadata = JSON.stringify({ location, coordinates });
      
      // Simulated Ethers.js v6 transaction
      console.log('Registering land on blockchain:');
      console.log('Contract:', CONTRACT_ADDRESS);
      console.log('Land ID:', landId);
      console.log('Owner:', owner);
      console.log('Metadata:', metadata);
      console.log('ABI:', CONTRACT_ABI);
      
      toast.success('Transaction submitted to blockchain!');
      
      // Simulate confirmation
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Transaction confirmed!');
      
    } catch (error) {
      console.error('Transaction error:', error);
      throw error;
    }
  };

  const transferOwnership = async (landId: string, newOwner: string) => {
    try {
      toast.loading('Initiating transfer transaction...');
      
      // Simulate transaction delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulated Ethers.js v6 transaction
      console.log('Transferring ownership on blockchain:');
      console.log('Contract:', CONTRACT_ADDRESS);
      console.log('Land ID:', landId);
      console.log('Current Owner:', walletAddress);
      console.log('New Owner:', newOwner);
      console.log('ABI:', CONTRACT_ABI);
      
      toast.success('Transfer transaction submitted!');
      
      // Simulate confirmation
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Transfer confirmed on blockchain!');
      
    } catch (error) {
      console.error('Transfer error:', error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-background transition-smooth">
      {currentPage !== 'login' && (
        <Header 
          theme={theme} 
          toggleTheme={toggleTheme} 
          walletAddress={walletAddress}
        />
      )}

      {currentPage === 'login' && (
        <>
          <Header 
            theme={theme} 
            toggleTheme={toggleTheme} 
            walletAddress={null}
          />
          <LoginView 
            connectWallet={connectWallet}
            onAuthSuccess={handleAuthSuccess}
          />
        </>
      )}

      {currentPage === 'dashboard' && (
        <DashboardView 
          setCurrentPage={(page: string) => setCurrentPage(page as 'login' | 'dashboard' | 'registry' | 'transfer')} 
        />
      )}

      {currentPage === 'registry' && (
        <RegistryView 
          walletAddress={walletAddress}
          registerLand={registerLand}
        />
      )}

      {currentPage === 'transfer' && (
        <TransferView 
          walletAddress={walletAddress}
          transferOwnership={transferOwnership}
        />
      )}
    </div>
  );
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ethereum?: any;
  }
}

export default Index;

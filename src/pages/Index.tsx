



// import { useState, useEffect } from "react";
// import { toast } from "sonner";
// import { BrowserProvider, Contract, AbstractProvider } from "ethers";
// import Header from "@/components/Header";
// import LoginView from "@/components/LoginView";
// import DashboardView from "@/components/DashboardView";
// import RegistryView from "@/components/RegistryView";
// import TransferView from "@/components/TransferView";
// import AdminView from "@/components/AdminView";
// import { authStorage } from "@/utils/authStorage";

// const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
// // ✅ Admin is now defined by Email
// const ADMIN_EMAIL = "praneshnikhar@gmail.com"; 

// const CONTRACT_ABI = [
//   { inputs: [{ internalType: "uint256", name: "landId", type: "uint256" }, { internalType: "address", name: "owner", type: "address" }, { internalType: "string", name: "metadata", type: "string" }], name: "registerLand", outputs: [], stateMutability: "nonpayable", type: "function" },
//   { inputs: [{ internalType: "uint256", name: "landId", type: "uint256" }], name: "getLandOwner", outputs: [{ internalType: "address", name: "", type: "address" }], stateMutability: "view", type: "function" },
//   { inputs: [{ internalType: "uint256", name: "landId", type: "uint256" }, { internalType: "address", name: "newOwner", type: "address" }], name: "transferOwnership", outputs: [], stateMutability: "nonpayable", type: "function" }
// ];

// const Index = () => {
//   const [theme, setTheme] = useState<"light" | "dark">(() => (localStorage.getItem("theme") as any) || "light");
//   const [currentPage, setCurrentPage] = useState<"login" | "dashboard" | "registry" | "transfer" | "admin">("login");
//   const [walletAddress, setWalletAddress] = useState<string | null>(null);
//   const [userEmail, setUserEmail] = useState<string | null>(null);
//   const [contract, setContract] = useState<Contract | null>(null);
//   const [parcels, setParcels] = useState<any[]>(() => {
//     const saved = localStorage.getItem("landParcels");
//     return saved ? JSON.parse(saved) : [];
//   });

//   useEffect(() => {
//     const currentUser = authStorage.getCurrentUser();
//     if (currentUser) {
//       setUserEmail(currentUser.email);
//       if (currentUser.walletAddress) {
//         setWalletAddress(currentUser.walletAddress);
//         setCurrentPage("dashboard");
//       }
//     }
//   }, []);

//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", theme === "dark");
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const connectWallet = async () => {
//     try {
//       if (!window.ethereum) return toast.error("MetaMask not found.");
//       const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
//       const provider = new BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       setContract(new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer));
//       setWalletAddress(accounts[0]);
//       authStorage.updateCurrentUser({ walletAddress: accounts[0] });
//       setCurrentPage("dashboard");
//       toast.success("✅ Wallet connected!");
//     } catch (error: any) {
//       toast.error("Connection failed");
//     }
//   };

//   const registerLand = async (landId: string, owner: string, location: string, coordinates: any, documentUrl?: string, polygonCoords?: any) => {
//     if (!contract) throw new Error("No contract");
//     const landIdNumber = parseInt(landId.replace(/\D/g, "") || "0", 10);
//     const metadata = JSON.stringify({ location, coordinates, documentUrl, polygonCoords, status: "pending", timestamp: new Date().toISOString() });
//     const tx = await contract.registerLand(landIdNumber, owner, metadata);
//     await tx.wait(1);

//     const newParcel = { id: Date.now().toString(), landId, owner, location, coordinates, documentUrl, polygonCoords, status: "pending", timestamp: new Date().toISOString() };
//     const updated = [...parcels, newParcel];
//     setParcels(updated);
//     localStorage.setItem("landParcels", JSON.stringify(updated));
//     return { success: true };
//   };

//   // const verifyLand = async (landId: string, approved: boolean) => {
//   //   const updated = parcels.map((p) => p.landId === landId ? { ...p, status: approved ? "verified" : "rejected" } : p);
//   //   setParcels(updated);
//   //   localStorage.setItem("landParcels", JSON.stringify(updated));
//   // };

//   const verifyLand = async (landId: string, approved: boolean) => {
//   let updated;

//   if (approved) {
//     // ✅ Keep the record and update status to 'verified'
//     updated = parcels.map((p) => 
//       p.landId === landId ? { ...p, status: "verified" } : p
//     );
//     toast.success(`Land ID ${landId} has been officially verified.`);
//   } else {
//     // ❌ REJECT: Remove the record entirely
//     updated = parcels.filter((p) => p.landId !== landId);
//     toast.error(`Land ID ${landId} has been rejected and removed from records.`);
//   }

//   // Update State and Storage
//   setParcels(updated);
//   localStorage.setItem("landParcels", JSON.stringify(updated));
// };

//   const transferOwnership = async (landId: string, newOwner: string) => {
//     if (!contract) return;
//     const tx = await contract.transferOwnership(landId, newOwner);
//     await tx.wait(1);
//     const updated = parcels.map(p => p.landId === landId ? { ...p, owner: newOwner } : p);
//     setParcels(updated);
//     localStorage.setItem("landParcels", JSON.stringify(updated));
//   };

//   // ✅ Admin Check now uses Email
//   const isAdmin = userEmail === ADMIN_EMAIL;

//   return (
//     <div className="min-h-screen bg-background transition-smooth">
//       {currentPage !== "login" && (
//         <Header theme={theme} toggleTheme={() => setTheme(t => t === 'light' ? 'dark' : 'light')} walletAddress={walletAddress} />
//       )}

//       {currentPage === "login" && (
//   <LoginView 
//     connectWallet={async () => { await connectWallet(); }} 
//     onAuthSuccess={(email) => { 
//       setUserEmail(email); 
//       setCurrentPage("dashboard"); 
//     }} 
//   />
// )}

//       {currentPage === "dashboard" && (
//         <DashboardView
//           setCurrentPage={(p) => setCurrentPage(p as any)}
//           walletAddress={walletAddress}
//           isAdmin={isAdmin}
//           parcels={parcels}
//           logout={() => {
//             authStorage.logoutUser(); 
//             setWalletAddress(null);
//             setUserEmail(null);
//             setCurrentPage("login");
//             toast.success("Logged out");
//           }}
//         />
//       )}

//       {currentPage === "registry" && <RegistryView walletAddress={walletAddress} registerLand={registerLand} />}
//       {currentPage === "transfer" && <TransferView walletAddress={walletAddress} transferOwnership={transferOwnership} />}
//       {currentPage === "admin" && <AdminView parcels={parcels} verifyLand={verifyLand} />}
//     </div>
//   );
// };

// export default Index;










import { useState, useEffect } from "react";
import { toast } from "sonner";
import { BrowserProvider, Contract, AbstractProvider } from "ethers";
import Header from "@/components/Header";
import LoginView from "@/components/LoginView";
import DashboardView from "@/components/DashboardView";
import RegistryView from "@/components/RegistryView";
import TransferView from "@/components/TransferView";
import AdminView from "@/components/AdminView";
import { authStorage } from "@/utils/authStorage";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ADMIN_EMAIL = "praneshnikhar@gmail.com"; 

const CONTRACT_ABI = [
  { inputs: [{ internalType: "uint256", name: "landId", type: "uint256" }, { internalType: "address", name: "owner", type: "address" }, { internalType: "string", name: "metadata", type: "string" }], name: "registerLand", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [{ internalType: "uint256", name: "landId", type: "uint256" }], name: "getLandOwner", outputs: [{ internalType: "address", name: "", type: "address" }], stateMutability: "view", type: "function" },
  { inputs: [{ internalType: "uint256", name: "landId", type: "uint256" }, { internalType: "address", name: "newOwner", type: "address" }], name: "transferOwnership", outputs: [], stateMutability: "nonpayable", type: "function" }
];

const Index = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() => (localStorage.getItem("theme") as any) || "light");
  const [currentPage, setCurrentPage] = useState<"login" | "dashboard" | "registry" | "transfer" | "admin">("login");
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);
  
  const [parcels, setParcels] = useState<any[]>(() => {
    const saved = localStorage.getItem("landParcels");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ Initialize session & theme
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

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === "light" ? "dark" : "light");

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return toast.error("MetaMask not found.");
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      setContract(new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer));
      setWalletAddress(accounts[0]);
      authStorage.updateCurrentUser({ walletAddress: accounts[0] });
      setCurrentPage("dashboard");
      toast.success("✅ Secure Node Connection Established");
    } catch (error: any) {
      toast.error("Blockchain connection failed");
    }
  };

  const registerLand = async (landId: string, owner: string, location: string, coordinates: any, documentUrl?: string, polygonCoords?: any) => {
    if (!contract) throw new Error("No contract connection");
    const landIdNumber = parseInt(landId.replace(/\D/g, "") || "0", 10);
    const metadata = JSON.stringify({ location, coordinates, documentUrl, polygonCoords, status: "pending", timestamp: new Date().toISOString() });
    
    const tx = await contract.registerLand(landIdNumber, owner, metadata);
    await tx.wait(1);

    const newParcel = { id: Date.now().toString(), landId, owner, location, coordinates, documentUrl, polygonCoords, status: "pending", timestamp: new Date().toISOString() };
    const updated = [...parcels, newParcel];
    setParcels(updated);
    localStorage.setItem("landParcels", JSON.stringify(updated));
    return { success: true };
  };

  const verifyLand = async (landId: string, approved: boolean) => {
    let updated;
    if (approved) {
      updated = parcels.map(p => p.landId === landId ? { ...p, status: "verified" } : p);
      toast.success(`Asset ${landId} Verified`);
    } else {
      updated = parcels.filter(p => p.landId !== landId);
      toast.error(`Asset ${landId} Rejected and Purged`);
    }
    setParcels(updated);
    localStorage.setItem("landParcels", JSON.stringify(updated));
  };

  const transferOwnership = async (landId: string, newOwner: string) => {
    if (!contract) return;
    const tx = await contract.transferOwnership(landId, newOwner);
    await tx.wait(1);
    const updated = parcels.map(p => p.landId === landId ? { ...p, owner: newOwner } : p);
    setParcels(updated);
    localStorage.setItem("landParcels", JSON.stringify(updated));
  };

  const isAdmin = userEmail === ADMIN_EMAIL;

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] transition-all duration-500 selection:bg-blue-500/30">
      {/* --- Global Header --- */}
      {currentPage !== "login" && (
        <Header theme={theme} toggleTheme={toggleTheme} walletAddress={walletAddress} />
      )}

      {/* --- View Routing --- */}
      <main className="max-w-[1600px] mx-auto overflow-hidden">
        {currentPage === "login" && (
          <LoginView 
            connectWallet={async () => { await connectWallet(); }} 
            onAuthSuccess={(email) => { 
              setUserEmail(email); 
              setCurrentPage("dashboard"); 
            }} 
          />
        )}

        {currentPage === "dashboard" && (
          <DashboardView
            setCurrentPage={(p) => setCurrentPage(p as any)}
            walletAddress={walletAddress}
            isAdmin={isAdmin}
            parcels={parcels}
            logout={() => {
              authStorage.logoutUser(); 
              setWalletAddress(null);
              setUserEmail(null);
              setCurrentPage("login");
              toast.success("Secure Session Terminated");
            }}
          />
        )}

        {currentPage === "registry" && (
          <RegistryView walletAddress={walletAddress} registerLand={registerLand} />
        )}
        
        {currentPage === "transfer" && (
          <TransferView walletAddress={walletAddress} transferOwnership={transferOwnership} />
        )}
        
        {currentPage === "admin" && (
          <AdminView parcels={parcels} verifyLand={verifyLand} />
        )}
      </main>

      {/* Modern Background Blur Decals (Optional for extra "website" feel) */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-indigo-500/5 blur-[120px] rounded-full" />
      </div>
    </div>
  );
};

export default Index;
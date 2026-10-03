











// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { MapPin, RefreshCw, LogOut, Wallet, Copy, ShieldCheck, ArrowRight } from "lucide-react";
// import { toast } from "sonner";

// interface DashboardViewProps {
//   setCurrentPage: (page: string) => void;      
//   logout?: () => void;
//   walletAddress?: string | null;
//   isAdmin: boolean; 
//   parcels?: any[];
// }

// const DashboardView = ({ setCurrentPage, logout, walletAddress, isAdmin, parcels = [] }: DashboardViewProps) => {
//   const pendingCount = parcels.filter(p => p.status === 'pending').length;

//   const copyToClipboard = () => {
//     if (!walletAddress) return;
//     navigator.clipboard.writeText(walletAddress);
//     toast.success("Wallet address copied!");
//   };

//   return (
//     <div className="min-h-screen bg-background p-8">
//       <div className="max-w-5xl mx-auto space-y-8">
        
//         {/* Wallet Connection Status */}
//         {walletAddress && (
//           <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//             <Card className="p-4 flex items-center justify-between border border-accent/20 bg-secondary/40 rounded-xl shadow-corporate">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
//                   <Wallet className="w-6 h-6 text-accent-foreground" />
//                 </div>
//                 <div>
//                   <h2 className="text-lg font-semibold">Wallet Connected</h2>
//                   <p className="text-sm text-muted-foreground font-mono">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</p>
//                 </div>
//               </div>
//               <Button variant="outline" size="sm" onClick={copyToClipboard}>
//                 <Copy className="w-4 h-4 mr-2" /> Copy
//               </Button>
//             </Card>
//           </motion.div>
//         )}

//         {/* 🛡️ Admin Portal - Triggered by Email Login */}
//         {isAdmin && (
//           <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
//             <Card className="p-6 border-2 border-blue-600/20 bg-blue-600/5 rounded-xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
//               <div className="flex items-center gap-4">
//                 <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center">
//                   <ShieldCheck className="w-8 h-8 text-white" />
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 flex items-center gap-2">
//                     Verification Portal
//                     {pendingCount > 0 && (
//                       <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full animate-pulse">
//                         {pendingCount} Pending
//                       </span>
//                     )}
//                   </h3>
//                   <p className="text-sm text-blue-700/70">Inspect land boundaries and verify legal documents.</p>
//                 </div>
//               </div>
//               <Button onClick={() => setCurrentPage("admin")} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8">
//                 Verify Records <ArrowRight className="ml-2 w-4 h-4" />
//               </Button>
//             </Card>
//           </motion.div>
//         )}

//         {/* Main User Actions */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
//           <Card className="p-8 text-center shadow-corporate hover:shadow-lg transition-all">
//             <MapPin className="w-12 h-12 text-accent mx-auto mb-4" />
//             <h3 className="text-2xl font-bold mb-2">Register Land</h3>
//             <p className="text-muted-foreground mb-6">Upload deeds and set GIS boundaries.</p>
//             <Button onClick={() => setCurrentPage("registry")} className="bg-accent w-full py-6 text-lg font-bold">
//               Go to Registry
//             </Button>
//           </Card>

//           <Card className="p-8 text-center shadow-corporate hover:shadow-lg transition-all">
//             <RefreshCw className="w-12 h-12 text-accent mx-auto mb-4" />
//             <h3 className="text-2xl font-bold mb-2">Transfer</h3>
//             <p className="text-muted-foreground mb-6">Change ownership via blockchain.</p>
//             <Button onClick={() => setCurrentPage("transfer")} className="bg-accent w-full py-6 text-lg font-bold">
//               Go to Transfer
//             </Button>
//           </Card>
//         </div>

//         {logout && (
//           <div className="flex justify-center mt-8">
//             <Button onClick={logout} variant="destructive" className="px-10"><LogOut className="w-4 h-4 mr-2" /> Logout</Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DashboardView;





















import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, RefreshCw, LogOut, Wallet, Copy, ShieldCheck, ArrowRight, Activity } from "lucide-react";
import { toast } from "sonner";

interface DashboardViewProps {
  setCurrentPage: (page: string) => void;      
  logout?: () => void;
  walletAddress?: string | null;
  isAdmin: boolean; 
  parcels?: any[];
}

const DashboardView = ({ setCurrentPage, logout, walletAddress, isAdmin, parcels = [] }: DashboardViewProps) => {
  const pendingCount = parcels.filter(p => p.status === 'pending' || !p.status).length;

  const copyToClipboard = () => {
    if (!walletAddress) return;
    navigator.clipboard.writeText(walletAddress);
    toast.success("Address copied to clipboard");
  };

  return (
    <div className="p-6 lg:p-12 max-w-[1400px] mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      
      {/* --- HERO HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-slate-200 dark:border-slate-800 pb-12">
        <div className="space-y-2">
          <h1 className="text-6xl font-black tracking-tighter text-slate-900 dark:text-white">
            Workspace<span className="text-blue-600">.</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium max-w-md">
            Decentralized asset management and secure GIS land registration.
          </p>
        </div>

        {/* Floating Wallet Stats */}
        <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-3 rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
          <div className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Wallet className="text-white w-6 h-6" />
          </div>
          <div className="pr-6">
            <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Node Address</span>
            <span className="text-sm font-mono font-bold text-slate-700 dark:text-slate-200">
              {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Disconnected"}
            </span>
          </div>
          <Button variant="ghost" size="icon" onClick={copyToClipboard} className="rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
            <Copy className="w-4 h-4 text-slate-400" />
          </Button>
        </div>
      </div>

      {/* --- ADMIN MASTER BENTO (Only for praneshnikhar@gmail.com) --- */}
      {isAdmin && (
        <motion.div 
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card className="relative overflow-hidden group border-none bg-slate-900 dark:bg-blue-600 p-10 text-white rounded-[3rem] shadow-2xl shadow-blue-500/20">
            {/* Background Decorative Element */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-700" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-[0.2em]">
                  <Activity className="w-3 h-3 text-green-400 animate-pulse" />
                  Privileged Access Active
                </div>
                <h2 className="text-5xl font-black tracking-tight leading-none">Control <br />Center</h2>
                <p className="text-blue-100/70 font-medium max-w-sm">
                  You have <span className="text-white font-bold underline decoration-green-400 underline-offset-8 decoration-2">{pendingCount} pending requests</span> requiring GIS verification and documentation review.
                </p>
              </div>
              
              <Button 
                onClick={() => setCurrentPage("admin")}
                className="bg-white text-slate-900 hover:bg-blue-50 rounded-[1.5rem] px-14 h-20 text-xl font-black shadow-2xl transition-all transform active:scale-95"
              >
                Verify Records <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </div>
          </Card>
        </motion.div>
      )}

      {/* --- ACTION BENTO GRID --- */}
      <div className="grid grid-cols-12 gap-8">
        
        {/* Register Bento Item */}
        <motion.div 
          whileHover={{ y: -8 }}
          className="col-span-12 lg:col-span-7"
        >
          <Card 
            onClick={() => setCurrentPage("registry")}
            className="h-full cursor-pointer group border-none bg-white dark:bg-slate-900 rounded-[3rem] p-10 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl transition-all border border-transparent hover:border-blue-500/20"
          >
            <div className="flex justify-between items-start mb-16">
              <div className="h-16 w-16 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center group-hover:bg-blue-600 transition-all duration-500">
                <MapPin className="w-8 h-8 text-slate-400 group-hover:text-white" />
              </div>
              <div className="p-3 rounded-full bg-slate-50 dark:bg-slate-800 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Land Registry</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed max-w-sm">
              Initialize new GIS boundaries and anchor legal deeds to the blockchain.
            </p>
          </Card>
        </motion.div>

        {/* Transfer Bento Item */}
        <motion.div 
          whileHover={{ y: -8 }}
          className="col-span-12 lg:col-span-5"
        >
          <Card 
            onClick={() => setCurrentPage("transfer")}
            className="h-full cursor-pointer group border-none bg-blue-600 dark:bg-slate-800 rounded-[3rem] p-10 shadow-xl shadow-blue-500/20 text-white transition-all overflow-hidden relative"
          >
             {/* Small visual accent */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-tl-[3rem]" />
            
            <div className="flex justify-between items-start mb-16">
              <div className="h-16 w-16 bg-white/10 rounded-3xl flex items-center justify-center group-hover:rotate-180 transition-transform duration-700">
                <RefreshCw className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-4xl font-black mb-4 tracking-tight">Transfer</h3>
            <p className="text-blue-100/80 font-medium text-lg leading-relaxed">
              Secure peer-to-peer ownership migration.
            </p>
          </Card>
        </motion.div>

        {/* Secondary Logout Action */}
        <div className="col-span-12 flex justify-center pt-8">
           <Button 
            onClick={logout} 
            variant="ghost" 
            className="text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 px-8 py-6 rounded-2xl font-bold"
           >
             <LogOut className="w-4 h-4 mr-2" /> Terminate Secure Session
           </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
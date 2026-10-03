// import { useState, useEffect } from 'react';
// import { ArrowRightLeft, Loader2, AlertCircle } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { toast } from 'sonner';

// interface LandParcel {
//   id: string;
//   landId: string;
//   owner: string;
//   location: string;
//   coordinates: { lat: number; lng: number };
//   timestamp: string;
// }

// interface TransferViewProps {
//   walletAddress: string | null;
//   transferOwnership: (landId: string, newOwner: string) => Promise<void>;
// }

// const TransferView = ({ walletAddress, transferOwnership }: TransferViewProps) => {
//   const [landId, setLandId] = useState('');
//   const [newOwner, setNewOwner] = useState('');
//   const [isTransferring, setIsTransferring] = useState(false);
//   const [parcels, setParcels] = useState<LandParcel[]>([]);
//   const [selectedParcel, setSelectedParcel] = useState<LandParcel | null>(null);

//   useEffect(() => {
//     const saved = localStorage.getItem('landParcels');
//     const allParcels: LandParcel[] = saved ? JSON.parse(saved) : [];
//     // Filter parcels owned by current user
//     const userParcels = allParcels.filter(p => 
//       p.owner.toLowerCase() === walletAddress?.toLowerCase()
//     );
//     setParcels(userParcels);
//   }, [walletAddress]);

//   useEffect(() => {
//     if (landId) {
//       const parcel = parcels.find(p => p.landId === landId);
//       setSelectedParcel(parcel || null);
//     } else {
//       setSelectedParcel(null);
//     }
//   }, [landId, parcels]);

//   const handleTransfer = async () => {
//     if (!landId || !newOwner) {
//       toast.error('Please fill in all fields');
//       return;
//     }

//     if (!selectedParcel) {
//       toast.error('Land ID not found or you do not own this land');
//       return;
//     }

//     if (selectedParcel.owner.toLowerCase() !== walletAddress?.toLowerCase()) {
//       toast.error('You are not the owner of this land');
//       return;
//     }

//     if (newOwner.toLowerCase() === walletAddress?.toLowerCase()) {
//       toast.error('Cannot transfer to yourself');
//       return;
//     }

//     if (!newOwner.match(/^0x[a-fA-F0-9]{40}$/)) {
//       toast.error('Invalid Ethereum address format');
//       return;
//     }

//     setIsTransferring(true);
    
//     try {
//       await transferOwnership(landId, newOwner);
      
//       // Update localStorage
//       const saved = localStorage.getItem('landParcels');
//       const allParcels: LandParcel[] = saved ? JSON.parse(saved) : [];
//       const updatedParcels = allParcels.map(p => 
//         p.landId === landId ? { ...p, owner: newOwner } : p
//       );
//       localStorage.setItem('landParcels', JSON.stringify(updatedParcels));
      
//       // Update local state
//       setParcels(updatedParcels.filter(p => 
//         p.owner.toLowerCase() === walletAddress?.toLowerCase()
//       ));
      
//       // Reset form
//       setLandId('');
//       setNewOwner('');
//       setSelectedParcel(null);
      
//       toast.success('Ownership transferred successfully!');
//     } catch (error) {
//       toast.error('Failed to transfer ownership');
//     } finally {
//       setIsTransferring(false);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="mb-8">
//         <h2 className="text-3xl font-bold text-foreground mb-2">Transfer Ownership</h2>
//         <p className="text-muted-foreground">Transfer land ownership to another address</p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Transfer Form */}
//         <Card className="p-6 shadow-corporate">
//           <h3 className="text-xl font-semibold text-foreground mb-6">Transfer Details</h3>
          
//           <div className="space-y-4">
//             <div>
//               <Label htmlFor="transfer-landId">Land ID</Label>
//               <Input
//                 id="transfer-landId"
//                 value={landId}
//                 onChange={(e) => setLandId(e.target.value)}
//                 placeholder="e.g., LAND-0001"
//                 className="mt-1"
//               />
//               <p className="text-xs text-muted-foreground mt-1">
//                 Enter the Land ID you want to transfer
//               </p>
//             </div>

//             {selectedParcel && (
//               <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
//                 <p className="text-sm font-semibold text-accent mb-2">Selected Land:</p>
//                 <p className="text-sm text-foreground"><strong>Location:</strong> {selectedParcel.location}</p>
//                 <p className="text-sm text-foreground"><strong>Current Owner:</strong></p>
//                 <p className="text-xs font-mono text-muted-foreground break-all">{selectedParcel.owner}</p>
//               </div>
//             )}

//             {landId && !selectedParcel && (
//               <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20 flex items-start gap-2">
//                 <AlertCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
//                 <p className="text-sm text-destructive">
//                   Land ID not found or you do not own this land
//                 </p>
//               </div>
//             )}

//             <div>
//               <Label htmlFor="newOwner">New Owner Address</Label>
//               <Input
//                 id="newOwner"
//                 value={newOwner}
//                 onChange={(e) => setNewOwner(e.target.value)}
//                 placeholder="0x..."
//                 className="mt-1 font-mono text-sm"
//               />
//               <p className="text-xs text-muted-foreground mt-1">
//                 Enter the Ethereum address of the new owner
//               </p>
//             </div>

//             <div className="pt-4 space-y-3">
//               <div className="p-3 bg-secondary rounded-lg">
//                 <p className="text-xs font-semibold text-foreground mb-1">Current Wallet:</p>
//                 <p className="text-xs font-mono text-muted-foreground break-all">
//                   {walletAddress}
//                 </p>
//               </div>

//               <div className="flex items-center gap-2 text-xs text-muted-foreground">
//                 <AlertCircle className="w-4 h-4" />
//                 <span>Only the current owner can transfer ownership</span>
//               </div>
//             </div>

//             <Button
//               onClick={handleTransfer}
//               disabled={isTransferring || !selectedParcel || !newOwner}
//               className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6 transition-smooth shadow-md"
//             >
//               {isTransferring ? (
//                 <>
//                   <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//                   Transferring Ownership...
//                 </>
//               ) : (
//                 <>
//                   <ArrowRightLeft className="mr-2 h-5 w-5" />
//                   Transfer Ownership
//                 </>
//               )}
//             </Button>
//           </div>
//         </Card>

//         {/* Your Land Parcels */}
//         <Card className="p-6 shadow-corporate">
//           <h3 className="text-xl font-semibold text-foreground mb-4">Your Land Parcels</h3>
          
//           {parcels.length === 0 ? (
//             <div className="text-center py-8">
//               <ArrowRightLeft className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
//               <p className="text-muted-foreground">You don't own any land parcels yet</p>
//             </div>
//           ) : (
//             <div className="space-y-3 max-h-96 overflow-y-auto">
//               {parcels.map((parcel) => (
//                 <button
//                   key={parcel.id}
//                   onClick={() => setLandId(parcel.landId)}
//                   className={`w-full text-left p-4 rounded-lg transition-smooth border ${
//                     landId === parcel.landId
//                       ? 'bg-accent/10 border-accent'
//                       : 'bg-secondary hover:bg-secondary/80 border-transparent'
//                   }`}
//                 >
//                   <div className="flex items-start justify-between mb-2">
//                     <span className="font-semibold text-foreground">{parcel.landId}</span>
//                     <span className="text-xs text-accent font-medium">Owned</span>
//                   </div>
//                   <p className="text-sm text-muted-foreground mb-1">{parcel.location}</p>
//                   <p className="text-xs text-muted-foreground">
//                     Registered: {new Date(parcel.timestamp).toLocaleDateString()}
//                   </p>
//                 </button>
//               ))}
//             </div>
//           )}
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default TransferView;


















// import { useState, useEffect } from 'react';
// import { 
//   ArrowRightLeft, 
//   Loader2, 
//   AlertCircle, 
//   Wallet, 
//   MapPin, 
//   Search, 
//   CheckCircle2, 
//   Activity // ✅ Ensure this is here
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { toast } from 'sonner';
// import { motion, AnimatePresence } from "framer-motion";

// interface LandParcel {
//   id: string;
//   landId: string;
//   owner: string;
//   location: string;
//   coordinates: { lat: number; lng: number };
//   timestamp: string;
// }

// interface TransferViewProps {
//   walletAddress: string | null;
//   transferOwnership: (landId: string, newOwner: string) => Promise<void>;
// }

// const TransferView = ({ walletAddress, transferOwnership }: TransferViewProps) => {
//   const [landId, setLandId] = useState('');
//   const [newOwner, setNewOwner] = useState('');
//   const [isTransferring, setIsTransferring] = useState(false);
//   const [parcels, setParcels] = useState<LandParcel[]>([]);
//   const [selectedParcel, setSelectedParcel] = useState<LandParcel | null>(null);

//   useEffect(() => {
//     const saved = localStorage.getItem('landParcels');
//     const allParcels: LandParcel[] = saved ? JSON.parse(saved) : [];
//     const userParcels = allParcels.filter(p => 
//       p.owner.toLowerCase() === walletAddress?.toLowerCase()
//     );
//     setParcels(userParcels);
//   }, [walletAddress]);

//   useEffect(() => {
//     if (landId) {
//       const parcel = parcels.find(p => p.landId === landId);
//       setSelectedParcel(parcel || null);
//     } else {
//       setSelectedParcel(null);
//     }
//   }, [landId, parcels]);

//   const handleTransfer = async () => {
//     if (!newOwner.match(/^0x[a-fA-F0-9]{40}$/)) {
//       toast.error('Invalid Ethereum address format');
//       return;
//     }

//     setIsTransferring(true);
//     try {
//       await transferOwnership(landId, newOwner);
//       const saved = localStorage.getItem('landParcels');
//       const allParcels: LandParcel[] = saved ? JSON.parse(saved) : [];
//       const updatedParcels = allParcels.map(p => 
//         p.landId === landId ? { ...p, owner: newOwner } : p
//       );
//       localStorage.setItem('landParcels', JSON.stringify(updatedParcels));
//       setParcels(updatedParcels.filter(p => p.owner.toLowerCase() === walletAddress?.toLowerCase()));
      
//       setLandId('');
//       setNewOwner('');
//       toast.success('Ownership migration successful');
//     } catch (error) {
//       toast.error('Transfer failed');
//     } finally {
//       setIsTransferring(false);
//     }
//   };

//   return (
//     <div className="p-6 lg:p-12 max-w-[1400px] mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
//       <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-200 dark:border-slate-800 pb-10">
//         <div>
//           <h1 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white mb-2 italic">
//             Migration<span className="text-blue-600">.</span>
//           </h1>
//           <p className="text-slate-500 font-medium font-sans">Immutable peer-to-peer ownership transfer protocol.</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-12 gap-8">
//         <div className="col-span-12 lg:col-span-7 space-y-6">
//           <Card className="p-10 border-none bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden">
//             <div className="relative z-10 space-y-8">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
//                   <ArrowRightLeft className="w-5 h-5" />
//                 </div>
//                 <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase font-sans">Transaction Details</h2>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Parcel Identity</Label>
//                   <div className="relative">
//                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//                     <Input
//                       value={landId}
//                       onChange={(e) => setLandId(e.target.value)}
//                       placeholder="Enter Land ID"
//                       className="h-16 pl-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 ring-blue-500 font-bold"
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Recipient Address</Label>
//                   <Input
//                     value={newOwner}
//                     onChange={(e) => setNewOwner(e.target.value)}
//                     placeholder="0x..."
//                     className="h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 ring-blue-500 font-mono text-xs"
//                   />
//                 </div>
//               </div>

//               <AnimatePresence mode="wait">
//                 {selectedParcel ? (
//                   <motion.div 
//                     initial={{ opacity: 0, scale: 0.95 }} 
//                     animate={{ opacity: 1, scale: 1 }}
//                     className="p-6 rounded-3xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 flex items-center justify-between"
//                   >
//                     <div className="flex items-center gap-4">
//                       <div className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white">
//                         <CheckCircle2 className="w-6 h-6" />
//                       </div>
//                       <div>
//                         <p className="text-xs font-black uppercase tracking-widest text-blue-600">Selected Asset</p>
//                         <p className="font-bold text-slate-900 dark:text-white">{selectedParcel.location}</p>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ) : landId && (
//                   <div className="p-6 rounded-3xl bg-red-50 text-red-600 text-sm font-bold flex items-center gap-3">
//                     <AlertCircle className="w-5 h-5" /> Identity not found in inventory.
//                   </div>
//                 )}
//               </AnimatePresence>

//               <Button
//                 onClick={handleTransfer}
//                 disabled={isTransferring || !selectedParcel || !newOwner}
//                 className="w-full h-20 bg-slate-900 dark:bg-blue-600 hover:scale-[1.01] transition-all rounded-[1.5rem] text-xl font-black text-white shadow-2xl"
//               >
//                 {isTransferring ? <Loader2 className="animate-spin" /> : "Authorize Migration"}
//               </Button>
//             </div>
//           </Card>
//         </div>

//         <div className="col-span-12 lg:col-span-5 space-y-6">
//           <Card className="p-8 border-none bg-slate-50 dark:bg-slate-900/40 rounded-[3rem] h-full flex flex-col">
//             <h3 className="text-xl font-black tracking-tight text-slate-900 dark:text-white mb-6 uppercase flex items-center gap-2 font-sans">
//               <Wallet className="w-5 h-5 text-blue-600" /> Your Inventory
//             </h3>
            
//             <div className="space-y-4 overflow-y-auto pr-2 max-h-[500px]">
//               {parcels.length === 0 ? (
//                 <div className="flex flex-col items-center justify-center h-64 opacity-30">
//                   <Activity className="w-12 h-12 mb-4" />
//                   <p className="font-bold">No assets found</p>
//                 </div>
//               ) : (
//                 parcels.map((parcel) => (
//                   <motion.button
//                     key={parcel.id}
//                     whileHover={{ x: 8 }}
//                     onClick={() => setLandId(parcel.landId)}
//                     className={`w-full text-left p-6 rounded-3xl transition-all border-2 ${
//                       landId === parcel.landId
//                         ? 'bg-white dark:bg-slate-800 border-blue-600 shadow-xl'
//                         : 'bg-white/50 dark:bg-slate-800/50 border-transparent hover:border-slate-200 dark:hover:border-slate-700'
//                     }`}
//                   >
//                     <span className="text-lg font-black text-slate-900 dark:text-white">{parcel.landId}</span>
//                     <p className="text-sm font-medium text-slate-500 mb-2">{parcel.location}</p>
//                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Secure Node Auth</p>
//                   </motion.button>
//                 ))
//               )}
//             </div>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TransferView;





















// import { useState, useEffect } from 'react';
// import { 
//   ArrowRightLeft, 
//   Loader2, 
//   AlertCircle, 
//   Wallet, 
//   MapPin, 
//   Search, 
//   CheckCircle2, 
//   Activity,
//   ArrowRight
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { toast } from 'sonner';
// import { motion, AnimatePresence } from "framer-motion";

// interface LandParcel {
//   id: string;
//   landId: string;
//   owner: string;
//   location: string;
//   coordinates: { lat: number; lng: number };
//   timestamp: string;
// }

// interface TransferViewProps {
//   walletAddress: string | null;
//   transferOwnership: (landId: string, newOwner: string) => Promise<void>;
// }

// const TransferView = ({ walletAddress, transferOwnership }: TransferViewProps) => {
//   const [landId, setLandId] = useState('');
//   const [newOwner, setNewOwner] = useState('');
//   const [searchQuery, setSearchQuery] = useState(''); // 🔍 New Search State
//   const [isTransferring, setIsTransferring] = useState(false);
//   const [parcels, setParcels] = useState<LandParcel[]>([]);
//   const [selectedParcel, setSelectedParcel] = useState<LandParcel | null>(null);

//   useEffect(() => {
//     const saved = localStorage.getItem('landParcels');
//     const allParcels: LandParcel[] = saved ? JSON.parse(saved) : [];
//     const userParcels = allParcels.filter(p => 
//       p.owner.toLowerCase() === walletAddress?.toLowerCase()
//     );
//     setParcels(userParcels);
//   }, [walletAddress]);

//   // Filter inventory based on search query
//   const filteredParcels = parcels.filter(p => 
//     p.landId.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     p.location.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   useEffect(() => {
//     if (landId) {
//       const parcel = parcels.find(p => p.landId === landId);
//       setSelectedParcel(parcel || null);
//     } else {
//       setSelectedParcel(null);
//     }
//   }, [landId, parcels]);

//   const handleTransfer = async () => {
//     if (!newOwner.match(/^0x[a-fA-F0-9]{40}$/)) {
//       toast.error('Invalid Ethereum address format');
//       return;
//     }

//     setIsTransferring(true);
//     try {
//       await transferOwnership(landId, newOwner);
//       const saved = localStorage.getItem('landParcels');
//       const allParcels: LandParcel[] = saved ? JSON.parse(saved) : [];
//       const updatedParcels = allParcels.map(p => 
//         p.landId === landId ? { ...p, owner: newOwner } : p
//       );
//       localStorage.setItem('landParcels', JSON.stringify(updatedParcels));
//       setParcels(updatedParcels.filter(p => p.owner.toLowerCase() === walletAddress?.toLowerCase()));
      
//       setLandId('');
//       setNewOwner('');
//       toast.success('Ownership migration successful');
//     } catch (error) {
//       toast.error('Transfer failed');
//     } finally {
//       setIsTransferring(false);
//     }
//   };

//   return (
//     <div className="p-6 lg:p-12 max-w-[1400px] mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
//       <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-200 dark:border-slate-800 pb-10">
//         <div>
//           <h1 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white mb-2 italic">
//             Migration<span className="text-blue-600">.</span>
//           </h1>
//           <p className="text-slate-500 font-medium font-sans">Immutable peer-to-peer ownership transfer protocol.</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-12 gap-8">
//         <div className="col-span-12 lg:col-span-7 space-y-6">
//           <Card className="p-10 border-none bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden">
//             <div className="relative z-10 space-y-8">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
//                   <ArrowRightLeft className="w-5 h-5" />
//                 </div>
//                 <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase font-sans">Transaction Details</h2>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Asset Identity (Transaction ID)</Label>
//                   <div className="relative">
//                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//                     <Input
//                       value={landId}
//                       onChange={(e) => setLandId(e.target.value)}
//                       placeholder="Enter Land ID"
//                       className="h-16 pl-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 ring-blue-500 font-bold"
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Recipient Node Address</Label>
//                   <Input
//                     value={newOwner}
//                     onChange={(e) => setNewOwner(e.target.value)}
//                     placeholder="0x..."
//                     className="h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 ring-blue-500 font-mono text-xs"
//                   />
//                 </div>
//               </div>

//               <AnimatePresence mode="wait">
//                 {selectedParcel ? (
//                   <motion.div 
//                     initial={{ opacity: 0, scale: 0.95 }} 
//                     animate={{ opacity: 1, scale: 1 }}
//                     className="p-6 rounded-3xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 flex items-center justify-between"
//                   >
//                     <div className="flex items-center gap-4">
//                       <div className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white">
//                         <CheckCircle2 className="w-6 h-6" />
//                       </div>
//                       <div>
//                         <p className="text-xs font-black uppercase tracking-widest text-blue-600">Verified Asset Lock</p>
//                         <p className="font-bold text-slate-900 dark:text-white">{selectedParcel.location}</p>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ) : landId && (
//                   <div className="p-6 rounded-3xl bg-red-50 text-red-600 text-sm font-bold flex items-center gap-3">
//                     <AlertCircle className="w-5 h-5" /> Identity not found in node inventory.
//                   </div>
//                 )}
//               </AnimatePresence>

//               <Button
//                 onClick={handleTransfer}
//                 disabled={isTransferring || !selectedParcel || !newOwner}
//                 className="w-full h-20 bg-slate-900 dark:bg-blue-600 hover:scale-[1.01] transition-all rounded-[1.5rem] text-xl font-black text-white shadow-xl"
//               >
//                 {isTransferring ? <Loader2 className="animate-spin" /> : "Authorize Migration"}
//               </Button>
//             </div>
//           </Card>
//         </div>

//         <div className="col-span-12 lg:col-span-5 space-y-6">
//           <Card className="p-8 border-none bg-slate-50 dark:bg-slate-900/40 rounded-[3rem] h-full flex flex-col">
//             <div className="flex items-center justify-between mb-6 px-2">
//               <h3 className="text-xl font-black tracking-tight text-slate-900 dark:text-white uppercase flex items-center gap-2 font-sans">
//                 <Wallet className="w-5 h-5 text-blue-600" /> Inventory
//               </h3>
              
//               {/* 🔍 Dynamic Search Component */}
//               <div className="relative group w-40">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
//                 <Input 
//                   placeholder="Filter ID..." 
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="pl-9 h-9 rounded-xl text-xs bg-white/50 border-slate-200 focus:ring-1 ring-blue-500"
//                 />
//               </div>
//             </div>
            
//             <div className="space-y-4 overflow-y-auto pr-2 max-h-[500px] scrollbar-hide">
//               {filteredParcels.length === 0 ? (
//                 <div className="flex flex-col items-center justify-center h-64 opacity-30">
//                   <Activity className="w-12 h-12 mb-4" />
//                   <p className="font-bold uppercase tracking-widest text-[10px]">No matches found</p>
//                 </div>
//               ) : (
//                 filteredParcels.map((parcel) => (
//                   <motion.button
//                     key={parcel.id}
//                     whileHover={{ x: 8 }}
//                     onClick={() => setLandId(parcel.landId)}
//                     className={`w-full text-left p-6 rounded-3xl transition-all border-2 flex items-center justify-between group ${
//                       landId === parcel.landId
//                         ? 'bg-white dark:bg-slate-800 border-blue-600 shadow-xl'
//                         : 'bg-white/50 dark:bg-slate-800/50 border-transparent hover:border-slate-200'
//                     }`}
//                   >
//                     <div>
//                       <span className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tighter">{parcel.landId}</span>
//                       <p className="text-sm font-medium text-slate-500 mb-2">{parcel.location}</p>
//                       <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-blue-500 transition-colors">Authorize Access</p>
//                     </div>
//                     <ArrowRight className={`w-5 h-5 text-blue-600 transition-transform ${landId === parcel.landId ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} />
//                   </motion.button>
//                 ))
//               )}
//             </div>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TransferView;

















import { useState, useEffect } from 'react';
import { 
  ArrowRightLeft, 
  Loader2, 
  AlertCircle, 
  Wallet, 
  Search, 
  CheckCircle2, 
  Activity,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { motion, AnimatePresence } from "framer-motion";

interface LandParcel {
  id: string;
  landId: string;
  owner: string;
  ownerName: string; // ✅ Added to track the person's name
  location: string;
  coordinates: { lat: number; lng: number };
  timestamp: string;
}

interface TransferViewProps {
  walletAddress: string | null;
  transferOwnership: (landId: string, newOwner: string) => Promise<void>;
}

const TransferView = ({ walletAddress, transferOwnership }: TransferViewProps) => {
  const [landId, setLandId] = useState('');
  const [newOwner, setNewOwner] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isTransferring, setIsTransferring] = useState(false);
  const [parcels, setParcels] = useState<LandParcel[]>([]);
  const [selectedParcel, setSelectedParcel] = useState<LandParcel | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('landParcels');
    const allParcels: LandParcel[] = saved ? JSON.parse(saved) : [];
    // Only show parcels owned by the current connected wallet
    const userParcels = allParcels.filter(p => 
      p.owner.toLowerCase() === walletAddress?.toLowerCase()
    );
    setParcels(userParcels);
  }, [walletAddress]);

  // ✅ Filter inventory by System Land ID, Owner Name, or Location
  const filteredParcels = parcels.filter(p => 
    p.landId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.ownerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (landId) {
      const parcel = parcels.find(p => p.landId === landId);
      setSelectedParcel(parcel || null);
    } else {
      setSelectedParcel(null);
    }
  }, [landId, parcels]);

  const handleTransfer = async () => {
    if (!newOwner.match(/^0x[a-fA-F0-9]{40}$/)) {
      toast.error('Invalid Ethereum address format');
      return;
    }

    setIsTransferring(true);
    try {
      await transferOwnership(landId, newOwner);
      
      const saved = localStorage.getItem('landParcels');
      const allParcels: LandParcel[] = saved ? JSON.parse(saved) : [];
      
      // Update the global state
      const updatedAllParcels = allParcels.map(p => 
        p.landId === landId ? { ...p, owner: newOwner } : p
      );
      
      localStorage.setItem('landParcels', JSON.stringify(updatedAllParcels));
      
      // Refresh local view
      setParcels(updatedAllParcels.filter(p => p.owner.toLowerCase() === walletAddress?.toLowerCase()));
      
      setLandId('');
      setNewOwner('');
      toast.success('Ownership migration successful');
    } catch (error) {
      toast.error('Transfer failed');
    } finally {
      setIsTransferring(false);
    }
  };

  return (
    <div className="p-6 lg:p-12 max-w-[1400px] mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-200 dark:border-slate-800 pb-10">
        <div>
          <h1 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white mb-2 italic">
            Migration<span className="text-blue-600">.</span>
          </h1>
          <p className="text-slate-500 font-medium font-sans">Blockchain-backed P2P asset migration.</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left: Transfer Execution Card */}
        <div className="col-span-12 lg:col-span-7 space-y-6">
          <Card className="p-10 border-none bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden">
            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                  <ArrowRightLeft className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase font-sans">Transfer Land Asset </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Target Asset ID</Label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      value={landId}
                      onChange={(e) => setLandId(e.target.value)}
                      placeholder="e.g. RESQ-L-XXXX"
                      className="h-16 pl-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 ring-blue-500 font-bold uppercase"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Recipient Public Key</Label>
                  <Input
                    value={newOwner}
                    onChange={(e) => setNewOwner(e.target.value)}
                    placeholder="0x..."
                    className="h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 ring-blue-500 font-mono text-xs"
                  />
                </div>
              </div>

              <AnimatePresence mode="wait">
                {selectedParcel ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-6 rounded-3xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white">
                        <UserCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-widest text-blue-600">Locked Asset Found</p>
                        <p className="font-bold text-slate-900 dark:text-white">{selectedParcel.ownerName} — {selectedParcel.location}</p>
                      </div>
                    </div>
                  </motion.div>
                ) : landId && (
                  <div className="p-6 rounded-3xl bg-red-50 text-red-600 text-sm font-bold flex items-center gap-3">
                    <AlertCircle className="w-5 h-5" /> No match for this System ID.
                  </div>
                )}
              </AnimatePresence>

              <Button
                onClick={handleTransfer}
                disabled={isTransferring || !selectedParcel || !newOwner}
                className="w-full h-20 bg-slate-900 dark:bg-blue-600 hover:scale-[1.01] transition-all rounded-[1.5rem] text-xl font-black text-white shadow-xl"
              >
                {isTransferring ? <Loader2 className="animate-spin" /> : "Authorize Migration"}
              </Button>
            </div>
          </Card>
        </div>

        {/* Right: Searchable User Inventory */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          <Card className="p-8 border-none bg-slate-50 dark:bg-slate-900/40 rounded-[3rem] h-full flex flex-col">
            <div className="flex items-center justify-between mb-6 px-2">
              <h3 className="text-xl font-black tracking-tight text-slate-900 dark:text-white uppercase flex items-center gap-2 font-sans">
                <Wallet className="w-5 h-5 text-blue-600" /> Your Assets
              </h3>
              
              <div className="relative group w-44">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <Input 
                  placeholder="Search Name/ID..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9 rounded-xl text-xs bg-white/50 border-slate-200 focus:ring-1 ring-blue-500 shadow-sm"
                />
              </div>
            </div>
            
            <div className="space-y-4 overflow-y-auto pr-2 max-h-[500px] scrollbar-hide">
              {filteredParcels.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 opacity-30">
                  <Activity className="w-12 h-12 mb-4" />
                  <p className="font-bold uppercase tracking-widest text-[10px]">Registry Empty</p>
                </div>
              ) : (
                filteredParcels.map((parcel) => (
                  <motion.button
                    key={parcel.id}
                    whileHover={{ x: 8 }}
                    onClick={() => setLandId(parcel.landId)}
                    className={`w-full text-left p-6 rounded-3xl transition-all border-2 flex items-center justify-between group ${
                      landId === parcel.landId
                        ? 'bg-white dark:bg-slate-800 border-blue-600 shadow-xl'
                        : 'bg-white/50 dark:bg-slate-800/50 border-transparent hover:border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                         <span className="text-[10px] font-black text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded-full">{parcel.landId}</span>
                      </div>
                      <span className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tighter block">{parcel.ownerName}</span>
                      <p className="text-xs font-medium text-slate-500">{parcel.location}</p>
                    </div>
                    <ArrowRight className={`w-5 h-5 text-blue-600 transition-transform ${landId === parcel.landId ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} />
                  </motion.button>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TransferView;
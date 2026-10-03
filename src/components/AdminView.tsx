
















// import { useState } from "react";
// import { CheckCircle, XCircle, Eye, ShieldCheck, FileText, ExternalLink, Clock, Map as MapIcon, Info, ArrowRight } from "lucide-react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { motion, AnimatePresence } from "framer-motion";
// import MapSimulator from "./MapSimulator";

// interface AdminViewProps {
//   parcels: any[];
//   verifyLand: (landId: string, approved: boolean) => Promise<void>;
// }

// const AdminView = ({ parcels, verifyLand }: AdminViewProps) => {
//   const [selectedParcel, setSelectedParcel] = useState<any>(null);
//   const [isProcessing, setIsProcessing] = useState(false);

//   const pendingParcels = parcels.filter(p => 
//     p.status === 'pending' || !p.status || p.status === ""
//   );

//   const handleAction = async (landId: string, approved: boolean) => {
//     setIsProcessing(true);
//     try {
//       await verifyLand(landId, approved);
//       if (approved) {
//         toast.success("Parcel officially verified");
//         if (selectedParcel?.landId === landId) {
//           setSelectedParcel({ ...selectedParcel, status: 'verified' });
//         }
//       } else {
//         toast.error("Parcel rejected and data purged");
//         setSelectedParcel(null); 
//       }
//     } catch (error) {
//       toast.error("Verification error");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] p-6 lg:p-10">
//       {/* --- Header Section --- */}
//       <div className="max-w-[1600px] mx-auto mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
//         <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
//           <div className="flex items-center gap-4 mb-2">
//             <div className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
//               <ShieldCheck className="text-white w-7 h-7" />
//             </div>
//             <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
//               Control Center
//             </h1>
//           </div>
//           <p className="text-slate-500 dark:text-slate-400 font-medium ml-1">
//             Verification Queue: <span className="text-blue-600">{pendingParcels.length} pending requests</span>
//           </p>
//         </motion.div>

//         <div className="flex gap-3">
//           <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 flex items-center gap-3 shadow-sm">
//             <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
//             <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Blockchain Sync: Active</span>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-[1600px] mx-auto grid grid-cols-12 gap-8">
//         {/* --- List Section --- */}
//         <div className="col-span-12 lg:col-span-7">
//           <Card className="border-none shadow-xl shadow-slate-200/50 dark:shadow-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-md overflow-hidden rounded-3xl">
//             <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
//               <h2 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
//                 <Clock className="w-4 h-4 text-blue-500" /> Incoming Requests
//               </h2>
//             </div>
            
//             <div className="overflow-hidden">
//               <table className="w-full">
//                 <thead>
//                   <tr className="text-slate-400 text-[11px] uppercase tracking-wider font-bold">
//                     <th className="px-6 py-4 text-left">Parcel Identity</th>
//                     <th className="px-6 py-4 text-left">Location</th>
//                     <th className="px-6 py-4 text-right">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
//                   <AnimatePresence>
//                     {pendingParcels.length === 0 ? (
//                       <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//                         <td colSpan={3} className="px-6 py-20 text-center text-slate-400 italic">
//                           No pending parcels found.
//                         </td>
//                       </motion.tr>
//                     ) : (
//                       pendingParcels.map((parcel) => (
//                         <motion.tr 
//                           key={parcel.id}
//                           layout
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: 1 }}
//                           exit={{ opacity: 0, x: -50 }}
//                           onClick={() => setSelectedParcel(parcel)}
//                           className={`group cursor-pointer transition-all hover:bg-blue-50/50 dark:hover:bg-blue-900/10 ${selectedParcel?.landId === parcel.landId ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
//                         >
//                           <td className="px-6 py-5">
//                             <div className="flex items-center gap-3">
//                               <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
//                                 <FileText className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
//                               </div>
//                               <div>
//                                 <div className="font-bold text-slate-900 dark:text-white">ID: {parcel.landId}</div>
//                                 <div className="text-[10px] font-mono text-slate-400 truncate w-32">{parcel.owner}</div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-6 py-5">
//                             <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{parcel.location}</span>
//                           </td>
//                           <td className="px-6 py-5 text-right">
//                             <Button size="sm" variant="ghost" className="rounded-lg hover:bg-white dark:hover:bg-slate-800 shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
//                               Inspect <ArrowRight className="ml-2 w-3 h-3" />
//                             </Button>
//                           </td>
//                         </motion.tr>
//                       ))
//                     )}
//                   </AnimatePresence>
//                 </tbody>
//               </table>
//             </div>
//           </Card>
//         </div>

//         {/* --- Inspection Sidebar --- */}
//         <div className="col-span-12 lg:col-span-5">
//           <AnimatePresence mode="wait">
//             {selectedParcel ? (
//               <motion.div
//                 key={selectedParcel.landId}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 className="space-y-6"
//               >
//                 {/* 🗺️ FIXED MAP CONTAINER: Fixed height and absolute centering */}
//                 {/* <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 relative h-[380px] w-full bg-slate-100">
//                    <div className="absolute inset-0 h-full w-full">
//                       <MapSimulator selectedParcel={selectedParcel} />
//                    </div>
//                    <div className="absolute top-4 left-4 z-[1000] bg-white/90 dark:bg-slate-900/90 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-bold shadow-sm flex items-center gap-2">
//                      <MapIcon className="w-3 h-3 text-blue-500" /> Boundary View
//                    </div>
//                 </div> */}


//                 <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 relative h-[380px] w-full bg-slate-100">
//                     <div className="absolute inset-0 h-full w-full">
//                         <MapSimulator selectedParcel={selectedParcel} />
//                     </div>
                    
//                     {/* ✅ UPDATED BADGE: Pushed further top/left and added z-index */}
//                     <div className="absolute top-0 left-3 z-[2000] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black shadow-xl flex items-center gap-2 border border-slate-200/50 dark:border-slate-700/50 pointer-events-none">
//                         <MapIcon className="w-3.5 h-3.5 text-blue-600" /> 
//                         <span className="uppercase tracking-widest text-slate-700 dark:text-slate-200">Boundary View</span>
//                     </div>
//                     </div>

//                 <Card className="p-6 rounded-3xl border-none shadow-xl bg-white dark:bg-slate-900 space-y-6">
//                   <div className="flex items-center justify-between">
//                     <h3 className="text-xl font-black text-slate-900 dark:text-white">Parcel Metadata</h3>
//                     <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${selectedParcel.status === 'verified' ? 'bg-green-500/10 text-green-600' : 'bg-amber-500/10 text-amber-600'}`}>
//                       {selectedParcel.status === 'verified' ? 'Verified' : 'Pending Review'}
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
//                       <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Coordinates</p>
//                       <p className="text-xs font-mono font-bold">
//                         {selectedParcel.coordinates?.lat?.toFixed(4) || "0"}, {selectedParcel.coordinates?.lng?.toFixed(4) || "0"}
//                       </p>
//                     </div>
//                     <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
//                       <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Date Logged</p>
//                       <p className="text-xs font-bold">{selectedParcel.timestamp ? new Date(selectedParcel.timestamp).toLocaleDateString() : "N/A"}</p>
//                     </div>
//                   </div>

//                   <div className="space-y-3">
//                     <p className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-widest">Verification Assets</p>
//                     {selectedParcel.documentUrl ? (
//                       <div className="flex items-center justify-between p-4 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/30">
//                         <div className="flex items-center gap-3">
//                           <FileText className="w-5 h-5" />
//                           <span className="text-sm font-bold italic truncate w-40">land_deed_{selectedParcel.landId}.pdf</span>
//                         </div>
//                         <Button size="icon" variant="ghost" className="hover:bg-white/20 text-white" asChild>
//                           <a href={selectedParcel.documentUrl} target="_blank" rel="noreferrer"><ExternalLink className="w-5 h-5" /></a>
//                         </Button>
//                       </div>
//                     ) : (
//                       <div className="p-4 rounded-2xl bg-red-50 text-red-600 border border-red-100 text-xs italic">
//                         No legal document attached.
//                       </div>
//                     )}
//                   </div>

//                   <div className="flex gap-4 pt-4">
//                     <Button 
//                       onClick={() => handleAction(selectedParcel.landId, false)}
//                       disabled={isProcessing}
//                       variant="outline" 
//                       className="flex-1 rounded-2xl h-14 border-slate-200 dark:border-slate-800 hover:bg-red-50 hover:text-red-600 transition-all font-bold"
//                     >
//                       <XCircle className="mr-2 w-5 h-5" /> Deny Claim
//                     </Button>
//                     <Button 
//                       onClick={() => handleAction(selectedParcel.landId, true)}
//                       disabled={isProcessing || selectedParcel.status === 'verified'}
//                       className="flex-1 rounded-2xl h-14 bg-slate-900 dark:bg-blue-600 hover:scale-105 transition-all shadow-lg font-bold text-white"
//                     >
//                       <CheckCircle className="mr-2 w-5 h-5" /> Approve Asset
//                     </Button>
//                   </div>
//                 </Card>
//               </motion.div>
//             ) : (
//               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//                 <Card className="h-[600px] flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20 text-center p-10">
//                   <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-3xl shadow-lg flex items-center justify-center mb-6">
//                     <Info className="w-10 h-10 text-slate-300" />
//                   </div>
//                   <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Select a Parcel</h4>
//                   <p className="text-slate-500 text-sm max-w-xs">Please choose a record from the list to begin the GIS and legal document verification process.</p>
//                 </Card>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminView;






















import { useState } from "react";
import { 
  CheckCircle, 
  XCircle, 
  ShieldCheck, 
  FileText, 
  ExternalLink, 
  Clock, 
  Map as MapIcon, 
  Info, 
  ArrowRight,
  User
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import MapSimulator from "./MapSimulator";

interface AdminViewProps {
  parcels: any[];
  verifyLand: (landId: string, approved: boolean) => Promise<void>;
}

const AdminView = ({ parcels, verifyLand }: AdminViewProps) => {
  const [selectedParcel, setSelectedParcel] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Filter for pending assets (either explicitly 'pending' or empty status) [cite: 133, 213]
  const pendingParcels = parcels.filter(p => 
    p.status === 'pending' || !p.status || p.status === ""
  );

  const handleAction = async (landId: string, approved: boolean) => {
    setIsProcessing(true);
    try {
      await verifyLand(landId, approved); // Executes the blockchain verification logic [cite: 196, 213]
      if (approved) {
        toast.success("Parcel officially verified");
        if (selectedParcel?.landId === landId) {
          setSelectedParcel({ ...selectedParcel, status: 'verified' });
        }
      } else {
        toast.error("Parcel rejected and data purged");
        setSelectedParcel(null); 
      }
    } catch (error) {
      toast.error("Verification error");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] p-6 lg:p-10">
      {/* --- Header Section --- */}
      <div className="max-w-[1600px] mx-auto mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-4 mb-2">
            <div className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <ShieldCheck className="text-white w-7 h-7" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white italic">
              Control Center<span className="text-blue-600">.</span>
            </h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-medium ml-1">
            Verification Queue: <span className="text-blue-600">{pendingParcels.length} pending requests</span>
          </p>
        </motion.div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 flex items-center gap-3 shadow-sm">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Blockchain Node: Online</span>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto grid grid-cols-12 gap-8">
        {/* --- LEFT: Incoming Requests List --- */}
        <div className="col-span-12 lg:col-span-7">
          <Card className="border-none shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md overflow-hidden rounded-[2.5rem]">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
              <h2 className="font-black text-xs uppercase tracking-widest text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" /> Pending Ledger Entry
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black">
                    <th className="px-8 py-4 text-left">Parcel Identity</th>
                    <th className="px-8 py-4 text-left">Location</th>
                    <th className="px-8 py-4 text-right">Audit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <AnimatePresence>
                    {pendingParcels.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-6 py-20 text-center text-slate-400 italic font-medium">
                          No pending verification requests.
                        </td>
                      </tr>
                    ) : (
                      pendingParcels.map((parcel) => (
                        <motion.tr 
                          key={parcel.id}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0, x: -50 }}
                          onClick={() => setSelectedParcel(parcel)}
                          className={`group cursor-pointer transition-all hover:bg-blue-500/5 ${selectedParcel?.landId === parcel.landId ? 'bg-blue-500/10' : ''}`}
                        >
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-4">
                              <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                                <FileText className="w-5 h-5 text-slate-500 group-hover:text-white" />
                              </div>
                              <div>
                                {/* System ID [cite: 148] */}
                                <div className="font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                                  {parcel.landId}
                                </div>
                                {/* ✅ UPDATED: Smaller Owner Name [cite: 150] */}
                                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 leading-none mt-1">
                                  {parcel.ownerName || "Unknown Applicant"}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{parcel.location}</span>
                          </td>
                          <td className="px-8 py-5 text-right">
                            <Button size="sm" variant="ghost" className="rounded-xl font-bold group-hover:translate-x-1 transition-transform">
                              Inspect <ArrowRight className="ml-2 w-3.5 h-3.5" />
                            </Button>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* --- RIGHT: Inspection Sidebar --- */}
        <div className="col-span-12 lg:col-span-5">
          <AnimatePresence mode="wait">
            {selectedParcel ? (
              <motion.div
                key={selectedParcel.landId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-6"
              >
                {/* GIS Visualization [cite: 123, 183] */}
                <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 relative h-[380px] w-full bg-slate-100">
                  <div className="absolute inset-0">
                    <MapSimulator selectedParcel={selectedParcel} />
                  </div>
                  <div className="absolute top-4 left-4 z-[2000] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black shadow-xl flex items-center gap-2 border border-slate-200/50">
                    <MapIcon className="w-3.5 h-3.5 text-blue-600" /> 
                    <span className="uppercase tracking-[0.2em] text-slate-700 dark:text-slate-200">GIS Layer Active</span>
                  </div>
                </div>

                <Card className="p-8 rounded-[2.5rem] border-none shadow-2xl bg-white dark:bg-slate-900 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black italic text-slate-900 dark:text-white">Audit Trail</h3>
                    <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${selectedParcel.status === 'verified' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}`}>
                      {selectedParcel.status === 'verified' ? 'Authorized' : 'Verification Required'}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* ✅ UPDATED: Applicant Name Metadata [cite: 150] */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 col-span-2">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Registrant Identity</p>
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-blue-600" />
                        <p className="text-sm font-bold text-slate-900 dark:text-white uppercase">{selectedParcel.ownerName || "Manual Entry"}</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Coordinates</p>
                      <p className="text-xs font-mono font-bold text-blue-600">
                        {selectedParcel.coordinates?.lat?.toFixed(4) || "0"}, {selectedParcel.coordinates?.lng?.toFixed(4) || "0"}
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Ledger Sync</p>
                      <p className="text-xs font-bold">{selectedParcel.timestamp ? new Date(selectedParcel.timestamp).toLocaleDateString() : "Pending"}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">Document Evidence [cite: 155]</p>
                    {selectedParcel.documentUrl ? (
                      <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-900 text-white shadow-xl">
                        <div className="flex items-center gap-4">
                          <FileText className="w-6 h-6 text-blue-400" />
                          <div className="flex flex-col">
                            <span className="text-[10px] uppercase font-black opacity-50">Proof of Deed</span>
                            <span className="text-xs font-bold truncate w-32">RESQ_DEED_{selectedParcel.landId}.pdf</span>
                          </div>
                        </div>
                        <Button size="icon" variant="ghost" className="hover:bg-white/10 text-white" asChild>
                          <a href={selectedParcel.documentUrl} target="_blank" rel="noreferrer"><ExternalLink className="w-5 h-5" /></a>
                        </Button>
                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl bg-red-50 text-red-600 border border-red-100 text-[10px] font-black uppercase text-center tracking-widest">
                        ⚠️ No Supporting Documentation Uploaded
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button 
                      onClick={() => handleAction(selectedParcel.landId, false)}
                      disabled={isProcessing}
                      variant="outline" 
                      className="flex-1 rounded-[1.5rem] h-16 border-slate-200 hover:bg-red-50 hover:text-red-600 transition-all font-black uppercase text-[10px] tracking-[0.2em]"
                    >
                      <XCircle className="mr-2 w-5 h-5" /> Reject
                    </Button>
                    <Button 
                      onClick={() => handleAction(selectedParcel.landId, true)}
                      disabled={isProcessing || selectedParcel.status === 'verified'}
                      className="flex-1 rounded-[1.5rem] h-16 bg-blue-600 hover:bg-blue-700 transition-all shadow-xl font-black uppercase text-[10px] tracking-[0.2em] text-white"
                    >
                      <CheckCircle className="mr-2 w-5 h-5" /> Approve
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Card className="h-[600px] flex flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed border-slate-200 bg-white/30 text-center p-12">
                  <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-[2rem] shadow-2xl flex items-center justify-center mb-8">
                    <Info className="w-10 h-10 text-blue-500 opacity-20" />
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-3 italic">Selection Required</h4>
                  <p className="text-slate-400 text-xs font-medium max-w-xs leading-relaxed">
                    Select a node from the global inventory queue to initiate the GIS boundary cross-check and legal deed verification protocol.
                  </p>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AdminView;
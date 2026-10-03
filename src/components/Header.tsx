
// import { Moon, Sun, Wallet } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom"; //added import

// interface HeaderProps {
//   theme: "light" | "dark";
//   toggleTheme: () => void;
//   walletAddress: string | null;
// }

// const Header = ({ theme, toggleTheme, walletAddress }: HeaderProps) => {
//   return (
//     <header className="border-b bg-card shadow-corporate transition-smooth">
//       <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//         {/* Clickable Logo */}
//         <Link
//           to="/"
//           className="flex items-center gap-3 group hover:opacity-90 hover:scale-[1.03] transition-all duration-200"
//         >
//           <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center group-hover:rotate-6 transition-transform">
//             <Wallet className="w-6 h-6 text-accent-foreground" />
//           </div>
//           <div>
//             <h1 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
//               ResQ-Land
//             </h1>
//             <p className="text-xs text-muted-foreground">
//               Blockchain Land Management
//             </p>
//           </div>
//         </Link>

//         {/* Right-side Controls */}
//         <div className="flex items-center gap-3">
//           {walletAddress && (
//             <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg">
//               <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
//               <span className="text-sm font-medium text-secondary-foreground">
//                 {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
//               </span>
//             </div>
//           )}

//           {/* Theme Toggle */}
//           <Button
//             variant="outline"
//             size="icon"
//             onClick={toggleTheme}
//             className="transition-all duration-300 hover:bg-secondary hover:scale-105"
//           >
//             {theme === "light" ? (
//               <Moon className="h-5 w-5" />
//             ) : (
//               <Sun className="h-5 w-5" />
//             )}
//           </Button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;










import { Moon, Sun, Wallet, Activity, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface HeaderProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
  walletAddress: string | null;
}

const Header = ({ theme, toggleTheme, walletAddress }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-[5000] w-full px-6 py-4">
      {/* --- Floating Glass Container --- */}
      <div className="max-w-[1600px] mx-auto bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/20 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none rounded-[2rem] px-8 py-4 flex items-center justify-between transition-all duration-500">
        
        {/* --- Brand Identity --- */}
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 dark:bg-blue-600 flex items-center justify-center shadow-lg group-hover:rotate-[10deg] transition-transform duration-300">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            {/* Pulsing indicator */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-white dark:border-slate-900 rounded-full animate-pulse" />
          </div>
          
          <div className="hidden sm:block">
            {/* ✅ Removed the blue dot span */}
            <h1 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white italic leading-none">
              ResQ Land
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mt-1">
              Blockchain Land Management
            </p>
          </div>
        </div>

        {/* --- Controls & Status --- */}
        <div className="flex items-center gap-4">
          {walletAddress && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="hidden lg:flex items-center gap-3 px-5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-inner"
            >
              <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
              <div className="flex flex-col">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Active Identity</span>
                <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-200 leading-tight mt-1">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </span>
              </div>
            </motion.div>
          )}

          <div className="h-10 w-px bg-slate-200 dark:bg-slate-800 mx-2 hidden sm:block" />

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="w-12 h-12 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 group"
          >
            {theme === "light" ? (
              <Moon className="h-6 w-6 text-slate-600 group-hover:text-blue-600 transition-colors" />
            ) : (
              <Sun className="h-6 w-6 text-slate-300 group-hover:text-amber-400 transition-colors" />
            )}
          </Button>

          {/* ✅ Blue square/avatar div has been removed entirely for a cleaner look */}
        </div>
      </div>
    </header>
  );
};

export default Header;
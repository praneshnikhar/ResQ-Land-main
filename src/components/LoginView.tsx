// import { useState } from 'react';
// import { Wallet, Shield, Globe, Mail, Lock } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { toast } from 'sonner';
// import { authStorage } from '@/utils/authStorage';

// interface LoginViewProps {
//   connectWallet: () => Promise<void>;
//   onAuthSuccess: (email: string) => void;
// }

// const LoginView = ({ connectWallet, onAuthSuccess }: LoginViewProps) => {
//   const [mode, setMode] = useState<'wallet' | 'signup' | 'login'>('wallet');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignup = () => {
//     if (!email || !password) {
//       toast.error('Please fill in all fields');
//       return;
//     }

//     if (password.length < 6) {
//       toast.error('Password must be at least 6 characters');
//       return;
//     }

//     const result = authStorage.registerUser(email, password);
//     if (result.success) {
//       toast.success(result.message);
//       onAuthSuccess(email);
//     } else {
//       toast.error(result.message);
//     }
//   };

//   const handleLogin = () => {
//     if (!email || !password) {
//       toast.error('Please fill in all fields');
//       return;
//     }

//     const result = authStorage.loginUser(email, password);
//     if (result.success) {
//       toast.success(result.message);
//       onAuthSuccess(email);
//     } else {
//       toast.error(result.message);
//     }
//   };

//   if (mode === 'signup') {
//     return (
//       <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-secondary/30 to-background">
//         <Card className="w-full max-w-md p-8 shadow-corporate-lg">
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-2xl mb-4">
//               <Mail className="w-8 h-8 text-accent-foreground" />
//             </div>
//             <h2 className="text-3xl font-bold text-foreground mb-2">Create Account</h2>
//             <p className="text-muted-foreground">Register for LandChain Registry</p>
//           </div>

//           <div className="space-y-4">
//             <div>
//               <Label htmlFor="signup-email">Email Address</Label>
//               <Input
//                 id="signup-email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="your@email.com"
//                 className="mt-1"
//               />
//             </div>

//             <div>
//               <Label htmlFor="signup-password">Password</Label>
//               <Input
//                 id="signup-password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Minimum 6 characters"
//                 className="mt-1"
//               />
//             </div>

//             <Button 
//               onClick={handleSignup}
//               className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6 transition-smooth shadow-md"
//             >
//               Sign Up
//             </Button>
//           </div>

//           <div className="mt-6 text-center">
//             <button 
//               onClick={() => setMode('wallet')}
//               className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
//             >
//               ← Back to wallet connection
//             </button>
//           </div>
//         </Card>
//       </div>
//     );
//   }

//   if (mode === 'login') {
//     return (
//       <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-secondary/30 to-background">
//         <Card className="w-full max-w-md p-8 shadow-corporate-lg">
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-2xl mb-4">
//               <Lock className="w-8 h-8 text-accent-foreground" />
//             </div>
//             <h2 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h2>
//             <p className="text-muted-foreground">Login to your account</p>
//           </div>

//           <div className="space-y-4">
//             <div>
//               <Label htmlFor="login-email">Email Address</Label>
//               <Input
//                 id="login-email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="your@email.com"
//                 className="mt-1"
//               />
//             </div>

//             <div>
//               <Label htmlFor="login-password">Password</Label>
//               <Input
//                 id="login-password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password"
//                 className="mt-1"
//               />
//             </div>

//             <Button 
//               onClick={handleLogin}
//               className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6 transition-smooth shadow-md"
//             >
//               Log In
//             </Button>
//           </div>

//           <div className="mt-6 text-center">
//             <button 
//               onClick={() => setMode('wallet')}
//               className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
//             >
//               ← Back to wallet connection
//             </button>
//           </div>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-secondary/30 to-background">
//       <Card className="w-full max-w-md p-8 shadow-corporate-lg">
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-2xl mb-4">
//             <Wallet className="w-8 h-8 text-accent-foreground" />
//           </div>
//           <h2 className="text-3xl font-bold text-foreground mb-2">Welcome to ResQ-Land</h2>
//           <p className="text-muted-foreground">Secure blockchain-based land registry system</p>
//         </div>

//         <div className="space-y-4 mb-8">
//           <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
//             <Shield className="w-5 h-5 text-accent mt-0.5" />
//             <div>
//               <h3 className="font-semibold text-sm text-foreground">Secure & Transparent</h3>
//               <p className="text-xs text-muted-foreground">All transactions recorded on blockchain</p>
//             </div>
//           </div>
          
//           <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
//             <Globe className="w-5 h-5 text-accent mt-0.5" />
//             <div>
//               <h3 className="font-semibold text-sm text-foreground">Immutable Records</h3>
//               <p className="text-xs text-muted-foreground">Permanent and tamper-proof ownership</p>
//             </div>
//           </div>
//         </div>

//         <Button 
//           onClick={connectWallet}
//           className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6 transition-smooth shadow-md"
//         >
//           <Wallet className="mr-2 h-5 w-5" />
//           Connect MetaMask Wallet
//         </Button>

//         <div className="mt-6 flex items-center gap-4">
//           <div className="flex-1 h-px bg-border" />
//           <span className="text-xs text-muted-foreground">or</span>
//           <div className="flex-1 h-px bg-border" />
//         </div>

//         <div className="mt-6 grid grid-cols-2 gap-3">
//           <Button 
//             variant="outline" 
//             className="transition-smooth"
//             onClick={() => setMode('signup')}
//           >
//             Sign Up
//           </Button>
//           <Button 
//             variant="outline" 
//             className="transition-smooth"
//             onClick={() => setMode('login')}
//           >
//             Log In
//           </Button>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default LoginView;




















import { useState } from 'react';
import { Wallet, Shield, Globe, Mail, Lock, ArrowRight, UserPlus, LogIn, ChevronLeft, Fingerprint } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { authStorage } from '@/utils/authStorage';
import { motion, AnimatePresence } from "framer-motion";

interface LoginViewProps {
  connectWallet: () => Promise<void>;
  onAuthSuccess: (email: string) => void;
}

const LoginView = ({ connectWallet, onAuthSuccess }: LoginViewProps) => {
  const [mode, setMode] = useState<'wallet' | 'signup' | 'login'>('wallet');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    if (!email || !password) return toast.error('Please fill in all fields');
    if (password.length < 6) return toast.error('Password must be at least 6 characters');

    const result = authStorage.registerUser(email, password);
    if (result.success) {
      toast.success(result.message);
      onAuthSuccess(email);
    } else {
      toast.error(result.message);
    }
  };

  const handleLogin = () => {
    if (!email || !password) return toast.error('Please fill in all fields');
    const result = authStorage.loginUser(email, password);
    if (result.success) {
      toast.success(result.message);
      onAuthSuccess(email);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden bg-[#f8fafc] dark:bg-[#020617]">
      
      {/* --- Ambient Background Orbs --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full animate-pulse" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 bg-white/70 dark:bg-slate-900/70 backdrop-blur-3xl rounded-[3rem] border border-white/20 dark:border-white/5 shadow-2xl overflow-hidden min-h-[700px]"
      >
        
        {/* --- Left Branding Panel --- */}
        <div className="hidden lg:flex flex-col justify-between p-16 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[size:32px_32px]" />
          </div>
          
          <div className="relative z-10">
            <div className="h-16 w-16 bg-emerald-500 rounded-2xl flex items-center justify-center mb-10 shadow-xl shadow-emerald-500/20">
              <Globe className="w-9 h-9 text-white" />
            </div>
            <h1 className="text-6xl font-black tracking-tighter leading-[0.9] mb-8">
              ResQ<span className="text-emerald-400">.</span><br />
              Land
            </h1>
            <p className="text-slate-400 text-lg font-medium max-w-xs leading-relaxed">
              Decentralized infrastructure for immutable property records and GIS-verified land titles.
            </p>
          </div>

          <div className="relative z-10 space-y-8">
            <div className="flex items-center gap-5">
              <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                <Shield className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Verification</p>
                <p className="text-sm font-bold text-slate-200 uppercase">Tamper-Proof Ledger</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- Right Interaction Panel --- */}
        <div className="p-10 lg:p-20 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            
            {/* WALLET MODE */}
            {mode === 'wallet' && (
              <motion.div 
                key="wallet" 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div>
                  <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-3">Initialize.</h2>
                  <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Connect your node to the registry.</p>
                </div>

                <div className="space-y-4">
                  <Button 
                    onClick={connectWallet}
                    className="w-full h-24 bg-emerald-600 hover:bg-emerald-500 text-white rounded-[2rem] flex items-center justify-between px-10 transition-all hover:scale-[1.02] shadow-2xl shadow-emerald-500/20 group"
                  >
                    <div className="flex items-center gap-6">
                      <div className="h-12 w-12 bg-white/20 rounded-2xl flex items-center justify-center">
                        <Wallet className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <span className="block text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Primary Gateway</span>
                        <span className="block text-xl font-black italic">MetaMask</span>
                      </div>
                    </div>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
                  </Button>

                  <div className="flex items-center gap-4 py-4">
                    <div className="flex-grow h-px bg-slate-200 dark:bg-slate-800" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Legacy Login</span>
                    <div className="flex-grow h-px bg-slate-200 dark:bg-slate-800" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button onClick={() => setMode('signup')} variant="outline" className="h-16 rounded-2xl border-slate-200 dark:border-slate-800 font-bold hover:bg-slate-50 transition-all">
                      <UserPlus className="mr-2 w-4 h-4" /> Sign Up
                    </Button>
                    <Button onClick={() => setMode('login')} variant="outline" className="h-16 rounded-2xl border-slate-200 dark:border-slate-800 font-bold hover:bg-slate-50 transition-all">
                      <LogIn className="mr-2 w-4 h-4" /> Login
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SIGNUP / LOGIN FORMS */}
            {(mode === 'signup' || mode === 'login') && (
              <motion.div 
                key="forms" 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                <button onClick={() => setMode('wallet')} className="flex items-center text-xs font-black uppercase tracking-widest text-slate-400 hover:text-blue-500 transition-colors">
                  <ChevronLeft className="w-4 h-4 mr-1" /> Back to wallet
                </button>

                <div>
                  <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                    {mode === 'signup' ? 'Create.' : 'Welcome.'}
                  </h2>
                  <p className="text-slate-500 font-medium">Please enter your credentials.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest ml-1 text-slate-400">Email Address</Label>
                    <Input 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-14 rounded-2xl border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50" 
                      placeholder="name@protocol.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest ml-1 text-slate-400">Secure Password</Label>
                    <Input 
                      type="password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-14 rounded-2xl border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50"
                      placeholder="••••••••"
                    />
                  </div>
                  <Button 
                    onClick={mode === 'signup' ? handleSignup : handleLogin}
                    className="w-full h-16 rounded-2xl bg-slate-900 dark:bg-blue-600 text-white font-black text-lg hover:scale-[1.01] transition-all shadow-xl"
                  >
                    {mode === 'signup' ? 'Register Account' : 'Authenticate'}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-auto pt-10 text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              Authorized Access Only <span className="mx-2">•</span> Secure Node v3.0
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginView;
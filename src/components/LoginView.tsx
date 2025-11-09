import { useState } from 'react';
import { Wallet, Shield, Globe, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { authStorage } from '@/utils/authStorage';

interface LoginViewProps {
  connectWallet: () => Promise<void>;
  onAuthSuccess: (email: string) => void;
}

const LoginView = ({ connectWallet, onAuthSuccess }: LoginViewProps) => {
  const [mode, setMode] = useState<'wallet' | 'signup' | 'login'>('wallet');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    const result = authStorage.registerUser(email, password);
    if (result.success) {
      toast.success(result.message);
      onAuthSuccess(email);
    } else {
      toast.error(result.message);
    }
  };

  const handleLogin = () => {
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    const result = authStorage.loginUser(email, password);
    if (result.success) {
      toast.success(result.message);
      onAuthSuccess(email);
    } else {
      toast.error(result.message);
    }
  };

  if (mode === 'signup') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-secondary/30 to-background">
        <Card className="w-full max-w-md p-8 shadow-corporate-lg">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-2xl mb-4">
              <Mail className="w-8 h-8 text-accent-foreground" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Create Account</h2>
            <p className="text-muted-foreground">Register for LandChain Registry</p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="signup-email">Email Address</Label>
              <Input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="signup-password">Password</Label>
              <Input
                id="signup-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="mt-1"
              />
            </div>

            <Button 
              onClick={handleSignup}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6 transition-smooth shadow-md"
            >
              Sign Up
            </Button>
          </div>

          <div className="mt-6 text-center">
            <button 
              onClick={() => setMode('wallet')}
              className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
            >
              ← Back to wallet connection
            </button>
          </div>
        </Card>
      </div>
    );
  }

  if (mode === 'login') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-secondary/30 to-background">
        <Card className="w-full max-w-md p-8 shadow-corporate-lg">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-2xl mb-4">
              <Lock className="w-8 h-8 text-accent-foreground" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h2>
            <p className="text-muted-foreground">Login to your account</p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="login-email">Email Address</Label>
              <Input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="login-password">Password</Label>
              <Input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="mt-1"
              />
            </div>

            <Button 
              onClick={handleLogin}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6 transition-smooth shadow-md"
            >
              Log In
            </Button>
          </div>

          <div className="mt-6 text-center">
            <button 
              onClick={() => setMode('wallet')}
              className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
            >
              ← Back to wallet connection
            </button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-secondary/30 to-background">
      <Card className="w-full max-w-md p-8 shadow-corporate-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-2xl mb-4">
            <Wallet className="w-8 h-8 text-accent-foreground" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome to ResQ-Land</h2>
          <p className="text-muted-foreground">Secure blockchain-based land registry system</p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
            <Shield className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <h3 className="font-semibold text-sm text-foreground">Secure & Transparent</h3>
              <p className="text-xs text-muted-foreground">All transactions recorded on blockchain</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
            <Globe className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <h3 className="font-semibold text-sm text-foreground">Immutable Records</h3>
              <p className="text-xs text-muted-foreground">Permanent and tamper-proof ownership</p>
            </div>
          </div>
        </div>

        <Button 
          onClick={connectWallet}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6 transition-smooth shadow-md"
        >
          <Wallet className="mr-2 h-5 w-5" />
          Connect MetaMask Wallet
        </Button>

        <div className="mt-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="transition-smooth"
            onClick={() => setMode('signup')}
          >
            Sign Up
          </Button>
          <Button 
            variant="outline" 
            className="transition-smooth"
            onClick={() => setMode('login')}
          >
            Log In
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LoginView;








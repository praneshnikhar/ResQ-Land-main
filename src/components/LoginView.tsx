import { Wallet, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface LoginViewProps {
  connectWallet: () => Promise<void>;
}

const LoginView = ({ connectWallet }: LoginViewProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-secondary/30 to-background">
      <Card className="w-full max-w-md p-8 shadow-corporate-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-2xl mb-4">
            <Wallet className="w-8 h-8 text-accent-foreground" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome to LandChain</h2>
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
          <Button variant="outline" className="transition-smooth">
            Sign Up
          </Button>
          <Button variant="outline" className="transition-smooth">
            Log In
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LoginView;

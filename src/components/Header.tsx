import { Moon, Sun, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  walletAddress: string | null;
}

const Header = ({ theme, toggleTheme, walletAddress }: HeaderProps) => {
  return (
    <header className="border-b bg-card shadow-corporate transition-smooth">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
            <Wallet className="w-6 h-6 text-accent-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">LandChain Registry</h1>
            <p className="text-xs text-muted-foreground">Blockchain Land Management</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {walletAddress && (
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-sm font-medium text-secondary-foreground">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </span>
            </div>
          )}
          
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="transition-smooth hover:bg-secondary"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

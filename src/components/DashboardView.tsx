import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, FileText, RefreshCw, LogOut, Wallet, Copy } from "lucide-react";
import { toast } from "sonner";

interface DashboardViewProps {
  setCurrentPage: (page: string) => void;      
  logout?: () => void;
  walletAddress?: string | null; // added for wallet display
}

const DashboardView = ({ setCurrentPage, logout, walletAddress }: DashboardViewProps) => {
  const copyToClipboard = () => {
    if (!walletAddress) return;
    navigator.clipboard.writeText(walletAddress);
    toast.success("Wallet address copied!");
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* 🌍 Wallet Connected Card */}
        {walletAddress && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-4 flex items-center justify-between border border-accent/20 bg-secondary/40 rounded-xl shadow-corporate">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Wallet Connected</h2>
                  <p className="text-sm text-muted-foreground font-mono">
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="flex items-center gap-2 border-accent hover:bg-accent/10 transition-all"
              >
                <Copy className="w-4 h-4" /> Copy
              </Button>
            </Card>
          </motion.div>
        )}

        {/*  Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Welcome to ResQ-Land Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage, verify, and transfer your blockchain-secured land records
          </p>
        </motion.div>

        {/*  Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 flex flex-col items-center justify-center text-center shadow-corporate hover:shadow-corporate-lg transition-all duration-300">
              <MapPin className="w-10 h-10 text-accent mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Register New Land
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Add a new land parcel with location, coordinates, and documents.
              </p>
              <Button
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-2 font-semibold"
                onClick={() => setCurrentPage("registry")}
              >
                Go to Registry
              </Button>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-6 flex flex-col items-center justify-center text-center shadow-corporate hover:shadow-corporate-lg transition-all duration-300">
              <RefreshCw className="w-10 h-10 text-accent mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Transfer Ownership
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Seamlessly transfer land ownership on the blockchain network.
              </p>
              <Button
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-2 font-semibold"
                onClick={() => setCurrentPage("transfer")}
              >
                Go to Transfer
              </Button>
            </Card>
          </motion.div>
        </div>

        {/*  Records Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="p-6 flex flex-col md:flex-row items-center justify-between bg-secondary/40 border border-accent/10 rounded-xl">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                View Registered Lands
              </h3>
              <p className="text-sm text-muted-foreground">
                Check and manage your registered land parcels with full details.
              </p>
            </div>
            <Button
              variant="outline"
              className="mt-4 md:mt-0 border-accent text-accent hover:bg-accent/10"
              onClick={() => setCurrentPage("registry")}
            >
              <FileText className="w-4 h-4 mr-2" /> View Records
            </Button>
          </Card>
        </motion.div>

        {/*  Logout Button */}
        {logout && (
          <div className="flex justify-center mt-8">
            <Button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2 px-5 py-2"
            >
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardView;








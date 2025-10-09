import { useState, useEffect } from 'react';
import { ArrowRightLeft, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface LandParcel {
  id: string;
  landId: string;
  owner: string;
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
  const [isTransferring, setIsTransferring] = useState(false);
  const [parcels, setParcels] = useState<LandParcel[]>([]);
  const [selectedParcel, setSelectedParcel] = useState<LandParcel | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('landParcels');
    const allParcels: LandParcel[] = saved ? JSON.parse(saved) : [];
    // Filter parcels owned by current user
    const userParcels = allParcels.filter(p => 
      p.owner.toLowerCase() === walletAddress?.toLowerCase()
    );
    setParcels(userParcels);
  }, [walletAddress]);

  useEffect(() => {
    if (landId) {
      const parcel = parcels.find(p => p.landId === landId);
      setSelectedParcel(parcel || null);
    } else {
      setSelectedParcel(null);
    }
  }, [landId, parcels]);

  const handleTransfer = async () => {
    if (!landId || !newOwner) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!selectedParcel) {
      toast.error('Land ID not found or you do not own this land');
      return;
    }

    if (selectedParcel.owner.toLowerCase() !== walletAddress?.toLowerCase()) {
      toast.error('You are not the owner of this land');
      return;
    }

    if (newOwner.toLowerCase() === walletAddress?.toLowerCase()) {
      toast.error('Cannot transfer to yourself');
      return;
    }

    if (!newOwner.match(/^0x[a-fA-F0-9]{40}$/)) {
      toast.error('Invalid Ethereum address format');
      return;
    }

    setIsTransferring(true);
    
    try {
      await transferOwnership(landId, newOwner);
      
      // Update localStorage
      const saved = localStorage.getItem('landParcels');
      const allParcels: LandParcel[] = saved ? JSON.parse(saved) : [];
      const updatedParcels = allParcels.map(p => 
        p.landId === landId ? { ...p, owner: newOwner } : p
      );
      localStorage.setItem('landParcels', JSON.stringify(updatedParcels));
      
      // Update local state
      setParcels(updatedParcels.filter(p => 
        p.owner.toLowerCase() === walletAddress?.toLowerCase()
      ));
      
      // Reset form
      setLandId('');
      setNewOwner('');
      setSelectedParcel(null);
      
      toast.success('Ownership transferred successfully!');
    } catch (error) {
      toast.error('Failed to transfer ownership');
    } finally {
      setIsTransferring(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Transfer Ownership</h2>
        <p className="text-muted-foreground">Transfer land ownership to another address</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transfer Form */}
        <Card className="p-6 shadow-corporate">
          <h3 className="text-xl font-semibold text-foreground mb-6">Transfer Details</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="transfer-landId">Land ID</Label>
              <Input
                id="transfer-landId"
                value={landId}
                onChange={(e) => setLandId(e.target.value)}
                placeholder="e.g., LAND-0001"
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Enter the Land ID you want to transfer
              </p>
            </div>

            {selectedParcel && (
              <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                <p className="text-sm font-semibold text-accent mb-2">Selected Land:</p>
                <p className="text-sm text-foreground"><strong>Location:</strong> {selectedParcel.location}</p>
                <p className="text-sm text-foreground"><strong>Current Owner:</strong></p>
                <p className="text-xs font-mono text-muted-foreground break-all">{selectedParcel.owner}</p>
              </div>
            )}

            {landId && !selectedParcel && (
              <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                <p className="text-sm text-destructive">
                  Land ID not found or you do not own this land
                </p>
              </div>
            )}

            <div>
              <Label htmlFor="newOwner">New Owner Address</Label>
              <Input
                id="newOwner"
                value={newOwner}
                onChange={(e) => setNewOwner(e.target.value)}
                placeholder="0x..."
                className="mt-1 font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Enter the Ethereum address of the new owner
              </p>
            </div>

            <div className="pt-4 space-y-3">
              <div className="p-3 bg-secondary rounded-lg">
                <p className="text-xs font-semibold text-foreground mb-1">Current Wallet:</p>
                <p className="text-xs font-mono text-muted-foreground break-all">
                  {walletAddress}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <AlertCircle className="w-4 h-4" />
                <span>Only the current owner can transfer ownership</span>
              </div>
            </div>

            <Button
              onClick={handleTransfer}
              disabled={isTransferring || !selectedParcel || !newOwner}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6 transition-smooth shadow-md"
            >
              {isTransferring ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Transferring Ownership...
                </>
              ) : (
                <>
                  <ArrowRightLeft className="mr-2 h-5 w-5" />
                  Transfer Ownership
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Your Land Parcels */}
        <Card className="p-6 shadow-corporate">
          <h3 className="text-xl font-semibold text-foreground mb-4">Your Land Parcels</h3>
          
          {parcels.length === 0 ? (
            <div className="text-center py-8">
              <ArrowRightLeft className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">You don't own any land parcels yet</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {parcels.map((parcel) => (
                <button
                  key={parcel.id}
                  onClick={() => setLandId(parcel.landId)}
                  className={`w-full text-left p-4 rounded-lg transition-smooth border ${
                    landId === parcel.landId
                      ? 'bg-accent/10 border-accent'
                      : 'bg-secondary hover:bg-secondary/80 border-transparent'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-semibold text-foreground">{parcel.landId}</span>
                    <span className="text-xs text-accent font-medium">Owned</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{parcel.location}</p>
                  <p className="text-xs text-muted-foreground">
                    Registered: {new Date(parcel.timestamp).toLocaleDateString()}
                  </p>
                </button>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default TransferView;

import { useState } from "react";
import { CheckCircle, XCircle, Eye, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import MapSimulator from "./MapSimulator";

interface AdminViewProps {
  parcels: any[];
  verifyLand: (landId: string, approved: boolean) => Promise<void>;
}

const AdminView = ({ parcels, verifyLand }: AdminViewProps) => {
  const [selectedParcel, setSelectedParcel] = useState<any>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleAction = async (landId: string, approved: boolean) => {
    setProcessingId(landId);
    try {
      await verifyLand(landId, approved);
      toast.success(approved ? "Land Verified!" : "Land Rejected");
    } catch (error) {
      toast.error("Action failed");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <ShieldCheck className="w-8 h-8 text-accent" />
        <h2 className="text-3xl font-bold">Admin Verification Portal</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card className="overflow-hidden border-accent/20">
            <table className="w-full text-left">
              <thead className="bg-secondary/50 text-sm font-semibold uppercase">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Owner</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {parcels.map((parcel) => (
                  <tr key={parcel.id} className="hover:bg-accent/5 transition-colors">
                    <td className="p-4 font-mono text-xs">{parcel.landId}</td>
                    <td className="p-4 text-xs">{parcel.owner.slice(0, 6)}...</td>
                    <td className="p-4 text-sm">{parcel.location}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                        parcel.status === 'verified' ? 'bg-green-500/20 text-green-600' : 'bg-yellow-500/20 text-yellow-600'
                      }`}>
                        {parcel.status || 'pending'}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => setSelectedParcel(parcel)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        disabled={processingId === parcel.landId}
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700" 
                        onClick={() => handleAction(parcel.landId, true)}
                      >
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        <div className="space-y-6">
          <h3 className="font-semibold text-lg">Detailed Inspection</h3>
          <MapSimulator selectedParcel={selectedParcel} />
          {selectedParcel && (
             <div className="p-4 bg-secondary/30 rounded-lg border space-y-3">
                <p className="text-sm"><strong>Deed Hash:</strong> <span className="font-mono text-xs text-muted-foreground">{selectedParcel.documentUrl?.split('/').pop() || 'N/A'}</span></p>
                <Button variant="destructive" className="w-full" onClick={() => handleAction(selectedParcel.landId, false)}>
                  <XCircle className="mr-2 w-4 h-4" /> Reject Submission
                </Button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminView;
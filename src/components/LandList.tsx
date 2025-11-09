
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { FileText, ExternalLink } from "lucide-react";
import { motion } from "framer-motion"; // ✅ Added Framer Motion import

interface LandParcel {
  id: string;
  landId: string;
  owner: string;
  location: string;
  coordinates: { lat: number; lng: number };
  timestamp: string;
  documentUrl?: string;
}

interface LandListProps {
  parcels: LandParcel[];
  onSelectParcel: (parcel: LandParcel) => void;
  selectedParcel: LandParcel | null;
}

const LandList = ({ parcels, onSelectParcel, selectedParcel }: LandListProps) => {
  return (
    <Card className="p-4 shadow-corporate">
      {/* Header */}
      <motion.h3
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-lg font-semibold text-foreground mb-4"
      >
        Registered Land Parcels
      </motion.h3>

      {/* Empty State */}
      {parcels.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-sm text-muted-foreground"
        >
          No lands registered yet.
        </motion.p>
      ) : (
        <ScrollArea className="h-[420px] rounded-md border border-accent/20">
          <table className="w-full text-sm border-collapse">
            {/* Table Header */}
            <motion.thead
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="sticky top-0 bg-accent/10 backdrop-blur-sm z-10"
            >
              <tr className="text-left text-muted-foreground border-b border-accent/20">
                <th className="px-3 py-2 font-semibold">Land ID</th>
                <th className="px-3 py-2 font-semibold">Location</th>
                <th className="px-3 py-2 font-semibold">Owner</th>
                <th className="px-3 py-2 font-semibold">Date</th>
                <th className="px-3 py-2 font-semibold">Document</th>
                <th className="px-3 py-2 font-semibold text-center">Action</th>
              </tr>
            </motion.thead>

            {/* Animated Table Rows */}
            <motion.tbody
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.07, // nice cascading effect
                  },
                },
              }}
            >
              {parcels.map((parcel) => (
                <motion.tr
                  key={parcel.id}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.4 }}
                  onClick={() => onSelectParcel(parcel)}
                  className={`border-b border-accent/10 hover:bg-accent/10 cursor-pointer transition-all ${
                    selectedParcel?.id === parcel.id ? "bg-accent/20" : ""
                  }`}
                >
                  <td className="px-3 py-2 font-medium">{parcel.landId}</td>
                  <td className="px-3 py-2">{parcel.location}</td>
                  <td className="px-3 py-2 truncate max-w-[120px]">
                    {parcel.owner.slice(0, 6)}...{parcel.owner.slice(-4)}
                  </td>
                  <td className="px-3 py-2 text-xs text-muted-foreground">
                    {new Date(parcel.timestamp).toLocaleDateString()}{" "}
                    {new Date(parcel.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="px-3 py-2">
                    {parcel.documentUrl ? (
                      <a
                        href={parcel.documentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-500 hover:underline"
                      >
                        <FileText className="w-4 h-4" /> View
                      </a>
                    ) : (
                      <span className="text-muted-foreground text-xs">
                        No file
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-center">
                    <a
                      href={`https://www.google.com/maps?q=${parcel.coordinates.lat},${parcel.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-accent hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" /> View
                    </a>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </ScrollArea>
      )}
    </Card>
  );
};

export default LandList;

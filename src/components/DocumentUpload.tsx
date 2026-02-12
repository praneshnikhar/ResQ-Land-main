
import React, { useState } from "react";

interface DocumentUploadProps {
  parcelId?: string; // Added this line
  onUploadComplete: (url: string) => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  parcelId, // Now parcelId is accepted
  onUploadComplete,
}) => {
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const openUploadWidget = async () => {
    setIsUploading(true);

    // @ts-ignore
    const widget = window.Bytescale?.UploadWidget;
    if (!widget) {
      alert("Upload widget not loaded yet!");
      setIsUploading(false);
      return;
    }

    const options = {
      apiKey: "public_W23MTXH5EBWB8cN3dsq85mXErfkT", // your Bytescale key
      maxFileCount: 1,
      mimeTypes: ["image/*", "application/pdf"],
      __filename:`${parcelId}.pdf`,
      layout: "modal",
      showFinishButton: true,
      metadata: { parcelId: parcelId || "unknown" }, // optional but helps tracking
    };

    try {
      const files = await widget.open(options);
      if (files.length > 0) {
        const url = files[0].fileUrl;
        setUploadedFileUrl(url);
        onUploadComplete(url);
        alert("Document uploaded successfully!");
      }
    } catch (err) {
      console.error(err);
      alert(" Upload failed. Try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-start space-y-2">
      <button
        onClick={openUploadWidget}
        disabled={isUploading}
        className={`px-4 py-2 rounded-md font-semibold transition-all ${
          isUploading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-accent hover:bg-accent/90 text-accent-foreground"
        }`}
      >
        {isUploading ? "Uploading..." : "Upload Document"}
      </button>

      {uploadedFileUrl && (
        <p className="text-xs text-green-600 mt-1">
          Uploaded:{" "}
          <a href={uploadedFileUrl} target="_blank" rel="noreferrer" className="underline">
            View File
          </a>
        </p>
      )}
    </div>
  );
};

export default DocumentUpload;










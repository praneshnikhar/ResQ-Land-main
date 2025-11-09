// // src/components/DocumentPreviewModal.tsx
// import React, { useEffect } from "react";
// import { createPortal } from "react-dom";
// import { X } from "lucide-react";
// import { Button } from "@/components/ui/button";

// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
//   documentURL: string;
// }

// const ModalContent: React.FC<Props> = ({ isOpen, onClose, documentURL }) => {
//   useEffect(() => {
//     if (!isOpen) return;
//     const prev = document.body.style.overflow;
//     document.body.style.overflow = "hidden";
//     return () => { document.body.style.overflow = prev; };
//   }, [isOpen]);

//   if (!isOpen) return null;

//   const isImage = /\.(jpg|jpeg|png|gif)$/i.test(documentURL);
//   const isPDF = /\.pdf$/i.test(documentURL);

//   return createPortal(
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//         onClick={onClose}
//         aria-hidden
//       />
//       <div className="relative z-10 w-full max-w-4xl bg-background rounded-lg shadow-xl overflow-hidden">
//         <div className="flex items-center justify-between p-3 border-b">
//           <div className="flex items-center gap-2">
//             {isPDF ? <span className="text-sm font-semibold">PDF Document</span> : <span className="text-sm font-semibold">Image Preview</span>}
//           </div>
//           <Button variant="ghost" onClick={onClose} size="sm" className="p-1">
//             <X />
//           </Button>
//         </div>

//         <div className="p-3 max-h-[80vh] overflow-auto flex items-center justify-center">
//           {isImage ? (
//             <img src={documentURL} alt="Document" className="max-h-[75vh] w-auto rounded" />
//           ) : isPDF ? (
//             <iframe
//               src={documentURL}
//               title="PDF Preview"
//               className="w-full h-[75vh] rounded"
//             />
//           ) : (
//             <div className="p-6 text-center text-muted-foreground">
//               <p>Unsupported document type. You can open it in a new tab.</p>
//               <a href={documentURL} target="_blank" rel="noreferrer" className="underline mt-2 block">Open in new tab</a>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>,
//     document.body
//   );
// };

// export default ModalContent;





// src/components/DocumentPreviewModal.tsx
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  documentURL: string;
}

const DocumentPreviewModal: React.FC<Props> = ({ isOpen, onClose, documentURL }) => {
  const [isClosing, setIsClosing] = useState(false);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 500); // match fadeOut duration
  };

  const isImage = /\.(jpg|jpeg|png|gif)$/i.test(documentURL);
  const isPDF = /\.pdf$/i.test(documentURL);

  return createPortal(
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center 
      ${isClosing ? "animate-fadeOut" : "animate-fadeIn"} 
      backdrop-blur-[6px] bg-black/40 transition-all duration-300`}
    >
      {/* Overlay click to close */}
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={handleClose}
        aria-hidden
      />

      {/* Modal content */}
      <div className="relative z-10 w-full max-w-4xl bg-background/95 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden border border-border/40 transform transition-transform duration-300 scale-100">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2 text-sm font-semibold">
            {isPDF ? "📄 PDF Document" : "🖼️ Image Preview"}
          </div>
          <Button
            variant="ghost"
            onClick={handleClose}
            size="sm"
            className="p-1 hover:bg-accent/10"
          >
            <X />
          </Button>
        </div>

        <div className="p-3 max-h-[80vh] overflow-auto flex items-center justify-center bg-card/70">
          {isImage ? (
            <img
              src={documentURL}
              alt="Document"
              className="max-h-[75vh] w-auto rounded-lg shadow-md"
            />
          ) : isPDF ? (
            <iframe
              src={documentURL}
              title="PDF Preview"
              className="w-full h-[75vh] rounded-md border"
            />
          ) : (
            <div className="text-center text-muted-foreground text-sm p-6">
              Unsupported file type.{" "}
              <a
                href={documentURL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Open in new tab
              </a>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DocumentPreviewModal;

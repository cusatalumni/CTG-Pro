import React, { useRef, useState } from 'react';

interface EmbedModalProps {
  onClose: () => void;
}

const EmbedModal: React.FC<EmbedModalProps> = ({ onClose }) => {
  const [isCopied, setIsCopied] = useState(false);
  // Added more sandbox permissions to ensure the embedded app can function correctly,
  // especially for opening popups and modals required by the PayPal payment flow.
  const embedCode = `<iframe src="${window.location.href}" width="100%" height="700" frameborder="0" style="max-width: 800px; border: 1px solid #334155; border-radius: 1rem; margin: 0 auto;" sandbox="allow-scripts allow-popups allow-same-origin allow-forms allow-modals allow-top-navigation-by-user-activation"></iframe>`;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCopy = () => {
    if (textareaRef.current) {
      textareaRef.current.select();
      navigator.clipboard.writeText(embedCode).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
      });
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative border border-slate-700"
        onClick={e => e.stopPropagation()} // Prevent click from closing modal
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-white mb-4">Embed this Quiz</h2>
        <p className="text-slate-400 mb-6">Copy and paste this code into your website's HTML to embed the quiz.</p>
        
        <textarea
          ref={textareaRef}
          readOnly
          className="w-full h-32 p-3 bg-slate-900 border-2 border-slate-700 rounded-lg text-slate-300 font-mono text-sm resize-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
          value={embedCode}
        />

        <button
          onClick={handleCopy}
          className="mt-4 w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg text-lg transition-colors"
        >
          {isCopied ? 'Copied!' : 'Copy Code'}
        </button>
      </div>
    </div>
  );
};

export default EmbedModal;
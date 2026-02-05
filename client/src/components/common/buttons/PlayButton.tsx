import React, { useState } from "react";
import { Play, Check } from "lucide-react";

export interface PlayButtonProps {
  text: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        // Encode the text for URL (using base64 for cleaner URLs with code)
        const encodedCode = btoa(encodeURIComponent(text));
        // Construct the URL with the code as a parameter
        const deepseekUrl = `https://chat.deepseek.com/?code=${encodedCode}`;
        // Open in new tab
        window.open(deepseekUrl, "_blank", "noopener,noreferrer");
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
          document.execCommand("copy");
        } finally {
          textArea.remove();
        }
      }

      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 p-1 bg-light-surface dark:bg-dark-surface rounded-md 
        hover:bg-light-hover dark:hover:bg-dark-hover transition-colors text-light-text dark:text-dark-text"
      title="Copy to clipboard"
    >
      {isCopied ? (
        <Check
          size={16}
          className="text-light-primary dark:text-dark-primary"
        />
      ) : (
        <Play size={16} className="text-light-text dark:text-dark-text" />
      )}
    </button>
  );
};

export default PlayButton;

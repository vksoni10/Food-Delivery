import React, { useState } from 'react';
import './ShareButton.css';

export default function ShareButton() {
  const [showOptions, setShowOptions] = useState(false);

  const handleShareClick = () => {
    setShowOptions(!showOptions);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  return (
    <div>
      <span className="material-symbols-outlined" onMouseOver={handleShareClick} style={{ cursor: 'pointer' }}>
        share
      </span>
      {showOptions && (
        <div className="share-options">
          <a href={`https://wa.me/?text=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">
            Share on WhatsApp
          </a>
          <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">
            Share on X (Twitter)
          </a>
          <button onClick={handleCopyToClipboard}>Copy to Clipboard</button>
        </div>
      )}
    </div>
  );
}

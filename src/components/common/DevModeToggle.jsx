import React from 'react';
import { useBuilderStore } from '../../store/useBuilderStore';
import { PenTool, Undo2 } from 'lucide-react';
import './DevModeToggle.css';

const DevModeToggle = () => {
  const { isDevMode, toggleDevMode, undo, history } = useBuilderStore();

  return (
    <div className="dev-mode-controls">
      {isDevMode && (
        <button 
          className="dev-mode-toggle undo-btn"
          onClick={undo}
          disabled={history.length === 0}
          title="되돌리기 (Undo)"
        >
          <Undo2 size={16} />
        </button>
      )}
      <button 
        className={`dev-mode-toggle ${isDevMode ? 'active' : ''}`}
        onClick={toggleDevMode}
        title="Developer Mode"
      >
        <PenTool size={16} />
        <span>Dev Mode</span>
      </button>
    </div>
  );
};

export default DevModeToggle;

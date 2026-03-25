import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { createLogger } from '../../utils/logger';

const logger = createLogger('ContextPanel');

function ContextPanel({ isOpen, onToggle, children }) {
  const handleToggle = () => {
    logger.info(`Context Panel Toggle`, { newState: !isOpen });
    onToggle();
  };

  return (
    <aside className={`context-column glass-panel ${!isOpen ? 'collapsed' : ''}`}>
      <div className="column-body">
        {isOpen && children}
      </div>
      
      <button 
        className="panel-toggle-btn"
        onClick={handleToggle}
        title={isOpen ? "패널 접기" : "패널 펴기"}
      >
        {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>
    </aside>
  );
}

export default ContextPanel;

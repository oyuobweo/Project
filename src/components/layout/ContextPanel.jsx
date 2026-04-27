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
    </aside>
  );
}

export default ContextPanel;

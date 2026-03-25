import React from 'react';
import { Settings } from 'lucide-react';
import { createLogger } from '../../utils/logger';

const logger = createLogger('SideNav');

function SideNav({ menuItems, activeTab, onTabChange }) {
  const handleTabClick = (id) => {
    logger.info(`Navigation Clicked`, { targetTab: id });
    onTabChange(id);
  };

  return (
    <aside className="side-nav-column">
      <nav className="side-menu-area">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`side-btn ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => handleTabClick(item.id)}
            title={item.label}
          >
            <div className="icon-frame">{item.icon}</div>
            {activeTab === item.id && <div className="side-indicator" />}
          </button>
        ))}
        <div className="side-bottom-area">
          <button 
            className={`side-btn ${activeTab === 'settings' ? 'active' : ''}`} 
            onClick={() => handleTabClick('settings')}
            title="설정"
          >
            <div className="icon-frame">
              <Settings size={22} />
            </div>
          </button>
        </div>
      </nav>
    </aside>
  );
}

export default SideNav;

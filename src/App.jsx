import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Calendar, Plus, ChevronRight, Bell, Search, BookOpen } from 'lucide-react';
import { TABS, SUB_TABS, THEMES } from './constants/navigation';
import { createLogger } from './utils/logger';
import { useEvents } from './hooks/useEvents';

// 컴포넌트 이식 (기존 구조 유지)
import SideNav from './components/layout/SideNav';
import ContextPanel from './components/layout/ContextPanel';
import CalendarView from './components/features/CalendarView';
import DashboardView from './components/features/DashboardView';
import SideBoard from './components/features/SideBoard';
import ScheduleView from './components/features/ScheduleView';
import TodoListView from './components/features/TodoListView';
import EventDetailModal from './components/features/EventDetailModal';

import './App.css';

const logger = createLogger('App');

/**
 * @component App
 * @description Work Info 메인 애플리케이션
 * v2.1: Harmony Lead Engineer 규격으로 재정립된 통합 관리 시스템
 */
function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // URL 경로에서 탭 상태 추출 (기본값: DASHBOARD)
  const currentTab = location.pathname.substring(1) || TABS.DASHBOARD;
  const activeTab = useMemo(() => {
    // 유효한 탭인지 확인
    return Object.values(TABS).includes(currentTab) ? currentTab : TABS.DASHBOARD;
  }, [currentTab]);

  const [isContextOpen, setIsContextOpen] = useState(true);
  const [theme, setTheme] = useState(THEMES.LIGHT);
  const [isThemeExpanded, setIsThemeExpanded] = useState(false);
  const [selectedSubTab, setSelectedSubTab] = useState(SUB_TABS.CALENDAR.DEFAULT);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isSideBoardOpen, setIsSideBoardOpen] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // 커스텀 훅을 통한 비즈니스 로직 연동 (SRP 준수)
  const { events, addEvent, deleteEvent, updateEvent, toggleTodo } = useEvents();

  // --- 효과 및 관찰 ---
  useEffect(() => {
    logger.info('Harmony Re-architected Application Initialized', { version: '2.1' });
  }, []);

  // --- 핸들러 ---
  const handleTabChange = (newTab) => {
    navigate('/' + newTab);
    if (newTab === TABS.SETTINGS) setIsContextOpen(true);
    logger.info('메인 탭 전환', { to: newTab });
  };

  const handleDaySelect = (date) => {
    // 토글 로직: 이미 선택된 날짜를 다시 클릭하면 선택 해제 (기본 상태로 복구)
    const isAlreadySelected = selectedDate && date && 
      selectedDate.getFullYear() === date.getFullYear() &&
      selectedDate.getMonth() === date.getMonth() &&
      selectedDate.getDate() === date.getDate();

    if (isAlreadySelected) {
      setSelectedDate(new Date()); // 선택 해제 시 오늘 날짜로 복구 (1월 1일 방지)
      // setIsSideBoardOpen(false); // 선택 해제 시 사이드보드도 함께 닫아 기본 레이아웃으로 복구
    } else {
      setSelectedDate(date);
      setIsSideBoardOpen(true);
    }
    
    logger.info('날짜 선택 상태 변경', { 
      action: isAlreadySelected ? 'DESELECT' : 'SELECT',
      date: date ? date.toDateString() : 'null' 
    });
  };

  // 컨텐츠 렌더링 로직 (기존 UI 흐름 유지)
  const renderContextBody = () => {
    switch (activeTab) {
      case TABS.DASHBOARD:
        return (
          <div className="menu-group">
            <button className="menu-item active">전체 요약</button>
            <button className="menu-item">최근 활동</button>
          </div>
        );
      case TABS.CALENDAR:
        return (
          <div className="menu-group">
            {Object.entries(SUB_TABS.CALENDAR).map(([key, value]) => (
              <button 
                key={key}
                className={`menu-item ${selectedSubTab === value ? 'active' : ''}`}
                onClick={() => setSelectedSubTab(value)}
              >
                {key === 'DEFAULT' ? '캘린더' : key === 'SCHEDULE' ? '내 일정' : '할 일'}
              </button>
            ))}
          </div>
        );
      case TABS.SETTINGS:
        return (
          <div className="menu-group">
            <button
              className={`menu-item ${isThemeExpanded ? 'active' : ''}`}
              onClick={() => setIsThemeExpanded(!isThemeExpanded)}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              테마
              <ChevronRight
                size={14}
                style={{
                  transform: isThemeExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform var(--transition-theme)'
                }}
              />
            </button>
            <div className={`submenu-container ${isThemeExpanded ? 'expanded' : ''}`}>
              <div className="submenu-content">
                <button className={`menu-item submenu-item ${theme === THEMES.DARK ? 'selected' : ''}`} onClick={() => setTheme(THEMES.DARK)}>다크 모드</button>
                <button className={`menu-item submenu-item ${theme === THEMES.LIGHT ? 'selected' : ''}`} onClick={() => setTheme(THEMES.LIGHT)}>라이트 모드</button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const menuItems = useMemo(() => [
    { id: TABS.DASHBOARD, label: '대시보드', icon: <LayoutDashboard size={22} /> },
    { id: TABS.CALENDAR, label: '캘린더', icon: <Calendar size={22} /> },
    { id: TABS.JOURNAL, label: '업무 일지', icon: <BookOpen size={22} /> },
  ], []);

  return (
    <div className={`app-grid-layout ${!isContextOpen ? 'context-collapsed' : ''} ${theme === THEMES.LIGHT ? 'theme-light' : ''}`}>
      <header className="integrated-brand-header">
        <div className="header-left-group">
          <div className="brand-logo-text"><span>WI</span></div>
          <div className="header-utility-icons">
            <button className="header-icon-btn" title="검색"><Search size={18} /></button>
            <button className="header-icon-btn" title="알림"><Bell size={18} /><div className="noti-dot" /></button>
          </div>
        </div>
      </header>

      <SideNav menuItems={menuItems} activeTab={activeTab} onTabChange={handleTabChange} />

      <ContextPanel isOpen={isContextOpen} onToggle={() => setIsContextOpen(!isContextOpen)}>
        {renderContextBody()}
      </ContextPanel>

      <div className="main-view-column">
        <header className="column-header justify-end">
          <div className="header-user-profile">
            <div className="user-avatar-mini">이</div>
            <div className="online-status" />
          </div>
        </header>

        <main className="main-scroll-area">
          <div className="view-transition">
            {activeTab === TABS.DASHBOARD && <DashboardView events={events} />}
            
            {activeTab === TABS.CALENDAR && selectedSubTab === SUB_TABS.CALENDAR.DEFAULT && (
              <div className="calendar-with-board">
                <CalendarView
                  events={events}
                  selectedDate={selectedDate}
                  onDaySelect={handleDaySelect}
                />
                {isSideBoardOpen && (
                  <SideBoard
                    selectedDate={selectedDate}
                    events={events}
                    onAddEvent={addEvent}
                    onDeleteEvent={deleteEvent}
                    onToggleTodo={toggleTodo}
                    onUpdateEvent={updateEvent}
                    onEventSelect={(ev) => setSelectedEvent(ev)}
                    onNavigateSubTab={(type) => {
                      setSelectedSubTab(type === 'schedule' ? SUB_TABS.CALENDAR.SCHEDULE : SUB_TABS.CALENDAR.TODO);
                    }}
                    onClose={() => setIsSideBoardOpen(false)}
                  />
                )}
              </div>
            )}

            {activeTab === TABS.CALENDAR && selectedSubTab === SUB_TABS.CALENDAR.SCHEDULE && (
              <ScheduleView events={events} />
            )}

            {activeTab === TABS.CALENDAR && selectedSubTab === SUB_TABS.CALENDAR.TODO && (
              <TodoListView events={events} onToggleTodo={toggleTodo} />
            )}

            {(activeTab === TABS.JOURNAL || activeTab === TABS.SETTINGS) && (
              <div className="feature-placeholder">
                <div className="placeholder-icon"><Plus size={40} /></div>
                <h3>{activeTab === TABS.CALENDAR ? selectedSubTab : menuItems.find(item => item.id === activeTab)?.label}</h3>
                <p>통합 데이터가 연동된 상세 뷰를 준비 중입니다. (v2.1 Harmony)</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* 실험을 위해 중앙 모달은 잠시 비활성화합니다. 
       {selectedEvent && (
         <EventDetailModal 
           event={selectedEvent}
           onUpdateEvent={updateEvent}
           onDeleteEvent={deleteEvent}
           onClose={() => setSelectedEvent(null)}
         />
       )} 
      */}
    </div>
  );
}

export default App;

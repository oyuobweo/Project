import React from 'react';

function DashboardView({ events }) {
  const activeTasks = events.filter(ev => ev.type === 'todo' && !ev.completed).length;
  const todaySchedules = events.filter(ev => {
    const evDate = new Date(ev.date);
    const today = new Date();
    return ev.type === 'schedule' && 
           evDate.getDate() === today.getDate() && 
           evDate.getMonth() === today.getMonth() && 
           evDate.getFullYear() === today.getFullYear();
  }).length;

  return (
    <div className="dashboard-view-simple">
      <div className="banner-area">
        <h1>안녕하세요, 용형님! 👋</h1>
        <p>Work Info의 통합 데이터 연동 대시보드입니다.</p>
      </div>
      <div className="summary-widgets">
        <div className="widget-card glass-panel orange-accent">
          <span className="widget-lbl">진행 중 할 일</span>
          <span className="widget-val">{activeTasks}건</span>
        </div>
        <div className="widget-card glass-panel green-accent">
          <span className="widget-lbl">오늘의 일정</span>
          <span className="widget-val">{todaySchedules}건</span>
        </div>
      </div>
    </div>
  );
}

export default DashboardView;

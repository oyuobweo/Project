import React from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Calendar as CalendarIcon, Clock, AlignLeft, Plus } from 'lucide-react';

function ScheduleView({ events }) {
  const schedules = events.filter(ev => ev.type === 'schedule');

  return (
    <div className="feature-view-container">
      <div className="view-header">
        <h2>내 일정 일람</h2>
        <p>총 {schedules.length}개의 예정된 일정이 있습니다.</p>
      </div>

      <div className="view-body">
        {schedules.length === 0 ? (
          <div className="empty-placeholder">
            <div className="placeholder-icon"><Plus size={40} /></div>
            <p>예정된 일정이 없습니다.</p>
          </div>
        ) : (
          <div className="events-list-grid">
            {schedules.map(ev => (
              <div key={ev.id} className="event-wide-card schedule">
                <div className="event-date-tag">
                  <span className="month">{format(new Date(ev.date), 'MMM')}</span>
                  <span className="day">{format(new Date(ev.date), 'd')}</span>
                </div>
                <div className="event-info">
                  <h4>{ev.text}</h4>
                  {ev.description && (
                    <p className="event-desc-preview">
                      <AlignLeft size={13} /> {ev.description}
                    </p>
                  )}
                  <div className="event-meta">
                    <span><Clock size={14} /> 하루 종일</span>
                    <span><CalendarIcon size={14} /> {format(new Date(ev.date), 'EEEE', { locale: ko })}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ScheduleView;

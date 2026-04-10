import React, { useState, useMemo } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addDays } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { getHoliday } from '../../utils/holidayUtils';

function CalendarView({ events, selectedDate, onDaySelect }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  // --- 컴포넌트 마운트 시 오늘 날짜로 초기화 (사용자 요청) ---
  React.useEffect(() => {
    const today = new Date();
    onDaySelect?.(today);
    setCurrentMonth(today);
  }, []);

  // --- 외부 클릭 시 드롭다운 닫기 로직 ---
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.picker-container')) {
        setShowYearPicker(false);
        setShowMonthPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- 달력 계산 로직 (42일 고정) ---
  const startDate = useMemo(() => {
    return startOfWeek(startOfMonth(currentMonth));
  }, [currentMonth]);
  
  const days = useMemo(() => {
    return Array.from({ length: 42 }, (_, i) => addDays(startDate, i));
  }, [startDate]);

  const nextMonth = () => setCurrentMonth(startOfMonth(addMonths(currentMonth, 1)));
  const prevMonth = () => setCurrentMonth(startOfMonth(subMonths(currentMonth, 1)));

  const years = Array.from({ length: 21 }, (_, i) => currentMonth.getFullYear() - 10 + i);
  const months = Array.from({ length: 12 }, (_, i) => i);


  return (
    <div className="calendar-view-engine">
      {/* 캘린더 헤더: App.css 구조에 맞게 완벽 복구 */}
      <div className="calendar-header">
        <div className="calendar-title-group">
          <div className="picker-container">
            <button 
              className="calendar-title-btn"
              onClick={() => {
                setShowYearPicker(!showYearPicker);
                setShowMonthPicker(false);
              }}
            >
              {format(currentMonth, 'yyyy')}년
            </button>
            {showYearPicker && (
              <div className="calendar-picker-popover">
                {years.map(y => (
                  <button key={y} className={`picker-item ${y === currentMonth.getFullYear() ? 'active' : ''}`} onClick={() => {
                    setCurrentMonth(startOfMonth(new Date(y, currentMonth.getMonth())));
                    setShowYearPicker(false);
                  }}>
                    {y}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="picker-container">
            <button 
              className="calendar-title-btn"
              onClick={() => {
                setShowMonthPicker(!showMonthPicker);
                setShowYearPicker(false);
              }}
            >
              {format(currentMonth, 'M')}월
            </button>
            {showMonthPicker && (
              <div className="calendar-picker-popover">
                {months.map(m => (
                  <button key={m} className={`picker-item ${m === currentMonth.getMonth() ? 'active' : ''}`} onClick={() => {
                    setCurrentMonth(startOfMonth(new Date(currentMonth.getFullYear(), m)));
                    setShowMonthPicker(false);
                  }}>
                    {m + 1}월
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="calendar-nav">
          <button onClick={prevMonth}><ChevronLeft size={18} /></button>
          <button className="today-btn" onClick={() => setCurrentMonth(startOfMonth(new Date()))}>오늘</button>
          <button onClick={nextMonth}><ChevronRight size={18} /></button>
        </div>
      </div>

      <div className="calendar-grid">
        {['일', '월', '화', '수', '목', '금', '토'].map(d => (
          <div key={d} className={`calendar-weekday ${d === '일' ? 'sun' : d === '토' ? 'sat' : ''}`}>{d}</div>
        ))}
        {days.map(day => {
          const dayEvents = events.filter(ev => isSameDay(new Date(ev.date), day));
          const holidayName = getHoliday(day);
          const isSunday = day.getDay() === 0;
          const isSaturday = day.getDay() === 6;

          return (
            <div 
              key={day.toString()} 
              className={`calendar-day-cell 
                ${!isSameMonth(day, startOfMonth(currentMonth)) ? 'other-month' : ''} 
                ${isSameDay(day, new Date()) ? 'today' : ''}
                ${isSameDay(day, selectedDate) ? 'selected-day' : ''}
                ${holidayName || isSunday ? 'holiday-sun' : ''}
                ${isSaturday ? 'saturday' : ''}
              `}
              onClick={() => onDaySelect(day)}
            >
              <div className="day-cell-top">
                <span className="day-number">{format(day, 'd')}</span>
                {holidayName && <span className="holiday-label">{holidayName}</span>}
              </div>
              <div className="event-strip-list">
                {dayEvents.slice(0, 4).map((ev, idx) => (
                  <div key={idx} className={`event-mini-strip ${ev.type}`}>
                    {ev.title || ev.text}
                  </div>
                ))}
                {dayEvents.length > 4 && (
                  <div className="event-more-count">+{dayEvents.length - 4}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CalendarView;

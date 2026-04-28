import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay 
} from 'date-fns';
import { isRedDay } from '../../utils/holidayUtils';
import './MiniCalendar.css';

const MiniCalendar = () => {
  // 메인 달력과 독립적인 뷰 전용 상태를 가짐
  const [currentMonthView, setCurrentMonthView] = useState(startOfMonth(new Date()));
  
  const handlePrevMonth = (e) => {
    e.stopPropagation();
    setCurrentMonthView(subMonths(currentMonthView, 1));
  };

  const handleNextMonth = (e) => {
    e.stopPropagation();
    setCurrentMonthView(addMonths(currentMonthView, 1));
  };

  // 6주(42일) 풀 그리드 날짜 생성
  const monthStart = startOfMonth(currentMonthView);
  const startDate = startOfWeek(monthStart);

  // 단순 배열 수동 생성 (안정적 6주 렌더링)
  const days = [];
  let dayCounter = new Date(startDate);
  for (let i = 0; i < 42; i++) {
    days.push(new Date(dayCounter));
    dayCounter.setDate(dayCounter.getDate() + 1);
  }

  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="mini-cal-context-box">
      <div className="mini-header">
        <span className="mini-title">{format(currentMonthView, 'yyyy년 M월')}</span>
        <div className="mini-nav">
          <button className="mini-nav-btn prev" onClick={handlePrevMonth}>
            <ChevronLeft size={16} />
          </button>
          <button className="mini-nav-btn next" onClick={handleNextMonth}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <div className="mini-weekdays">
        {weekDays.map(w => (
          <div key={w} className={`mini-weekday ${w === '일' ? 'sun' : ''}`}>{w}</div>
        ))}
      </div>
      <div className="mini-grid">
        {days.map((date, idx) => {
          const isToday = isSameDay(date, new Date());
          const isCurrentMonth = isSameMonth(date, monthStart);
          const isHoliday = isRedDay(date);

          return (
            <div 
              key={idx} 
              className={`mini-day 
                ${!isCurrentMonth ? 'other-month' : ''} 
                ${isToday ? 'today' : ''}
                ${isHoliday ? 'holiday-red' : ''}
              `}
            >
              {format(date, 'd')}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MiniCalendar;

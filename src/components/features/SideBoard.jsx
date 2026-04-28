import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths
} from 'date-fns';
import { ko } from 'date-fns/locale';
import { Calendar as CalendarIcon, Trash2, Edit3, CornerUpLeft, Clock, Plus, X } from 'lucide-react';
import { createLogger } from '../../utils/logger';
import { parseTimeInput, formatDisplayTime } from '../../utils/timeUtils';
import TimeWheelPicker from './TimeWheelPicker';
import TimeListDropdown from './TimeListDropdown';

const logger = createLogger('SideBoard');

/**
 * @component DailyItem
 */
const DailyItem = ({ ev, onToggleTodo, onDeleteEvent, onShowDetail }) => (
  <div
    className={`modern-item-card ${ev.type} ${ev.completed ? 'completed' : ''}`}
    onClick={() => onShowDetail(ev)}
  >
    <div className="card-main">
      <div className="card-row">
        <div className="card-left">
          <span
            className="type-dot"
            onClick={(e) => {
              if (ev.type === 'todo') {
                e.stopPropagation();
                onToggleTodo(ev.id);
              }
            }}
          ></span>
          <span className="card-text">{ev.text}</span>
        </div>
      </div>
    </div>
  </div>
);

/**
 * @component DateSelectionCalendar
 * 날짜 선택 전용 커스텀 캘린더
 */
const DateSelectionCalendar = ({ selectedDate, onSelect }) => {
  const [viewDate, setViewDate] = useState(selectedDate || new Date());

  const monthStart = startOfMonth(viewDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div className="custom-mini-calendar">
      <header className="mini-cal-header">
        <button type="button" className="cal-nav-btn" onClick={(e) => { e.preventDefault(); setViewDate(subMonths(viewDate, 1)); }}>&lt;</button>
        <span className="mini-cal-title">{format(viewDate, 'yyyy. MM')}</span>
        <button type="button" className="cal-nav-btn" onClick={(e) => { e.preventDefault(); setViewDate(addMonths(viewDate, 1)); }}>&gt;</button>
      </header>
      <div className="mini-cal-grid">
        {['일', '월', '화', '수', '목', '금', '토'].map(d => (
          <div key={d} className="mini-cal-weekday">{d}</div>
        ))}
        {calendarDays.map((day, idx) => (
          <div
            key={idx}
            className={`mini-cal-day ${!isSameMonth(day, monthStart) ? 'outside' : ''} ${isSameDay(day, selectedDate) ? 'selected' : ''}`}
            onClick={(e) => { e.preventDefault(); onSelect(day); }}
          >
            {format(day, 'd')}
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * @component SideBoardDetail
 */
const SideBoardDetail = ({ ev, onBack, onUpdateEvent, onDeleteEvent }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputText, setInputText] = useState(ev?.text || '');
  const [description, setDescription] = useState(ev?.description || '');

  useEffect(() => {
    if (ev) {
      setInputText(ev.text);
      setDescription(ev.description || '');
      setIsEditing(false);
    }
  }, [ev]);

  const handleUpdate = () => {
    onUpdateEvent({ ...ev, text: inputText, description: description });
    setIsEditing(false);
  };

  if (!ev) return <div className="sb-detail-empty">일정을 선택해주세요.</div>;

  return (
    <div className="sb-detail-view-v4">
      <div className="sb-detail-scroll-area">
        {/* 1. 상단 액션 바: 뒤로가기, 편집, 삭제 */}
        <header className="sb-action-header-v4">
          <button className="sb-action-icon-btn" onClick={onBack} title="뒤로 가기">
            <CornerUpLeft size={18} />
          </button>
          {!isEditing && (
            <>
              <button className="sb-action-icon-btn" onClick={() => setIsEditing(true)} title="편집">
                <Edit3 size={18} />
              </button>
              <button className="sb-action-icon-btn" onClick={() => { if(window.confirm('삭제하시겠습니까?')) { onDeleteEvent(ev.id); onBack(); } }} title="삭제">
                <Trash2 size={18} />
              </button>
            </>
          )}
        </header>

        {/* 2. 중앙 화이트 캔버스 (메모장 스타일) */}
        <div className="sb-unified-canvas">
          <section className="hero-block">
            {isEditing ? (
              <input 
                className="sb-title-input-v4" 
                value={inputText} 
                onChange={(e) => setInputText(e.target.value)}
                autoFocus
              />
            ) : (
              <h2 className="sb-title-readonly-v4">{inputText}</h2>
            )}
          </section>

          <div className="sb-meta-bar-v4">
            <div className="info-item">
              <Clock size={16} /> 
              <span>{ev.type === 'schedule' ? '일정' : '할 일'}</span>
            </div>
            <div className={`info-item date ${ev.type}`}>
              <CalendarIcon size={16} /> 
              <span>{format(new Date(ev.startDate || ev.date), 'M월 d일 (E)', { locale: ko })}</span>
            </div>
          </div>

          <div className="sb-content-divider" /> 

          <div className="memo-area">
            {isEditing ? (
              <textarea 
                className="sb-memo-input-v4" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                placeholder="내용을 입력하세요..."
              />
            ) : (
              <div className="sb-memo-readonly-v4">
                {description || "기록된 메모가 없습니다."}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. 편집 모드 전용 푸터 */}
      {isEditing && (
        <footer className="sb-footer-v4">
          <div className="edit-actions-row">
            <button className="sb-cancel-btn-v4" onClick={() => setIsEditing(false)}>취소</button>
            <button className="sb-save-btn-v4" onClick={handleUpdate}>변경 내용 저장</button>
          </div>
        </footer>
      )}
    </div>
  );
};

/**
 * @component SideBoard
 */
function SideBoard({
  selectedDate,
  events,
  onAddEvent,
  onDeleteEvent,
  onToggleTodo,
  onUpdateEvent,
  onClose
}) {
  const [entryMode, setEntryMode] = useState('schedule');
  const [inputText, setInputText] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [startDate, setStartDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState('');

  const [showMetaSettings, setShowMetaSettings] = useState(false);
  const [isAllDay, setIsAllDay] = useState(true);
  const [activeCalendar, setActiveCalendar] = useState(null);
  const [errorMsg, setErrorMsg] = useState(''); 
  const [detailEvent, setDetailEvent] = useState(null);
  const [activeTimePicker, setActiveTimePicker] = useState(null); // null, 'start', 'end'
  const metaPanelRef = useRef(null);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (metaPanelRef.current && !metaPanelRef.current.contains(event.target)) {
        setActiveCalendar(null);
        setActiveTimePicker(null);
      }
    };

    if (activeCalendar || activeTimePicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeCalendar, activeTimePicker]);

  useEffect(() => {
    setDetailEvent(null);
    setInputText('');
    setDescription('');
    setStartTime('09:00');
    setEndTime('10:00');
    setStartDate(format(selectedDate, 'yyyy-MM-dd'));
    setEndDate('');
    setIsAllDay(true);
    setShowMetaSettings(false);
    setActiveCalendar(null);
    setActiveTimePicker(null);
    setErrorMsg('');
  }, [selectedDate]);

  // 유효성 검사 (종료일이 시작일보다 빠른지 확인)
  const validateDates = (start, end) => {
    if (end && end < start) {
      setErrorMsg('종료일은 시작일보다 빠를 수 없습니다.');
      return false;
    }
    setErrorMsg('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    if (!validateDates(startDate, endDate)) return;

    onAddEvent({
      text: inputText,
      startDate: new Date(startDate).toISOString(),
      endDate: endDate ? new Date(endDate).toISOString() : null,
      date: new Date(startDate).toISOString(),
      time: isAllDay ? null : startTime,
      endTime: isAllDay ? null : endTime,
      type: entryMode,
      description: description,
      completed: false
    });
    setInputText('');
    setDescription('');
    setStartTime('09:00');
    setEndTime('10:00');
    setEndDate('');
    setShowMetaSettings(false);
  };

  const dailyEvents = events.filter(ev => {
    const cur = format(selectedDate, 'yyyy-MM-dd');
    const start = format(new Date(ev.startDate || ev.date), 'yyyy-MM-dd');
    if (ev.endDate) {
      const end = format(new Date(ev.endDate), 'yyyy-MM-dd');
      return cur >= start && cur <= end;
    }
    return cur === start;
  });

  return (
    <div className="sb-isolation-layer">
      <div className={`modern-side-board glass-panel ${detailEvent ? 'show-detail is-expanded' : ''}`}>
        <div className={`sb-flipper ${detailEvent ? 'is-flipped' : ''}`}>

          <div className="sb-front">
              <div className="sideboard-header">
                <div className="header-left-area">
                  <div className="magazine-header">
                    <div className="mag-date-big">{format(selectedDate, 'd')}</div>
                    <div className="mag-meta-group">
                      <div className="mag-month">{format(selectedDate, 'MMMM', { locale: ko })}</div>
                      <div className="mag-day">{format(selectedDate, 'EEEE', { locale: ko })}</div>
                    </div>
                  </div>
                </div>
              </div>

            <div className="modern-body">
              <form className="modern-entry-form v4-layout" onSubmit={handleSubmit}>
                <div className="entry-card-v4">
                  {/* 1. Header Area: 제목 입력 */}
                  <div className="entry-section title-section">
                    <div className="entry-mode-tabs">
                      <button type="button" className={`mode-tab ${entryMode === 'schedule' ? 'active' : ''}`} onClick={() => setEntryMode('schedule')}>일정</button>
                      <button type="button" className={`mode-tab ${entryMode === 'todo' ? 'active' : ''}`} onClick={() => setEntryMode('todo')}>할 일</button>
                    </div>
                    <input
                      className="entry-input-main v4"
                      placeholder={entryMode === 'schedule' ? "새로운 일정을 입력하세요" : "해야 할 일을 기록하세요"}
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      required
                    />
                  </div>

                  {/* 2. Meta Area: 날짜 및 종일 설정 (상시 노출) */}
                  <div className="entry-section meta-section-v4">
                    <div className="meta-combined-row" ref={metaPanelRef}>
                      <div className="custom-date-selector v4">
                        <div className={`custom-date-box v4 ${activeCalendar === 'start' ? 'active' : ''}`} onClick={() => {
                          setActiveCalendar(activeCalendar === 'start' ? null : 'start');
                          setActiveTimePicker(null);
                        }}>
                          {format(new Date(startDate), 'M월 d일 (E)', { locale: ko })}
                        </div>
                        <span className="range-sep">—</span>
                        <div className={`custom-date-box v4 ${activeCalendar === 'end' ? 'active' : ''}`} onClick={() => {
                          setActiveCalendar(activeCalendar === 'end' ? null : 'end');
                          setActiveTimePicker(null);
                        }}>
                          {endDate ? format(new Date(endDate), 'M월 d일 (E)', { locale: ko }) : '종료일 설정'}
                        </div>
                      </div>

                      <div className="meta-right-options">
                        <label className="all-day-checkbox v4">
                          <input type="checkbox" checked={isAllDay} onChange={(e) => setIsAllDay(e.target.checked)} />
                          <span className="check-mark"></span>
                          <span className="label-text">종일</span>
                        </label>
                      </div>
                    </div>

                    {activeCalendar && (
                      <div className="mini-calendar-container v4">
                        <DateSelectionCalendar
                          selectedDate={new Date(activeCalendar === 'start' ? startDate : (endDate || startDate))}
                          onSelect={(day) => {
                            const formatted = format(day, 'yyyy-MM-dd');
                            if (activeCalendar === 'start') {
                              setStartDate(formatted);
                              validateDates(formatted, endDate);
                            } else {
                              setEndDate(formatted);
                              validateDates(startDate, formatted);
                            }
                            setActiveCalendar(null);
                          }}
                        />
                      </div>
                    )}

                    <div className={`time-range-selector-v4 v4-inline ${isAllDay ? 'hidden' : ''}`}>
                      <div className="time-chip-wrapper">
                        <button type="button" className={`time-select-chip v4 ${activeTimePicker === 'start' ? 'active' : ''}`} onClick={() => setActiveTimePicker(activeTimePicker === 'start' ? null : 'start')}>
                          {formatDisplayTime(startTime)}
                        </button>
                        {activeTimePicker === 'start' && <TimeListDropdown selectedTime={startTime} onSelect={(t) => { setStartTime(t); setActiveTimePicker(null); }} />}
                      </div>
                      <span className="range-divider">-</span>
                      <div className="time-chip-wrapper">
                        <button type="button" className={`time-select-chip v4 ${activeTimePicker === 'end' ? 'active' : ''}`} onClick={() => setActiveTimePicker(activeTimePicker === 'end' ? null : 'end')}>
                          {formatDisplayTime(endTime)}
                        </button>
                        {activeTimePicker === 'end' && <TimeListDropdown selectedTime={endTime} onSelect={(t) => { setEndTime(t); setActiveTimePicker(null); }} />}
                      </div>
                    </div>
                  </div>

                  {/* 3. Memo Area: 메모 입력 */}
                  <div className="entry-section memo-section-v4">
                    <textarea
                      className="entry-textarea v4"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="메모를 입력하세요..."
                    />
                  </div>

                  {/* 4. Action Area: 등록 버튼 */}
                  <div className="entry-footer-v4">
                    {errorMsg && <div className="meta-error-msg v4"><X size={14} /> <span>{errorMsg}</span></div>}
                    <div className="submit-btn-wrapper">
                      <button type="submit" className="submit-btn-v4">
                        <Plus size={18} />
                        <span>등록</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              <div className="v4-divider" />

              {/* 5. List Area: 일정 목록 복구 */}
              <div className="sb-list-scroll-area v4">
                <div className="sb-list-header">
                  <span className="list-title">목록</span>
                  <span className="list-count">{dailyEvents.length}</span>
                </div>
                <div className="modern-list-view">
                  {dailyEvents.length === 0 ? (
                    <div className="modern-empty">기록된 내용이 없습니다.</div>
                  ) : (
                    dailyEvents.map(ev => (
                      <DailyItem
                        key={ev.id}
                        ev={ev}
                        onToggleTodo={onToggleTodo}
                        onDeleteEvent={onDeleteEvent}
                        onShowDetail={setDetailEvent}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 뒷면: 상세 보기 (Back) */}
          <div className="sb-back">
            <SideBoardDetail
              ev={detailEvent}
              onBack={() => setDetailEvent(null)}
              onUpdateEvent={onUpdateEvent}
              onDeleteEvent={onDeleteEvent}
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default SideBoard;

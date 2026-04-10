import React, { useState, useCallback } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { X, Plus, Calendar as CalendarIcon, CheckSquare, Trash2, Edit3, Check, CornerUpLeft, Star, Circle, Clock } from 'lucide-react';
import { createLogger } from '../../utils/logger';

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
 * @component SideBoardDetail
 */
const SideBoardDetail = ({ ev, onBack, onUpdateEvent, onDeleteEvent }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputText, setInputText] = useState(ev?.text || '');
  const [description, setDescription] = useState(ev?.description || '');

  React.useEffect(() => {
    if (ev) {
      setInputText(ev.text);
      setDescription(ev.description || '');
    }
  }, [ev]);

  const handleUpdate = () => {
    onUpdateEvent({ 
      ...ev, 
      text: inputText, 
      description: description
    });
    setIsEditing(false);
  };

  if (!ev) return <div className="sb-detail-empty">일정을 선택해주세요.</div>;

  return (
    <div className="sb-detail-view-v4">
      <div className="sb-detail-scroll-area">
        <header className="sb-action-header-v4">
          <button className="sb-action-icon-btn" onClick={onBack} title="뒤로 가기">
            <CornerUpLeft size={18} />
          </button>
          <button className="sb-action-icon-btn" onClick={() => setIsEditing(true)} title="편집">
            <Edit3 size={18} />
          </button>
          <button className="sb-action-icon-btn" onClick={() => { if(window.confirm('삭제하시겠습니까?')) { onDeleteEvent(ev.id); onBack(); } }} title="삭제">
            <Trash2 size={18} />
          </button>
        </header>

        <div className="sb-unified-canvas">
          <section className="hero-block">
            <div className="title-row">
              <div className="title-left">
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
              </div>
            </div>
          </section>

          <div className="sb-meta-bar-v4">
            <div className="info-item">
              <Clock size={16} /> 
              <span>{ev.type === 'schedule' ? '일정' : '할 일'}</span>
            </div>
            <div className={`info-item date ${ev.type}`}>
              <CalendarIcon size={16} /> 
              <span>{format(new Date(ev.date), 'M월 d일 (E)', { locale: ko })}</span>
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
  const [type, setType] = useState('schedule');         
  const [filterType, setFilterType] = useState('schedule');  
  const [inputText, setInputText] = useState('');
  const [description, setDescription] = useState('');
  const [detailEvent, setDetailEvent] = useState(null); 

  React.useEffect(() => {
    setDetailEvent(null);
    setInputText('');
    setDescription('');
  }, [selectedDate]);

  const handleTypeToggle = useCallback((clickedType) => {
    const nextType = (clickedType === filterType) 
      ? (clickedType === 'schedule' ? 'todo' : 'schedule') 
      : clickedType;
    setType(nextType);
    setFilterType(nextType);
  }, [filterType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onAddEvent({ 
      text: inputText, 
      date: selectedDate, 
      type: type, 
      description: description,
      completed: false
    });
    setInputText('');
    setDescription('');
  };

  const dailyEvents = events
    .filter(ev => format(new Date(ev.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'))
    .filter(ev => filterType === 'all' || ev.type === filterType);

  return (
    <div className="sb-isolation-layer">
      <div className={`modern-side-board glass-panel ${detailEvent ? 'show-detail is-expanded' : ''}`}>
        <div className={`sb-flipper ${detailEvent ? 'is-flipped' : ''}`}>
          
          {/* 앞면: 목록 및 입력부 (Front) */}
          <div className="sb-front">
            <header className="sideboard-header">
              <div className="header-left-area">
                <div className="header-date">{format(selectedDate, 'M월 d일 (E)', { locale: ko })}</div>
                <div className="inline-switcher">
                  <div className={`switcher-indicator ${filterType}`} />
                  <button
                    className={`inline-filter-btn ${filterType === 'schedule' ? 'active' : ''}`}
                    onClick={() => handleTypeToggle('schedule')}
                  >일정</button>
                  <button
                    className={`inline-filter-btn ${filterType === 'todo' ? 'active' : ''}`}
                    onClick={() => handleTypeToggle('todo')}
                  >할 일</button>
                </div>
              </div>
              <div className="header-right-area">
                <div className="v-divider" />
                <button className="modern-close-btn" onClick={onClose}><X size={18} /></button>
              </div>
            </header>

            <div className="modern-body">
              <form className="modern-entry-form" onSubmit={handleSubmit}>
                <div className="entry-card">
                  <input 
                    className="entry-input-main"
                    placeholder={type === 'schedule' ? "무엇을 계획하시나요?" : "오늘의 할 일은?"}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    required
                  />
                  <textarea 
                    className="entry-textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="메모를 입력하세요..."
                  />
                  <div className="entry-footer">
                    <button type="submit" className={`submit-pill ${type}`}>
                      <Plus size={18} /> <span>등록</span>
                    </button>
                  </div>
                </div>
              </form>

              <div className="modern-list-view">
                {dailyEvents.length === 0 ? (
                  <div className="modern-empty">기록된 내용이 없습니다.</div>
                ) : (
                  dailyEvents.map(ev => (
                    <DailyItem 
                      key={ev.id} 
                      ev={ev} 
                      onShowDetail={setDetailEvent}
                      onToggleTodo={onToggleTodo} 
                      onDeleteEvent={onDeleteEvent} 
                    />
                  ))
                )}
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

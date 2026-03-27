import React, { useState, useCallback } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { X, Plus, Calendar as CalendarIcon, CheckSquare, Trash2, Edit3, Check } from 'lucide-react';
import { createLogger } from '../../utils/logger';

const logger = createLogger('SideBoard');

/**
 * @component DailyItem
 * @description 개별 일정/할 일 항목 렌더링 카드
 */
const DailyItem = ({ ev, onToggleTodo, onDeleteEvent, onEditStart, onEventSelect, isActive }) => (
  <div 
    className={`modern-item-card ${ev.type} ${ev.completed ? 'completed' : ''} ${isActive ? 'is-active' : ''}`}
    onClick={() => onEventSelect(ev)}
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
        <div className="card-actions">
          <button className="icon-btn edit" onClick={(e) => { e.stopPropagation(); onEditStart(ev); }}><Edit3 size={14} /></button>
          <button className="icon-btn del" onClick={(e) => { e.stopPropagation(); onDeleteEvent(ev.id); }}><Trash2 size={14} /></button>
        </div>
      </div>
    </div>
  </div>
);

/**
 * @component SideBoard
 * @description 사이드 패널에서 선택된 날짜의 상세요약 및 입력 폼 제공
 * 마스터 룰 0-7번 전면 적용하여 고수준의 예외 처리와 로깅 보장.
 */
function SideBoard({ 
  selectedDate, 
  events, 
  onAddEvent, 
  onDeleteEvent, 
  onToggleTodo, 
  onUpdateEvent, 
  onNavigateSubTab, 
  onEventSelect, 
  onClose 
}) {
  const [type, setType] = useState('schedule');         // 입력 폼 타입 ('schedule' | 'todo')
  const [filterType, setFilterType] = useState('schedule');  // 목록 필터 타입 ('schedule' | 'todo' | 'all')
  const [inputText, setInputText] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  // 필터 및 입력 타입 스위칭 핸들러
  const handleTypeSwitch = useCallback((newType) => {
    setType(newType);
    setFilterType(newType);
  }, []);

  const handleEditStart = useCallback((ev) => {
    setEditingId(ev.id);
    setType(ev.type);
    setInputText(ev.text);
    setDescription(ev.description || '');
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditingId(null);
    setInputText('');
    setDescription('');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) {
      logger.warn('빈 텍스트 입력 거부', 'FORM_VAL_01');
      return;
    }

    const payload = { 
      text: inputText, 
      date: selectedDate, 
      type: type, 
      description: description,
      completed: editingId ? (events.find(ev => ev.id === editingId)?.completed || false) : false
    };

    if (editingId) {
      onUpdateEvent({ ...payload, id: editingId });
      setEditingId(null);
    } else {
      onAddEvent(payload);
    }
    
    setInputText('');
    setDescription('');
  };

  // 비즈니스 로직: 선택된 날짜 및 필터에 따른 데이터 필터링
  const dailyEvents = events
    .filter(ev => format(new Date(ev.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'))
    .filter(ev => filterType === 'all' || ev.type === filterType);

  return (
    <div className={`modern-side-board glass-panel ${editingId ? 'is-editing' : ''}`}>
      <header className="sideboard-header">
        <div className="header-left-area">
          <div className="header-date">{format(selectedDate, 'M월 d일 (E)', { locale: ko })}</div>
          <div className="inline-switcher">
            <div className={`switcher-indicator ${filterType}`} />
            <button
              className={`inline-filter-btn ${filterType === 'schedule' ? 'active' : ''}`}
              onClick={() => handleTypeSwitch('schedule')}
            >
              일정
            </button>
            <button
              className={`inline-filter-btn ${filterType === 'todo' ? 'active' : ''}`}
              onClick={() => handleTypeSwitch('todo')}
            >
              할 일
            </button>
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
              autoFocus
              required
            />
            <textarea 
              className="entry-textarea"
              placeholder="추가적인 메모가 있다면 기록하세요..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="entry-footer">
              <div 
                className="mode-indicator clickable" 
                onClick={() => onNavigateSubTab(type)}
                title={`${type === 'schedule' ? '내 일정' : '할 일'}으로 이동`}
              >
                {type === 'schedule' ? <CalendarIcon size={14} /> : <CheckSquare size={14} />}
                {editingId && <span>수정 모드</span>}
              </div>
              <div className="entry-actions">
                {editingId && <button type="button" className="action-link" onClick={handleCancelEdit}>취소</button>}
                <button type="submit" className={`submit-pill ${type}`}>
                  {editingId ? <Check size={18} /> : <Plus size={18} />}
                  <span>{editingId ? '완료' : '등록'}</span>
                </button>
              </div>
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
                isActive={ev.id === editingId}
                onToggleTodo={onToggleTodo} 
                onDeleteEvent={onDeleteEvent} 
                onEditStart={handleEditStart} 
                onEventSelect={onEventSelect}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default SideBoard;

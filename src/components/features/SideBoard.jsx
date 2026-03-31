import React, { useState, useCallback } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { X, Plus, Calendar as CalendarIcon, CheckSquare, Trash2, Edit3, Check, CornerUpLeft, Star, Circle, Clock } from 'lucide-react';
import { createLogger } from '../../utils/logger';

const logger = createLogger('SideBoard');

/**
 * @component DailyItem
 * @description 개별 일정/할 일 항목 렌더링 카드
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
 * @description 사이드바 내에서 전면으로 표시되는 상세 정보 뷰
 */
const SideBoardDetail = ({ ev, onBack, onUpdateEvent, onDeleteEvent }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputText, setInputText] = useState(ev.text);
  const [description, setDescription] = useState(ev.description || '');

  const handleUpdate = () => {
    onUpdateEvent({ ...ev, text: inputText, description: description });
    setIsEditing(false);
  };

  return (
    <div className="sb-detail-view-v3">
      <header className="sb-header-actions">
        <button className="sb-close-btn" onClick={onBack}><X size={24} /></button>
      </header>
      
      <div className="sb-detail-scroll-area">
        {/* 헤더 섹션: 제목 및 기본 정보 */}
        <section className="sb-section-block title-block">
          <div className="title-row">
            <div className="title-left">
              <Circle className="status-circle" size={24} />
              {isEditing ? (
                <input 
                  className="sb-title-input-v3" 
                  value={inputText} 
                  onChange={(e) => setInputText(e.target.value)}
                  autoFocus
                />
              ) : (
                <h2 className="sb-title-readonly-v3">{inputText}</h2>
              )}
            </div>
            <Star className="star-icon" size={20} />
          </div>
          <div className="add-step-v3"><Plus size={16} /> 단계 추가</div>
        </section>

        {/* 메인 정보 섹션: 일정/할일 타입 */}
        <section className="sb-section-block info-block">
          <div className="info-item">
            <Clock size={18} /> <span>{ev.type === 'schedule' ? '본 일정이 일정으로 등록되었습니다' : '할 일로 분류됨'}</span>
          </div>
          <div className={`info-item ${ev.type}`}>
            <CalendarIcon size={18} /> <span>{format(new Date(ev.date), 'M월 d일 E요일', { locale: ko })}까지</span>
          </div>
        </section>

        {/* 메모 섹션 */}
        <section className="sb-section-block memo-block">
          {isEditing ? (
            <textarea 
              className="sb-memo-input-v3" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              placeholder="메모 추가..."
            />
          ) : (
            <div className="sb-memo-readonly-v3">
              {description || '메모 추가...'}
            </div>
          )}
        </section>
      </div>

      <footer className="sb-footer-v3">
        {isEditing ? (
          <div className="edit-actions-row">
            <button className="sb-cancel-btn-v3" onClick={() => setIsEditing(false)}>취소</button>
            <button className="sb-save-btn-v3" onClick={handleUpdate}>저장 완료</button>
          </div>
        ) : (
          <div className="status-bar-v3">
            <span className="creation-text">{format(new Date(ev.date), 'M월 d일 E요일', { locale: ko })}에 생성됨</span>
            <div className="footer-icons-v3">
              <button className="sb-edit-btn-v3" onClick={() => setIsEditing(true)}>
                <Edit3 size={18} />
              </button>
              <button className="sb-trash-btn-v3" onClick={() => { if(confirm('삭제하시겠습니까?')) { onDeleteEvent(ev.id); onBack(); } }}>
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        )}
      </footer>
    </div>
  );
};

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
  const [detailEvent, setDetailEvent] = useState(null); // 전면 상세 뷰를 위한 이벤트 상태

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
    <div className={`modern-side-board glass-panel ${editingId ? 'is-editing' : ''} ${detailEvent ? 'show-detail' : ''}`}>
      {detailEvent ? (
        <SideBoardDetail 
          ev={detailEvent} 
          onBack={() => setDetailEvent(null)}
          onUpdateEvent={onUpdateEvent}
          onDeleteEvent={onDeleteEvent}
        />
      ) : (
        <>
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
                    onShowDetail={(target) => setDetailEvent(target)}
                    onToggleTodo={onToggleTodo} 
                    onDeleteEvent={onDeleteEvent} 
                  />
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SideBoard;

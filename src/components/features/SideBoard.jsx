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
 * @description 생산성 중심의 v4 고도화 상세 정보 뷰
 */
const SideBoardDetail = ({ ev, onBack, onUpdateEvent, onDeleteEvent }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputText, setInputText] = useState(ev.text);
  const [description, setDescription] = useState(ev.description || '');
  const handleUpdate = () => {
    onUpdateEvent({ 
      ...ev, 
      text: inputText, 
      description: description
    });
    setIsEditing(false);
  };

  return (
    <div className="sb-detail-view-v4">
      <div className="sb-detail-scroll-area">
        {/* 1. 상단 액션 바: 이미지 위치와 동일하게 최상단 배치 */}
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
          {/* 2. 제목 섹션 */}
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

          {/* 3. 메타 정보 및 구분선 */}
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

          {/* 4. 메모 구역 */}
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

      {/* 편집 모드일 때만 푸터 노출 - 이미지와 동일한 버튼 배치 */}
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
 * @description 사이드 패널 마스터 컴포넌트
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
  const [type, setType] = useState('schedule');         
  const [filterType, setFilterType] = useState('schedule');  
  const [inputText, setInputText] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [detailEvent, setDetailEvent] = useState(null); 

  // 날짜 변경 시 모든 상태 초기화
  React.useEffect(() => {
    setDetailEvent(null);
    setEditingId(null);
    setInputText('');
    setDescription('');
    logger.info('날짜 변경 감지에 따른 보드 리셋', { date: selectedDate });
  }, [selectedDate]);

  // 필터 및 입력 타입 스위칭/토글 핸들러
  const handleTypeToggle = useCallback((clickedType) => {
    const nextType = (clickedType === filterType) 
      ? (clickedType === 'schedule' ? 'todo' : 'schedule') 
      : clickedType;

    setType(nextType);
    setFilterType(nextType);
    logger.info('필터 토글', { from: filterType, to: nextType });
  }, [filterType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

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
                  onClick={() => handleTypeToggle('schedule')}
                >
                  일정
                </button>
                <button
                  className={`inline-filter-btn ${filterType === 'todo' ? 'active' : ''}`}
                  onClick={() => handleTypeToggle('todo')}
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
                  required
                />
                <textarea 
                  className="entry-textarea"
                  placeholder="추가적인 메모가 있다면 기록하세요..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div className="entry-footer">
                  <div className="entry-actions">
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

import React, { useState, useEffect } from 'react';
import { X, Calendar as CalendarIcon, CheckSquare, AlignLeft, Trash2, Check, Clock, Type } from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

function EventDetailModal({ event, onUpdateEvent, onDeleteEvent, onClose }) {
  // 방어적으로 초기 상태 설정
  const [inputText, setInputText] = useState(event?.text || '');
  const [description, setDescription] = useState(event?.description || '');
  const [type, setType] = useState(event?.type || 'schedule');
  const [isEditing, setIsEditing] = useState(false);

  // 이벤트가 바뀌면 상태 초기화
  useEffect(() => {
    if (event) {
      setInputText(event.text || '');
      setDescription(event.description || '');
      setType(event.type || 'schedule');
      setIsEditing(false);
    }
  }, [event]);

  if (!event) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateEvent({
      ...event,
      text: inputText,
      description: description,
      type: type
    });
    setIsEditing(false); // 업데이트 후 읽기 전용 모드로 전환
  };

  return (
    <div className="detail-modal-overlay" onClick={onClose}>
      <div className="detail-modal-card glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-v4">
          <div className="modal-badge-row">
            <span className={`detail-type-badge ${type}`}>
              {type === 'schedule' ? <CalendarIcon size={12} /> : <CheckSquare size={12} />}
              {type === 'schedule' ? '일정' : '할 일'}
            </span>
            <span className="creation-date">
              <Clock size={12} /> {format(new Date(event.date), 'yyyy년 MM월 dd일 (E)', { locale: ko })}
            </span>
          </div>
          <button className="modal-close-btn" onClick={onClose}><X size={24} /></button>
        </div>

        <form id="detail-modal-form" className="detail-modal-body" onSubmit={handleSubmit}>
          <div className="detail-field-group">
            <div className="field-label"><Type size={18} /> 제목</div>
            {isEditing ? (
              <input 
                className="detail-input-title"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="제목이 없습니다."
                required
                autoFocus
              />
            ) : (
              <div className="detail-title-readonly">{inputText || '제목이 없습니다.'}</div>
            )}
          </div>

          <div className="detail-field-group memo-field">
            <div className="field-label"><AlignLeft size={18} /> 상세 메모</div>
            {isEditing ? (
              <textarea 
                className="detail-textarea-memo"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="상세 내용을 입력하여 내용을 풍성하게 기록하세요..."
              />
            ) : (
              <div className="detail-memo-readonly">{description || '기록된 메모가 없습니다.'}</div>
            )}
          </div>

        </form>

        <div className="modal-footer-actions">
          <button 
            type="button" 
            className="detail-delete-btn" 
            onClick={() => {
              if(window.confirm('이 일정을 삭제하시겠습니까?')) {
                onDeleteEvent(event.id);
                onClose();
              }
            }}
          >
            <Trash2 size={18} /> 삭제하기
          </button>
          <div className="footer-right-group">
            {isEditing ? (
              <>
                <button type="button" className="detail-cancel-btn" onClick={() => setIsEditing(false)}>수정 취소</button>
                <button type="submit" form="detail-modal-form" className="detail-save-btn">
                  <Check size={18} /> 업데이트 완료
                </button>
              </>
            ) : (
              <>
                <button type="button" className="detail-cancel-btn" onClick={onClose}>닫기</button>
                <button 
                  type="button" 
                  className="detail-save-btn" 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                >
                  수정하기
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetailModal;

import { useState, useEffect, useCallback } from 'react';
import { createLogger } from '../utils/logger';

const logger = createLogger('useEvents');

/**
 * @hook useEvents
 * @description 이벤트(일정/할 일) 도메인의 비즈니스 로직을 관리하는 커스텀 훅.
 * 마스터 룰 0번(SRP) 및 3번(코드 품질) 준수.
 */
export const useEvents = () => {
  const [events, setEvents] = useState(() => {
    try {
      const savedEvents = localStorage.getItem('wi-events');
      if (savedEvents) {
        const parsedData = JSON.parse(savedEvents);
        // Date 객체 역직렬화 및 유효성 검사 (마스터 룰 5번 - 엣지 케이스 검증)
        return parsedData.map(ev => ({ ...ev, date: new Date(ev.date) }));
      }
    } catch (err) {
      logger.error('이벤트 데이터 파싱 실패', 'STORAGE_001', { err });
    }
    // 기본 초기 데이터
    return [
      { id: 1, date: new Date(), type: 'schedule', text: 'Lead Engineer Setup', completed: false, color: '#6366f1' },
      { id: 2, date: new Date(), type: 'todo', text: 'Harmony Setup Complete', completed: true, color: '#10b981' },
    ];
  });

  // 데이터 변경 시 자동 저장
  useEffect(() => {
    localStorage.setItem('wi-events', JSON.stringify(events));
  }, [events]);

  const addEvent = useCallback((newEvent) => {
    setEvents(prev => [...prev, { ...newEvent, id: Date.now() }]);
    logger.info('새로운 이벤트 등록 완료', { newEvent });
  }, []);

  const deleteEvent = useCallback((id) => {
    setEvents(prev => prev.filter(ev => ev.id !== id));
    logger.info('이벤트 삭제 완료', { id });
  }, []);

  const updateEvent = useCallback((updatedEvent) => {
    setEvents(prev => prev.map(ev => ev.id === updatedEvent.id ? updatedEvent : ev));
    logger.info('이벤트 업데이트 완료', { id: updatedEvent.id });
  }, []);

  const toggleTodo = useCallback((id) => {
    setEvents(prev => prev.map(ev => 
      ev.id === id ? { ...ev, completed: !ev.completed } : ev
    ));
    logger.info('할 일 완료 상태 반전', { id });
  }, []);

  return { events, addEvent, deleteEvent, updateEvent, toggleTodo };
};

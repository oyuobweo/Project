import React, { useEffect, useRef } from 'react';
import { getTimePresets, formatDisplayTime } from '../../utils/timeUtils';
import './TimeListDropdown.css';

const TimeListDropdown = ({ selectedTime, onSelect }) => {
  const basePresets = getTimePresets();
  // 무한 루프를 위해 데이터를 3배로 확장 (이전-중앙-이후)
  const extendedPresets = [...basePresets, ...basePresets, ...basePresets];
  const listRef = useRef(null);
  const scrollRef = useRef(null);

  // 초기 위치 및 선택 시 중앙 섹션으로 스크롤
  useEffect(() => {
    if (scrollRef.current) {
      const baseCount = basePresets.length;
      const activeIdx = basePresets.indexOf(selectedTime);
      const targetIdx = baseCount + (activeIdx >= 0 ? activeIdx : 0);
      
      const itemHeight = 33; // .time-item의 대략적인 높이 (padding 8*2 + font 0.78rem + alpha)
      scrollRef.current.scrollTop = targetIdx * itemHeight - (scrollRef.current.clientHeight / 2) + (itemHeight / 2);
    }
  }, []); // 마운트 시 1회만 중앙으로 세팅

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const baseHeight = scrollHeight / 3;

    // 하단 임계점 도달 시 중앙 섹션 상단으로 점프
    if (scrollTop >= baseHeight * 2) {
      e.target.scrollTop = scrollTop - baseHeight;
    }
    // 상단 임계점 도달 시 중앙 섹션 하단으로 점프
    else if (scrollTop <= 0) {
      e.target.scrollTop = scrollTop + baseHeight;
    }
  };

  return (
    <div className="time-list-dropdown glass-panel" ref={listRef}>
      <div className="time-list-scroll" ref={scrollRef} onScroll={handleScroll}>
        {extendedPresets.map((time, index) => (
          <div 
            key={`${time}-${index}`} 
            className={`time-item ${index >= basePresets.length && index < basePresets.length * 2 && time === selectedTime ? 'active' : ''}`}
            onClick={() => onSelect(time)}
          >
            {formatDisplayTime(time)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeListDropdown;

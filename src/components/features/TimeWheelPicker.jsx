import React, { useState, useEffect, useRef } from 'react';
import './TimeWheelPicker.css';

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
const MINUTES = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0'));

const TimeWheelPicker = ({ initialTime, onSelect }) => {
  const [hour, setHour] = useState(initialTime?.split(':')[0] || '09');
  const [minute, setMinute] = useState(initialTime?.split(':')[1] || '00');
  
  const hourRef = useRef(null);
  const minuteRef = useRef(null);

  const handleSelect = (newHour, newMinute) => {
    setHour(newHour);
    setMinute(newMinute);
    onSelect(`${newHour}:${newMinute}`);
  };

  return (
    <div className="time-wheel-picker glass-panel">
      <div className="wheel-container">
        {/* Hour Wheel */}
        <div className="wheel-column" ref={hourRef}>
          <div className="wheel-label">시</div>
          <div className="wheel-scroll">
            {HOURS.map(h => (
              <div 
                key={h} 
                className={`wheel-item ${h === hour ? 'active' : ''}`}
                onClick={() => handleSelect(h, minute)}
              >
                {h}
              </div>
            ))}
          </div>
        </div>

        <div className="wheel-divider">:</div>

        {/* Minute Wheel */}
        <div className="wheel-column" ref={minuteRef}>
          <div className="wheel-label">분</div>
          <div className="wheel-scroll">
            {MINUTES.map(m => (
              <div 
                key={m} 
                className={`wheel-item ${m === minute ? 'active' : ''}`}
                onClick={() => handleSelect(hour, m)}
              >
                {m}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="wheel-footer">
        <button className="wheel-confirm-btn" onClick={() => onSelect(`${hour}:${minute}`)}>
          확인
        </button>
      </div>
    </div>
  );
};

export default TimeWheelPicker;

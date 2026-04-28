/**
 * @file timeUtils.js
 * @description 시간 입력 파싱 및 유틸리티 함수
 */

/**
 * 사용자의 다양한 입력을 HH:mm 형식으로 변환
 * @param {string} input - 사용자 입력 문자열 (예: "9", "2p", "1330", "1:5")
 * @returns {string|null} - HH:mm 형식의 시간 문자열 또는 null
 */
export const parseTimeInput = (input) => {
  if (!input) return null;

  // 공백 제거 및 소문자 변환
  const clean = input.trim().toLowerCase();
  
  // 1. 정규식 패턴 정의
  // HH:mm 또는 H:m
  const colonPattern = /^(\d{1,2}):(\d{1,2})$/;
  // H, HH, Hpm, HHam 등
  const simplePattern = /^(\d{1,2})(am|pm|a|p)?$/;
  // HHmm
  const fourDigitPattern = /^(\d{2})(\d{2})$/;

  let hours = 0;
  let minutes = 0;
  let hasMatched = false;

  // Case 1: 콜론 패턴 (1:5, 13:30)
  const colonMatch = clean.match(colonPattern);
  if (colonMatch) {
    hours = parseInt(colonMatch[1], 10);
    minutes = parseInt(colonMatch[2], 10);
    hasMatched = true;
  } 
  // Case 2: 4자리 숫자 패턴 (1330)
  else if (clean.match(fourDigitPattern) && clean.length === 4) {
    const match = clean.match(fourDigitPattern);
    hours = parseInt(match[1], 10);
    minutes = parseInt(match[2], 10);
    hasMatched = true;
  }
  // Case 3: 심플 패턴 (9, 2p, 9a)
  else {
    const match = clean.match(simplePattern);
    if (match) {
      hours = parseInt(match[1], 10);
      const suffix = match[2];

      if (suffix) {
        if ((suffix.startsWith('p')) && hours < 12) hours += 12;
        if ((suffix.startsWith('a')) && hours === 12) hours = 0;
      }
      minutes = 0;
      hasMatched = true;
    }
  }

  // 2. 유효성 검증
  if (!hasMatched) return null;
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;

  // 3. 포맷팅 (HH:mm)
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

/**
 * 24시간제(HH:mm)를 오전/오후 형식으로 변환
 * @param {string} timeStr - "14:30"
 * @returns {string} - "오후 2:30"
 */
export const formatDisplayTime = (timeStr) => {
  if (!timeStr) return '';
  const [h, m] = timeStr.split(':').map(Number);
  const period = h < 12 ? '오전' : '오후';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${period} ${hour}:${String(m).padStart(2, '0')}`;
};

/**
 * 15분 단위 시간 리스트 생성
 */
export const getTimePresets = () => {
  const presets = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      presets.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    }
  }
  return presets;
};

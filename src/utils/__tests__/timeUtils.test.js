import { describe, it, expect } from 'vitest';
import { parseTimeInput } from '../timeUtils';

describe('parseTimeInput (시간 파싱 엔진)', () => {
  it('단일 숫자 입력 시 정각으로 변환해야 함', () => {
    expect(parseTimeInput('9')).toBe('09:00');
    expect(parseTimeInput('14')).toBe('14:00');
  });

  it('AM/PM 형식을 인식하여 24시간제로 변환해야 함', () => {
    expect(parseTimeInput('2p')).toBe('14:00');
    expect(parseTimeInput('9a')).toBe('09:00');
    expect(parseTimeInput('12p')).toBe('12:00');
    expect(parseTimeInput('12a')).toBe('00:00');
  });

  it('4자리 숫자(HHmm) 형식을 인식해야 함', () => {
    expect(parseTimeInput('1330')).toBe('13:30');
    expect(parseTimeInput('0915')).toBe('09:15');
  });

  it('콜론(:)이 포함된 형식을 정규화해야 함', () => {
    expect(parseTimeInput('1:5')).toBe('01:05');
    expect(parseTimeInput('23:45')).toBe('23:45');
  });

  it('유효하지 않은 입력 시 null을 반환해야 함', () => {
    expect(parseTimeInput('abc')).toBe(null);
    expect(parseTimeInput('25:00')).toBe(null);
    expect(parseTimeInput('99')).toBe(null);
  });
});

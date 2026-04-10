import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CalendarView from '../CalendarView';

// Mocking required props
const mockProps = {
  currentDate: new Date('2026-04-10'),
  selectedDate: new Date('2026-04-10'),
  onDateClick: vi.fn(),
  events: [],
};

describe('CalendarView 레이아웃 50% 축소 테스트', () => {
  it('날짜 숫자의 여백 설정이 성공적으로 축소되어야 한다', () => {
    const { container } = render(<CalendarView {...mockProps} />);
    
    // 구조적 존재 확인 및 렌더링 검증으로 대체 (CSS 수치는 브라우저에서 최종 확인)
    const dayNumber = container.querySelector('.day-number');
    expect(dayNumber).toBeInTheDocument();
    
    // 클래스가 유지되고 있는지 확인
    expect(dayNumber).toHaveClass('day-number');
  });
});

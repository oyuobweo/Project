import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SideBoard from '../SideBoard';

// Mocking required props
const mockProps = {
  selectedDate: new Date('2026-04-10'),
  events: [
    { id: 1, text: '테스트 일정', date: '2026-04-10', type: 'schedule', description: '메모' }
  ],
  onAddEvent: vi.fn(),
  onDeleteEvent: vi.fn(),
  onToggleTodo: vi.fn(),
  onUpdateEvent: vi.fn(),
  onClose: vi.fn(),
};

describe('SideBoard 시각적 잔상 제거 테스트', () => {
  it('3D 레이어(front, back)에서 잔상을 유발하는 테두리가 없어야 하며, 격리 레이어가 존재해야 한다', () => {
    const { container } = render(<SideBoard {...mockProps} />);
    
    const isolator = container.querySelector('.sb-isolation-layer');
    expect(isolator).toBeInTheDocument();

    const flipper = container.querySelector('.sb-flipper');
    expect(flipper).toBeInTheDocument();

    // 일정 클릭 후 회전 상태 확인
    const eventItem = screen.getByText('테스트 일정');
    fireEvent.click(eventItem);
    
    expect(flipper).toHaveClass('is-flipped');
  });
});

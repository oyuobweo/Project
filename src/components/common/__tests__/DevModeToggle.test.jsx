import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DevModeToggle from '../DevModeToggle';
import { useBuilderStore } from '../../../store/useBuilderStore';

describe('DevModeToggle', () => {
  beforeEach(() => {
    useBuilderStore.setState({ isDevMode: false });
  });

  it('기본 상태에서 빌더 모드 토글 스위치가 렌더링되어야 한다', () => {
    render(<DevModeToggle />);
    expect(screen.getByText('Dev Mode')).toBeInTheDocument();
  });

  it('스위치를 클릭하면 빌더 모드가 토글되어야 한다', () => {
    render(<DevModeToggle />);
    const button = screen.getByRole('button');
    
    // 처음 상태
    expect(useBuilderStore.getState().isDevMode).toBe(false);
    
    // 클릭
    fireEvent.click(button);
    expect(useBuilderStore.getState().isDevMode).toBe(true);

    // 다시 클릭
    fireEvent.click(button);
    expect(useBuilderStore.getState().isDevMode).toBe(false);
  });
});

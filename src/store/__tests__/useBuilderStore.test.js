import { describe, it, expect, beforeEach } from 'vitest';
import { useBuilderStore } from '../useBuilderStore';

describe('useBuilderStore', () => {
  beforeEach(() => {
    // Zustand 상태 초기화
    useBuilderStore.setState({
      isDevMode: false,
      layout: [],
    });
  });

  it('기본 상태에서 개발자 모드는 false여야 한다', () => {
    expect(useBuilderStore.getState().isDevMode).toBe(false);
  });

  it('toggleDevMode를 호출하면 개발자 모드가 켜지거나 꺼져야 한다', () => {
    useBuilderStore.getState().toggleDevMode();
    expect(useBuilderStore.getState().isDevMode).toBe(true);

    useBuilderStore.getState().toggleDevMode();
    expect(useBuilderStore.getState().isDevMode).toBe(false);
  });

  it('updateLayout을 호출하면 레이아웃 정보가 업데이트되어야 한다', () => {
    const newLayout = [
      { i: 'calendar', x: 0, y: 0, w: 8, h: 4 },
      { i: 'sideboard', x: 8, y: 0, w: 4, h: 4 }
    ];

    useBuilderStore.getState().updateLayout(newLayout);
    expect(useBuilderStore.getState().layout).toEqual(newLayout);
  });
});

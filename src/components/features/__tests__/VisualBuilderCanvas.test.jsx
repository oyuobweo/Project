import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import VisualBuilderCanvas from '../VisualBuilderCanvas';
import { useBuilderStore } from '../../../store/useBuilderStore';

// react-grid-layout은 JSDOM에서 완벽히 렌더링하기 어려울 수 있으므로 Mock 처리
vi.mock('react-grid-layout', () => {
  const Responsive = ({ children }) => <div data-testid="mock-grid-layout">{children}</div>;
  const WidthProvider = (Component) => (props) => <Component {...props} width={1000} />;
  return { Responsive, WidthProvider };
});

describe('VisualBuilderCanvas', () => {
  beforeEach(() => {
    useBuilderStore.setState({ isDevMode: false, layout: [] });
  });

  it('개발자 모드가 꺼져있을 때는 정적 레이아웃 컨테이너를 렌더링해야 한다', () => {
    render(
      <VisualBuilderCanvas>
        <div key="calendar" data-testid="child-calendar">Calendar</div>
        <div key="sideboard" data-testid="child-sideboard">SideBoard</div>
      </VisualBuilderCanvas>
    );

    expect(screen.getByTestId('child-calendar')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-grid-layout')).not.toBeInTheDocument();
  });

  it('개발자 모드가 켜져있을 때는 그리드 레이아웃(mock)을 렌더링해야 한다', () => {
    useBuilderStore.setState({ isDevMode: true });

    render(
      <VisualBuilderCanvas>
        <div key="calendar" data-testid="child-calendar">Calendar</div>
      </VisualBuilderCanvas>
    );

    expect(screen.getByTestId('mock-grid-layout')).toBeInTheDocument();
    expect(screen.getByTestId('child-calendar')).toBeInTheDocument();
  });
});

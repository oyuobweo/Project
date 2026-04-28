import React, { useState, useEffect, useRef } from 'react';
import { Rnd } from 'react-rnd';
import { useBuilderStore } from '../../store/useBuilderStore';
import { GripHorizontal } from 'lucide-react';
import './VisualBuilderCanvas.css';

const VisualBuilderCanvas = ({ children }) => {
  const { isDevMode, layout, updateWidgetLayout } = useBuilderStore();
  const containerRef = useRef(null);
  const [containerBounds, setContainerBounds] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setContainerBounds({ width, height });
    }
  }, [isDevMode]);

  // 컴포넌트별 기본 사이즈 (기존 Flexbox 레이아웃 흉내)
  const defaultLayouts = {
    calendar: { x: 0, y: 0, width: containerBounds.width - 412, height: containerBounds.height },
    sideboard: { x: containerBounds.width - 380, y: 0, width: 380, height: containerBounds.height }
  };

  if (!isDevMode) {
    return (
      <div className="static-canvas-wrapper calendar-with-board">
        {children}
      </div>
    );
  }

  return (
    <div className="visual-builder-canvas-container" ref={containerRef}>
      <div className="builder-grid-background" />
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return null;
        const key = child.key || 'unknown';
        
        // 스토어에 레이아웃 정보가 있으면 사용, 없으면 초기값 사용
        const widgetLayout = layout[key] || defaultLayouts[key] || { x: 0, y: 0, width: 300, height: 300 };

        return (
          <Rnd
            key={key}
            className="builder-rnd-widget"
            size={{ width: widgetLayout.width, height: widgetLayout.height }}
            position={{ x: widgetLayout.x, y: widgetLayout.y }}
            onDragStop={(e, d) => {
              updateWidgetLayout(key, { x: d.x, y: d.y });
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
              updateWidgetLayout(key, {
                width: ref.style.width,
                height: ref.style.height,
                x: position.x,
                y: position.y
              });
            }}
            bounds="parent"
            dragHandleClassName="builder-drag-handle"
            dragGrid={[20, 20]} // 20px 스냅
            resizeGrid={[20, 20]}
          >
            <div className="builder-widget-wrapper">
              <div className="builder-drag-handle">
                <GripHorizontal size={20} />
              </div>
              <div className="builder-widget-content">
                {child}
              </div>
            </div>
          </Rnd>
        );
      })}
    </div>
  );
};

export default VisualBuilderCanvas;

import { create } from 'zustand';

export const useBuilderStore = create((set, get) => ({
  isDevMode: false,
  layout: {}, // { 'calendar': { x, y, width, height }, ... }
  history: [], // 이전 layout 상태 저장

  toggleDevMode: () => set((state) => ({ isDevMode: !state.isDevMode })),
  
  updateWidgetLayout: (key, newProps) => set((state) => {
    const currentLayout = state.layout;
    const newLayout = {
      ...currentLayout,
      [key]: { ...currentLayout[key], ...newProps }
    };
    
    return {
      layout: newLayout,
      history: [...state.history, currentLayout]
    };
  }),

  undo: () => set((state) => {
    if (state.history.length === 0) return state;
    const previousLayout = state.history[state.history.length - 1];
    return {
      layout: previousLayout,
      history: state.history.slice(0, -1)
    };
  })
}));

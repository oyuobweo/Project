import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// 각 테스트가 종료될 때마다 DOM 정리
afterEach(() => {
  cleanup();
});

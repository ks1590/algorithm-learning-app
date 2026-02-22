import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// 各テストケースの後にクリーンアップを実行します（jsdomのクリアなど）
afterEach(() => {
  cleanup();
});

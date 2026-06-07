import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'], // ← измени: убрал .test. из include
      exclude: [
        'src/**/*.test.{ts,tsx}', // ← тесты исключаем
        'src/**/*.spec.{ts,tsx}', // ← тесты исключаем
        'src/__tests__/**', // ← папка с тестами
        'src/test/**',
        'src/main.tsx',
        'src/vite-env.d.ts',
        'src/constants/**', // ← константы не нужно покрывать
        'src/schemas/**', // ← схемы не нужно покрывать
      ],
      thresholds: {
        global: {
          statements: 80,
          branches: 50,
          functions: 50,
          lines: 50,
        },
      },
    },
  },
});

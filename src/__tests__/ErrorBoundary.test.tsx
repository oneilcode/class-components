import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary';

const ErrorThrower = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>Normal content</div>;
};

describe('ErrorBoundary Component', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Child content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('displays fallback UI when error occurs', () => {
    const spy = vi.spyOn(console, 'error');

    render(
      <ErrorBoundary>
        <ErrorThrower shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Something is wrong/i)).toBeInTheDocument();
    spy.mockRestore();
  });

  it('logs error to console when error occurs', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorThrower shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});

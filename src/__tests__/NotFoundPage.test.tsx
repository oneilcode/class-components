import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFoundPage from '../components/NotFoundPage';

describe('NotFoundPage', () => {
  it('should render without crashing', () => {
    expect(() =>
      render(
        <BrowserRouter>
          <NotFoundPage />
        </BrowserRouter>
      )
    ).not.toThrow();
  });

  it('should render 404 heading', () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );
    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
  });

  it('should render error message', () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );
    expect(
      screen.getByText(/the page you are looking for does not exist/i)
    ).toBeInTheDocument();
  });

  it('should have a link back to home', () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );
    const homeLink = screen.getByRole('link', { name: /go back to home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });
});

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AboutPage from '../components/AboutPage';

describe('AboutPage', () => {
  it('should render the heading', () => {
    render(<AboutPage />);
    expect(screen.getByText('About this app')).toBeInTheDocument();
  });

  it('should render description text', () => {
    render(<AboutPage />);
    expect(
      screen.getByText(/search functionality with pagination/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/RS School React Course/i)).toBeInTheDocument();
  });

  it('should render the course link with correct attributes', () => {
    render(<AboutPage />);
    const link = screen.getByRole('link', { name: /RS School React Course/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should render author section', () => {
    render(<AboutPage />);
    expect(screen.getByText(/Created by:/i)).toBeInTheDocument();
    expect(screen.getByText(/Viktoria O'Neil/i)).toBeInTheDocument();
  });

  it('should render author link with correct attributes', () => {
    render(<AboutPage />);
    const authorLink = screen.getByRole('link', { name: /Viktoria O'Neil/i });

    expect(authorLink).toBeInTheDocument();
    expect(authorLink).toHaveAttribute('href', 'https://github.com/oneilcode');
    expect(authorLink).toHaveAttribute('target', '_blank');
    expect(authorLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});

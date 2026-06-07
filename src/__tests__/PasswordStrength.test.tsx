import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PasswordStrength } from '../components/PasswordStrength';

describe('PasswordStrength', () => {
  it('should render all requirements', () => {
    render(<PasswordStrength password="" />);

    expect(screen.getByText('Password requirements')).toBeInTheDocument();
    expect(screen.getByText('Contains a number')).toBeInTheDocument();
    expect(screen.getByText('Contains uppercase letter')).toBeInTheDocument();
    expect(screen.getByText('Contains lowercase letter')).toBeInTheDocument();
    expect(screen.getByText('Contains special character')).toBeInTheDocument();
  });

  it('should show red color for unmet requirements', () => {
    render(<PasswordStrength password="abc" />);

    const numberItem = screen.getByText('Contains a number');
    const uppercaseItem = screen.getByText('Contains uppercase letter');
    const lowercaseItem = screen.getByText('Contains lowercase letter');
    const specialItem = screen.getByText('Contains special character');

    expect(numberItem).toHaveAttribute('style', expect.stringContaining('red'));
    expect(uppercaseItem).toHaveAttribute(
      'style',
      expect.stringContaining('red')
    );
    expect(lowercaseItem).toHaveAttribute(
      'style',
      expect.stringContaining('green')
    );
    expect(specialItem).toHaveAttribute(
      'style',
      expect.stringContaining('red')
    );
  });

  it('should show green color for met requirements when password has number', () => {
    render(<PasswordStrength password="abc1" />);

    const numberItem = screen.getByText('Contains a number');
    expect(numberItem).toHaveAttribute(
      'style',
      expect.stringContaining('green')
    );
  });

  it('should show green color for uppercase when password has uppercase', () => {
    render(<PasswordStrength password="Abc" />);

    const uppercaseItem = screen.getByText('Contains uppercase letter');
    expect(uppercaseItem).toHaveAttribute(
      'style',
      expect.stringContaining('green')
    );
  });

  it('should show green color for lowercase when password has lowercase', () => {
    render(<PasswordStrength password="ABCd" />);

    const lowercaseItem = screen.getByText('Contains lowercase letter');
    expect(lowercaseItem).toHaveAttribute(
      'style',
      expect.stringContaining('green')
    );
  });

  it('should show green color for special char when password has special char', () => {
    render(<PasswordStrength password="abc!" />);

    const specialItem = screen.getByText('Contains special character');
    expect(specialItem).toHaveAttribute(
      'style',
      expect.stringContaining('green')
    );
  });

  it('should show all green when password meets all requirements', () => {
    render(<PasswordStrength password="Abc1!" />);

    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(4);
    items.forEach((item) => {
      expect(item).toHaveAttribute('style', expect.stringContaining('green'));
    });
  });
});

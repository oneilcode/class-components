import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from '../components/Modal';

describe('Modal', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();

    if (!document.getElementById('modal-container')) {
      const modalRoot = document.createElement('div');
      modalRoot.id = 'modal-container';
      document.body.appendChild(modalRoot);
    }
  });

  it('should not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={mockOnClose} modalTitle="Test Modal">
        <div>Modal content</div>
      </Modal>
    );

    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
  });

  it('should render when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} modalTitle="Test Modal">
        <div>Modal content</div>
      </Modal>
    );

    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('should call onClose when clicking close button', async () => {
    const user = userEvent.setup();
    render(
      <Modal isOpen={true} onClose={mockOnClose} modalTitle="Test Modal">
        <div>Content</div>
      </Modal>
    );

    const closeButton = screen.getByRole('button', { name: /x/i });
    await user.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when pressing Escape key', async () => {
    const user = userEvent.setup();
    render(
      <Modal isOpen={true} onClose={mockOnClose} modalTitle="Test Modal">
        <div>Content</div>
      </Modal>
    );

    await user.keyboard('{Escape}');

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when clicking overlay', async () => {
    const user = userEvent.setup();
    render(
      <Modal isOpen={true} onClose={mockOnClose} modalTitle="Test Modal">
        <div>Content</div>
      </Modal>
    );

    const overlay = document.querySelector('.modal-overlay');
    if (overlay) await user.click(overlay);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should NOT call onClose when clicking modal content', async () => {
    const user = userEvent.setup();
    render(
      <Modal isOpen={true} onClose={mockOnClose} modalTitle="Test Modal">
        <div>Modal content</div>
      </Modal>
    );

    const content = document.querySelector('.modal-content');
    if (content) await user.click(content);

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('should render via portal inside modal-container', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} modalTitle="Test Modal">
        <div>Portal content</div>
      </Modal>
    );

    const modalContainer = document.getElementById('modal-container');
    expect(modalContainer).toContainHTML('Test Modal');
  });
});

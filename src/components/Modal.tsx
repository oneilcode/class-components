import {
  useEffect,
  useLayoutEffect,
  useRef,
  type PropsWithChildren,
} from 'react';
import { createPortal } from 'react-dom';

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalTitle: string;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  modalTitle,
}: PropsWithChildren<IModalProps>) {
  const modalContainer = document.getElementById('modal-container');
  const firstFocusElementRef = useRef(null);

  useEffect(() => {
    function onEscClose(e: KeyboardEvent) {
      if (e.code === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', onEscClose);
    return () => document.removeEventListener('keydown', onEscClose);
  }, [onClose]);

  useLayoutEffect(() => {
    firstFocusElementRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close-btn"
          onClick={onClose}
          ref={firstFocusElementRef}
        >
          x
        </button>
        <h1 className="modal-title">{modalTitle}</h1>
        {children}
      </div>
    </div>,
    modalContainer
  );
}

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;

  backdropClassName?: string;
  modalClassName?: string;
  titleClassName?: string;
  bodyClassName?: string;
  closeButtonClassName?: string;
  modalPreficClass?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  backdropClassName = '',
  modalClassName = '',
  titleClassName = '',
  bodyClassName = '',
  modalPreficClass = '',
  closeButtonClassName = '',
}) => {
  const [show, setShow] = useState(isOpen);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      setClosing(false);
    } else if (show) {
      setClosing(true);
      const timer = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen, show]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen, onClose]);

  if (!show) return null;

  const modalContent = (
    <div
      className={`${styles.backdrop} ${closing ? styles.fadeOut : styles.fadeIn} ${backdropClassName} ${modalPreficClass}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`${styles.modal} ${closing ? styles.scaleOut : styles.scaleIn} ${modalClassName}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={`${styles.closeButton} ${closeButtonClassName}`}
          onClick={onClose}
          aria-label="Close Modal"
        >
          &times;
        </button>
        {title && <h2 className={`${styles.title} ${titleClassName}`}>{title}</h2>}
        <div className={`${styles.body} ${bodyClassName}`}>{children}</div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import Button from '../ui/Button';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  confirmLabel,
  onConfirm,
  confirmVariant = 'primary',
  cancelLabel = 'Batal',
  isConfirmLoading = false,
  maxWidth = '520px'
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-content"
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="card-header">
          <h3 className="card-title">{title}</h3>
          <button
            onClick={onClose}
            className="btn-ghost"
            style={{ padding: 4, borderRadius: 6, display: 'flex', alignItems: 'center' }}
            aria-label="Tutup"
          >
            <X size={18} />
          </button>
        </div>
        <div className="card-body">
          {children}
        </div>
        {(confirmLabel || cancelLabel) && (
          <div className="card-footer">
            {cancelLabel && (
              <Button variant="secondary" size="md" onClick={onClose} disabled={isConfirmLoading}>
                {cancelLabel}
              </Button>
            )}
            {confirmLabel && onConfirm && (
              <Button
                variant={confirmVariant}
                size="md"
                onClick={onConfirm}
                isLoading={isConfirmLoading}
              >
                {confirmLabel}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

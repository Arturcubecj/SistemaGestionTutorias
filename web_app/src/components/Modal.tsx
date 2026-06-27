import { ReactNode } from 'react';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  titulo?: string;
  children: ReactNode; 
}

export default function Modal({ isOpen, onClose, titulo = "", children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
        
        <div className="modal-header">
          <h3>{titulo}</h3>
          <button className="btn-modal-close" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="modal-body">
          {children}
        </div>

      </div>
    </div>
  );
}
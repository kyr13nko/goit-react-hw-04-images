import { useEffect } from 'react';
import { ModalWrapper, Overlay } from './Modal.styled';

const Modal = ({ onClose, children }) => {
  useEffect(() => {
    const handleEscape = event => {
      if (event.code === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleBackdrop = event => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <Overlay onClick={handleBackdrop}>
      <ModalWrapper>{children}</ModalWrapper>
    </Overlay>
  );
};

export default Modal;

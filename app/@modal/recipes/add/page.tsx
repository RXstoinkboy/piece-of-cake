import { useRouter } from 'next/navigation';
import React from 'react';

const Modal = ({ children }) => {
  const router = useRouter();

  const onDismiss = () => {
    router.back(); // Go back to the previous page (e.g., /recipes)
  };

  return (
    <div
      onClick={onDismiss}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000, // Ensure it's on top
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing modal
        style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
          maxWidth: '500px',
          width: '100%',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {children}
        <button
          onClick={onDismiss}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
          }}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default function AddRecipeModal() {
  return (
    <Modal>
      <div style={{ textAlign: 'center' }}>
        <h2>Add New Recipe (Modal Overlay)</h2>
        <p>This is the modal view for adding a new recipe.</p>
        <p>You would put your Add Recipe form/component here.</p>
      </div>
    </Modal>
  );
}

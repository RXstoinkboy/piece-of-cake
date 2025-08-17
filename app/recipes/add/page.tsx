import React from 'react';

export default function AddRecipePage() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f0f0',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center'
      }}>
        <h2>Add New Recipe (Full Page)</h2>
        <p>This is the full page view for adding a new recipe.</p>
        <p>You would put your Add Recipe form/component here.</p>
        {/* In a real app, you might add a close button or redirect if direct access is not intended */}
      </div>
    </div>
  );
}

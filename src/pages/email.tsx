import React from 'react';

export default function Email() {
  return (
    <div
      style={{
        backgroundColor: '#000F33',
        display: 'flex',
        minHeight: '100vh',
        justifyContent: 'center',
      }}
    >
      <div style={{ marginTop: '40px' }}>
        <img src="images/octo-optimizer-full-logo.svg" />
      </div>
      <div style={{ marginTop: '144px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
            alignItems: 'center',
          }}
        >
          {' '}
          <h2
            style={{
              color: 'white',
              fontSize: '36px',
              lineHeight: '48px',
              fontWeight: '700',
            }}
          >
            Confirm Your
          </h2>
          <h2
            style={{
              color: '#9EE2FF',
              fontSize: '36px',
              lineHeight: '48px',
              fontWeight: '700',
              fontStyle: 'italic',
            }}
          >
            Email
          </h2>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { AbsoluteFill } from 'remotion';

export const VideoPromo: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#111827',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          color: '#ffffff',
          fontSize: '48px',
          fontWeight: 'bold',
          fontFamily: 'Montserrat, sans-serif',
          textAlign: 'center',
        }}
      >
        Video Principal
        <div style={{ fontSize: '24px', color: '#9ca3af', marginTop: '20px' }}>
          (Se armará después con los componentes)
        </div>
      </div>
    </AbsoluteFill>
  );
};

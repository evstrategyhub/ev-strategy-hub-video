import React from 'react';
import { AbsoluteFill } from 'remotion';
import { EVPicksMain } from '../components/EVPicksMain';

export const EVPicksMainComposition: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#111827',
        padding: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <EVPicksMain />
    </AbsoluteFill>
  );
};
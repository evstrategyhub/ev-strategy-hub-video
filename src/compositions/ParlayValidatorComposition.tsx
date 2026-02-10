import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ParlayValidator } from '../components/ParlayValidator';

export const ParlayValidatorComposition: React.FC = () => {
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
      <ParlayValidator />
    </AbsoluteFill>
  );
};
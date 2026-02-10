import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CommunityLeaderboard } from '../components/CommunityLeaderboard';

export const CommunityLeaderboardComposition: React.FC = () => {
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
      <CommunityLeaderboard />
    </AbsoluteFill>
  );
};
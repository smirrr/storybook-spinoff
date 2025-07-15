import React from 'react';
import TrendLine from './index';

const data = [
  {
    score: 10,
    color: '#cb202d',
    hoverText: 'sample hover text'
  },
  {
    score: 20,
    color: '#1db510',
    hoverText: 'sample hover text'
  },
  {
    score: 30,
    color: '#f9b312',
    hoverText: 'sample hover text'
  },
  {
    score: 50,
    color: '#cb202d',
    hoverText: 'sample hover text'
  },
  {
    score: 10,
    color: '#1db510',
    hoverText: 'sample hover text'
  },
  {
    score: 200,
    color: '#f9b312',
    hoverText: 'sample hover text'
  }
];

export default {
  title: 'Molecules/TrendLine',
  subtitle: 'TrendLine',
  component: TrendLine
};

export const Default = () => {
  return <TrendLine data={data} height={100} width={200} />;
};

export const TrendLineWithDataLimit = () => {
  return (
    <TrendLine data={data} height={100} visibleDataLimit={3} width={200} />
  );
};

export const TrendLineWithHideFirstScoreText = () => {
  return <TrendLine data={data} height={100} hideFirstScoreText width={200} />;
};

export const TrendLineWithHideLastScoreText = () => {
  return <TrendLine data={data} height={100} hideLastScoreText width={200} />;
};

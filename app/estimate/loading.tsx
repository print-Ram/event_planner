import React from 'react';
import DelayedSkeleton from '@/components/ui/DelayedSkeleton';

export default function EstimateLoading() {
  return <DelayedSkeleton delayMs={200} variant="wizard" />;
}

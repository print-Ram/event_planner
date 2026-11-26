import React from 'react';
import DelayedSkeleton from '@/components/ui/DelayedSkeleton';

export default function RootLoading() {
  return <DelayedSkeleton delayMs={200} variant="editorial" />;
}

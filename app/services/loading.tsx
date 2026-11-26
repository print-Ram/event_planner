import React from 'react';
import DelayedSkeleton from '@/components/ui/DelayedSkeleton';

export default function ServicesLoading() {
  return <DelayedSkeleton delayMs={200} variant="grid" />;
}

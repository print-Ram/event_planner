import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SERVICES_DATA, getServiceById } from '../../../lib/servicesData';
import ServiceDetailView from '../../../components/ServiceDetailView';

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    id: service.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = getServiceById(params.id);

  if (!service) {
    return {
      title: 'Service Not Found | Sri Ram Events',
    };
  }

  return {
    title: `${service.name} | Sri Ram Events Madanapalle, Tirupati, Punganur & AP`,
    description: `${service.heroSummary} Main branch at Madanapalle, serving Tirupati, Punganur, Kothakota & across Andhra Pradesh.`,
    keywords: `${service.name} Madanapalle, ${service.name} Tirupati, ${service.name} Punganur, Event Decor Andhra Pradesh, Sri Ram Events`,
    openGraph: {
      title: `${service.name} | Sri Ram Events`,
      description: service.heroSummary,
      images: [
        {
          url: service.masterBannerImage,
          width: 1200,
          height: 800,
          alt: service.name,
        },
      ],
    },
  };
}

export default function ServicePage({ params }: PageProps) {
  const service = getServiceById(params.id);

  if (!service) {
    notFound();
  }

  return <ServiceDetailView service={service} />;
}

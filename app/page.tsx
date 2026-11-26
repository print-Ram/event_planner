import React from 'react';
import SiteShell from '@/components/layout/SiteShell';
import HeroSection from '@/components/home/HeroSection';
import AboutIntroSection from '@/components/home/AboutIntroSection';
import EventCategoriesSection from '@/components/home/EventCategoriesSection';
import FeaturedServicesSection from '@/components/home/FeaturedServicesSection';
import FeaturedPortfolioSection from '@/components/home/FeaturedPortfolioSection';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import InstagramFeedSection from '@/components/home/InstagramFeedSection';
import ReviewsSection from '@/components/home/ReviewsSection';
import BookingCTASection from '@/components/home/BookingCTASection';
import {
  getBusinessSettings,
  getPortfolioProjects,
  getServices,
  getTestimonials,
} from '@/lib/data/repository';
import { getInstagramFeed } from '@/lib/instagram/service';

export const revalidate = 60;

export default async function HomePage() {
  const [settings, services, portfolio, reviews, instagramFeed] = await Promise.all([
    getBusinessSettings(),
    getServices(false),
    getPortfolioProjects(false),
    getTestimonials(false),
    getInstagramFeed(6),
  ]);

  return (
    <SiteShell>
      <HeroSection />
      <AboutIntroSection settings={settings} />
      <EventCategoriesSection />
      <FeaturedServicesSection services={services} />
      <FeaturedPortfolioSection projects={portfolio} />
      <WhyChooseUsSection />
      <InstagramFeedSection settings={settings} posts={instagramFeed.posts} />
      <ReviewsSection reviews={reviews} />
      <BookingCTASection settings={settings} />
    </SiteShell>
  );
}

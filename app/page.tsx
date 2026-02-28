import type { Metadata } from 'next';
import HomeHero from '@/components/sections/HomeHero';
import TwoProducts from '@/components/sections/TwoProducts';
import FeatureGrid from '@/components/sections/FeatureGrid';
import HowItWorks from '@/components/sections/HowItWorks';
import Stats from '@/components/sections/Stats';
import CTABanner from '@/components/sections/CTABanner';

export const metadata: Metadata = {
  title: 'StayKeep — The modern way to manage & book stays',
  description: 'One platform for guests to discover amazing stays and for hosts to run their property business effortlessly.',
};

export default function Home() {
  return (
    <>
      <HomeHero />
      <Stats />
      <TwoProducts />
      <FeatureGrid />
      <HowItWorks />
      <CTABanner />
    </>
  );
}

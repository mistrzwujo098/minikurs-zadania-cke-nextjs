import Navigation from '@/components/layout/Navigation';
import OTOHero from '@/components/sections/OTOHero';
import OTOCounter from '@/components/ui/OTOCounter';
import PricingTable from '@/components/sections/PricingTable';
import Problem from '@/components/sections/Problem';
import Solution from '@/components/sections/Solution';
import Testimonials from '@/components/sections/Testimonials';
import HowItWorks from '@/components/sections/HowItWorks';
import Guarantee from '@/components/sections/Guarantee';
import About from '@/components/sections/About';
import CTA from '@/components/sections/CTA';
import Objections from '@/components/sections/Objections';
import FAQ from '@/components/sections/FAQ';
import FinalCTA from '@/components/sections/FinalCTA';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/ui/ScrollToTop';
import MobileCTA from '@/components/ui/MobileCTA';
import TrustBadges from '@/components/ui/TrustBadges';

export const metadata = {
  title: 'Oferta Specjalna - Matematyka 1 Klasa | Paulina od Matematyki',
  description: 'Jednorazowa oferta! Minikurs matematyki dla 1 klasy w specjalnej cenie. Oferta ważna tylko 15 minut!',
  robots: {
    index: false,
    follow: false,
  },
};

export default function OTOPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <OTOHero />
      <OTOCounter />
      <TrustBadges />
      <PricingTable />
      <Problem />
      <Solution />
      <Testimonials />
      <HowItWorks />
      <Guarantee />
      <About />
      <CTA />
      <Objections />
      <FAQ />
      <FinalCTA />
      <Footer />
      <ScrollToTop />
      <MobileCTA />
    </main>
  );
}

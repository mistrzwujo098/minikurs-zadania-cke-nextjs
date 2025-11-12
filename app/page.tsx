import Navigation from '@/components/layout/Navigation';
import Hero from '@/components/sections/Hero';
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
  title: 'Zadania CKE - Kompletny Kurs | Paulina od Matematyki',
  description: 'Kompletny kurs matematyki dla z oficjalnych zbiorów CKE. 60+ lekcji video, zadania domowe, ściągi. Poziom podstawowy i rozszerzony. 597 zł.',
  keywords: ['matematyka 1 klasa', 'kurs matematyki', 'liceum matematyka', 'matematyka online', 'lekcje matematyki'],
  openGraph: {
    title: 'Zadania CKE - Kompletny Kurs',
    description: 'Kompletny kurs matematyki dla 1 klasy. 60+ lekcji video za 597 zł.',
    type: 'website',
    images: ['https://paulinaodmatematyki.com/wp-content/uploads/2024/08/1-klasa-1.png'],
  },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
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

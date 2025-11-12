# Minikurs Next.js Template

Template do migracji projektów React (CRA) na Next.js 14 + TypeScript + Tailwind CSS + Framer Motion dla Cloudflare Pages.

## Struktura Projektu

```
minikurs-nextjs-template/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout z tracking
│   ├── page.tsx           # Strona główna (standard)
│   ├── oto/              # One-Time Offer variant
│   │   └── page.tsx
│   └── globals.css
├── components/
│   ├── layout/           # Navigation, Footer, etc.
│   ├── sections/         # Hero, Pricing, Testimonials, etc.
│   ├── ui/              # Reusable UI components
│   └── providers/       # React providers (Tracking)
├── lib/
│   ├── config.ts        # Environment config
│   ├── tracking.ts      # Facebook, Google, TikTok tracking
│   ├── mailerlite.ts    # Newsletter integration
│   └── animations.ts    # Framer Motion variants
├── types/
│   └── index.ts         # TypeScript types
├── public/
│   ├── images/
│   └── fonts/
├── .env.example         # Environment variables template
├── next.config.ts       # Next.js configuration
├── tailwind.config.ts   # Tailwind CSS configuration
└── package.json
```

## Wymagania

- Node.js 18+ lub 20+
- npm lub pnpm
- GitHub account
- Cloudflare account

## Instalacja

```bash
# Sklonuj template
git clone <repo-url> minikurs-[project-name]-nextjs
cd minikurs-[project-name]-nextjs

# Zainstaluj zależności
npm install

# Utwórz .env.local
cp .env.example .env.local

# Edytuj .env.local z własnymi wartościami
nano .env.local
```

## Konfiguracja Environment Variables

W pliku `.env.local` ustaw:

```bash
# Project ID (unikalny identyfikator projektu)
NEXT_PUBLIC_PROJECT_ID=1-klasa

# Tracking Pixels
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=123456789
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-123456789
NEXT_PUBLIC_TIKTOK_PIXEL_ID=ABC123DEF456

# Worker URLs
NEXT_PUBLIC_TRACKING_WORKER_URL=https://tracking-api.workers.dev
NEXT_PUBLIC_MAILERLITE_WORKER_URL=https://mailerlite-api.workers.dev

# Checkout URL
NEXT_PUBLIC_CHECKOUT_URL=https://paulinaodmatematyki.salescrmapp.pl
```

## Development

```bash
# Start dev server
npm run dev

# Open http://localhost:3000
```

## Build & Deploy

### Local Build (test)

```bash
# Build dla Cloudflare Pages
npm run pages:build

# Test local preview
npx wrangler pages dev .vercel/output/static
```

### Deploy do Cloudflare Pages

1. **Utwórz GitHub repository**
```bash
git init
git add .
git commit -m "Initial commit: Next.js migration"
git branch -M main
git remote add origin git@github.com:username/minikurs-[project]-nextjs.git
git push -u origin main
```

2. **Utwórz Cloudflare Pages projekt**
   - Idź do Cloudflare Dashboard → Pages
   - "Create a project" → "Connect to Git"
   - Wybierz swoje GitHub repo
   - Konfiguracja:
     - **Framework preset**: Next.js
     - **Build command**: `npm run pages:build`
     - **Build output directory**: `.vercel/output/static`
     - **Environment variables**: Dodaj wszystkie z `.env.example`

3. **Deploy**
   - Push do `main` branch automatycznie triggeruje deploy
   - Preview URLs dla każdego PR

## Migracja z React (CRA) na Next.js

### Krok 1: Analiza obecnego projektu

```bash
# Z oryginalnego projektu CRA
cd minikurs-[project-name]

# Lista komponentów
ls src/components/

# Przykładowa struktura:
# - Navigation.js
# - Hero.js
# - HeroOTO.js
# - PricingTable.js
# - Problem.js
# - Solution.js
# - Testimonials.js
# - ... etc
```

### Krok 2: Konwersja komponentów

Dla każdego komponentu:

#### React (CRA) - `src/components/Hero.js`
```javascript
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen"
    >
      <h1>Hero Title</h1>
    </motion.section>
  );
}
```

#### Next.js - `components/sections/Hero.tsx`
```typescript
'use client'; // Wymagane dla Framer Motion

import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';

export default function Hero() {
  return (
    <motion.section
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="min-h-screen"
    >
      <h1>Hero Title</h1>
    </motion.section>
  );
}
```

### Krok 3: Struktura stron

#### Strona standardowa - `app/page.tsx`
```typescript
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

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
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
```

#### Strona OTO - `app/oto/page.tsx`
```typescript
import Navigation from '@/components/layout/Navigation';
import HeroOTO from '@/components/sections/HeroOTO';
import OTOCounter from '@/components/ui/OTOCounter';
// ... rest same as standard
```

### Krok 4: Metadata i SEO

W `app/layout.tsx` lub `app/page.tsx`:

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Minikurs dla 1 klasy - Paulina od Matematyki',
  description: 'Kompletny kurs matematyki dla 1 klasy liceum. 60+ lekcji wideo, poziom podstawowy i rozszerzony.',
  keywords: ['matematyka', '1 klasa', 'liceum', 'kurs online', 'matura'],
  openGraph: {
    title: 'Minikurs dla 1 klasy',
    description: 'Kompletny kurs matematyki dla 1 klasy',
    images: ['/images/og-image.jpg'],
  },
};
```

## Cloudflare Pages Specifics

### 1. Images

Nie używaj Next.js `<Image>` component - Cloudflare Pages nie wspiera Image Optimization.

```typescript
// ❌ NIE
import Image from 'next/image';
<Image src="/logo.png" width={200} height={50} alt="Logo" />

// ✅ TAK
<img src="/logo.png" alt="Logo" className="w-50 h-auto" />
```

### 2. Build Configuration

W `next.config.ts`:

```typescript
const nextConfig = {
  images: {
    unoptimized: true, // WYMAGANE dla Cloudflare
  },
};
```

### 3. Environment Variables

Wszystkie zmienne muszą być dodane w Cloudflare Dashboard:
- Pages → Settings → Environment variables
- Ustaw dla BOTH: Production AND Preview

## Tracking Integration

### Automatic Tracking

Template automatycznie trackuje:
- **PageView**: przy pierwszym załadowaniu strony
- **Lead**: przy wysłaniu formularza
- **InitiateCheckout**: przy kliknięciu CTA do checkout

### Manual Tracking

```typescript
import { trackEvent, trackInitiateCheckout } from '@/lib/tracking';

// Custom event
const handleClick = () => {
  trackInitiateCheckout(597); // price
  window.location.href = checkoutUrl;
};
```

## MailerLite Integration

```typescript
import { submitLeadForm } from '@/lib/mailerlite';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const result = await submitLeadForm({
    email: 'user@example.com',
    firstName: 'Jan',
    consent: true,
  });

  if (result.success) {
    console.log('Subscribed!');
  }
};
```

## Deployment Checklist

- [ ] GitHub repo created
- [ ] `.env.local` configured (local development)
- [ ] Cloudflare Pages project created
- [ ] Environment variables set in Cloudflare (Production + Preview)
- [ ] Build successful locally (`npm run pages:build`)
- [ ] Build successful on Cloudflare
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Tracking pixels working (check browser console)
- [ ] Form submissions working
- [ ] Master Router updated with routes

## Master Router Configuration

Po deployment, zaktualizuj Master Router Worker:

```javascript
// workers/master-router/index.js
const ROUTES = [
  { kind: 'PREFIX', path: '/1-klasa', host: 'minikurs-1-klasa.pages.dev' },
  { kind: 'PREFIX', path: '/1-klasa-oto', host: 'minikurs-1-klasa.pages.dev', rewrite: '/oto' },
  // ... etc
];
```

## Troubleshooting

### Build errors

```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Tracking not working

1. Check environment variables in Cloudflare Dashboard
2. Check browser console for errors
3. Verify Worker URLs are correct
4. Test with browser extensions disabled

### Preview URLs not working

1. Ensure Preview environment variables are set
2. Check Cloudflare Pages deployment logs
3. Verify build output directory is correct

## Support

Dokumentacja:
- [Next.js Docs](https://nextjs.org/docs)
- [Cloudflare Pages](https://developers.cloudflare.com/pages/)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Made with ❤️ for Paulina od Matematyki**

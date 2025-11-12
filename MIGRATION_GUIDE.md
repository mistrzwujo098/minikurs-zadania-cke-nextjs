# Migration Guide: React (CRA) → Next.js

Kompletny przewodnik migracji wszystkich 12 projektów na Next.js + TypeScript + Tailwind CSS + Framer Motion.

## Przegląd Projektów

### Grupa A: Kursy klasowe (11 projektów - identyczna struktura)

1. **minikurs-1-klasa** → `minikurs-1-klasa-nextjs`
2. **minikurs-2-klasa** → `minikurs-2-klasa-nextjs`
3. **minikurs-3-klasa** → `minikurs-3-klasa-nextjs`
4. **minikurs-7-klasa** → `minikurs-7-klasa-nextjs`
5. **minikurs-osmoklasisty** → `minikurs-osmoklasisty-nextjs`
6. **minikurs-arkusze-egzamin** → `minikurs-arkusze-egzamin-nextjs`
7. **minikurs-arkusze-matura** → `minikurs-arkusze-matura-nextjs`
8. **minikurs-arkusze-rozszerzenie** → `minikurs-arkusze-rozszerzenie-nextjs`
9. **minikurs-pewniaki-matura** → `minikurs-pewniaki-matura-nextjs`
10. **minikurs-strategie-strzelania** → `minikurs-strategie-strzelania-nextjs`
11. **minikurs-zadania-cke** → `minikurs-zadania-cke-nextjs`

### Grupa B: Promocja

12. **promocja-sms-2025** → `promocja-sms-2025-nextjs`

---

## Migracja Krok po Kroku

### Projekt Przykładowy: minikurs-1-klasa

#### Faza 1: Przygotowanie (15 min)

```bash
# 1. Skopiuj template
cp -r minikurs-nextjs-template minikurs-1-klasa-nextjs
cd minikurs-1-klasa-nextjs

# 2. Inicjalizuj git
git init
git branch -M main

# 3. Utwórz .env.local
cp .env.example .env.local

# 4. Edytuj .env.local
NEXT_PUBLIC_PROJECT_ID=1-klasa
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=<twój pixel ID>
NEXT_PUBLIC_GOOGLE_ADS_ID=<twój ads ID>
NEXT_PUBLIC_TIKTOK_PIXEL_ID=<twój tiktok ID>
NEXT_PUBLIC_TRACKING_WORKER_URL=https://tracking-api.workers.dev
NEXT_PUBLIC_MAILERLITE_WORKER_URL=https://mailerlite-api.workers.dev
NEXT_PUBLIC_CHECKOUT_URL=https://paulinaodmatematyki.salescrmapp.pl

# 5. Zainstaluj dependencies
npm install
```

#### Faza 2: Migracja Komponentów (2-3 godziny)

##### 2.1 Analiza obecnych komponentów

```bash
cd ../minikurs-1-klasa/src/components
ls -la

# Output będzie zawierać:
# Navigation.js
# Hero.js
# HeroOTO.js
# PricingTable.js
# Problem.js
# Solution.js
# Testimonials.js
# HowItWorks.js
# Guarantee.js
# About.js
# CTA.js
# Objections.js
# FAQ.js
# FinalCTA.js
# Footer.js
# ScrollToTop.js
# MobileCTA.js
# OTOCounter.js
# TrustBadges.js
```

##### 2.2 Konwersja Navigation Component

**ORYGINALNY** `src/components/Navigation.js`:
```javascript
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      {/* Navigation content */}
    </nav>
  );
}
```

**NOWY** `components/layout/Navigation.tsx`:
```typescript
'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, slideDown } from '@/lib/animations';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      variants={slideDown}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-primary-600">
              Paulina od Matematyki
            </span>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#pricing"
              className="text-gray-700 hover:text-primary-600 transition"
            >
              Cennik
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-primary-600 transition"
            >
              O mnie
            </a>
            <a
              href="#faq"
              className="text-gray-700 hover:text-primary-600 transition"
            >
              FAQ
            </a>
            <a
              href="#pricing"
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
            >
              Kup teraz
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 py-4 space-y-4">
              <a
                href="#pricing"
                className="block text-gray-700 hover:text-primary-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cennik
              </a>
              <a
                href="#about"
                className="block text-gray-700 hover:text-primary-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                O mnie
              </a>
              <a
                href="#faq"
                className="block text-gray-700 hover:text-primary-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FAQ
              </a>
              <a
                href="#pricing"
                className="block bg-primary-600 text-white px-6 py-2 rounded-lg text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Kup teraz
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
```

**KLUCZOWE ZMIANY**:
1. Dodano `'use client'` directive (wymagane dla hooks i interaktywności)
2. Zmiana `.js` → `.tsx`
3. Dodanie TypeScript typów
4. Import animacji z `@/lib/animations`
5. Użycie Framer Motion dla lepszych animacji
6. Dodanie `AnimatePresence` dla mobile menu

##### 2.3 Konwersja Hero Component

**ORYGINALNY** `src/components/Hero.js`:
```javascript
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-purple-50 pt-16">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Kompletny kurs matematyki dla <span className="text-primary-600">1 klasy</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            60+ lekcji wideo | Poziom podstawowy i rozszerzony | Dostęp na rok
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-500" />
              <span>Cały rok materiału</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-500" />
              <span>500+ zadań</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-500" />
              <span>Dostęp 24/7</span>
            </div>
          </div>
          <a
            href="#pricing"
            className="inline-block bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition"
          >
            Kup teraz za 597 zł
          </a>
        </motion.div>
      </div>
    </section>
  );
}
```

**NOWY** `components/sections/Hero.tsx`:
```typescript
'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { slideUp, staggerContainer, staggerItem } from '@/lib/animations';
import { config } from '@/lib/config';
import { trackInitiateCheckout } from '@/lib/tracking';

export default function Hero() {
  const handleCTAClick = () => {
    trackInitiateCheckout(config.project.price.current);
  };

  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-purple-50 pt-16">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h1
            variants={slideUp}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Kompletny kurs matematyki dla{' '}
            <span className="text-primary-600">1 klasy</span>
          </motion.h1>

          <motion.p
            variants={slideUp}
            className="text-xl text-gray-600 mb-8"
          >
            60+ lekcji wideo | Poziom podstawowy i rozszerzony | Dostęp na rok
          </motion.p>

          <motion.div
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {[
              'Cały rok materiału',
              '500+ zadań',
              'Dostęp 24/7',
            ].map((feature) => (
              <motion.div
                key={feature}
                variants={staggerItem}
                className="flex items-center gap-2"
              >
                <CheckCircle className="text-green-500" />
                <span>{feature}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.a
            variants={slideUp}
            href="#pricing"
            onClick={handleCTAClick}
            className="inline-block bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Kup teraz za {config.project.price.current} zł
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
```

**KLUCZOWE ZMIANY**:
1. Dodano `'use client'`
2. Import konfiguracji z `@/lib/config`
3. Tracking przy kliknięciu CTA
4. Użycie reusable animation variants
5. `whileInView` zamiast `animate` dla lepszego performance
6. TypeScript

##### 2.4 Konwersja Footer Component

**NOWY** `components/layout/Footer.tsx`:
```typescript
'use client';

import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-gray-900 text-white py-12"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Paulina od Matematyki</h3>
            <p className="text-gray-400">
              Profesjonalne kursy matematyki online dla uczniów szkół podstawowych
              i średnich.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Przydatne linki</h4>
            <ul className="space-y-2">
              <li>
                <a href="#faq" className="text-gray-400 hover:text-white transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition">
                  O mnie
                </a>
              </li>
              <li>
                <a
                  href="/polityka-prywatnosci"
                  className="text-gray-400 hover:text-white transition"
                >
                  Polityka prywatności
                </a>
              </li>
              <li>
                <a
                  href="/regulamin"
                  className="text-gray-400 hover:text-white transition"
                >
                  Regulamin
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontakt</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: kontakt@paulinaodmatematyki.com</li>
              <li>
                <a
                  href="https://facebook.com/paulinaodmatematyki"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/paulinaodmatematyki"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Paulina od Matematyki. Wszelkie prawa zastrzeżone.</p>
        </div>
      </div>
    </motion.footer>
  );
}
```

#### Faza 3: Struktura Stron (30 min)

##### 3.1 Strona główna (standard) - `app/page.tsx`

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

export const metadata = {
  title: 'Minikurs dla 1 klasy - Paulina od Matematyki',
  description: 'Kompletny kurs matematyki dla 1 klasy liceum. 60+ lekcji wideo, poziom podstawowy i rozszerzony. Dostęp na rok za 597 zł.',
  keywords: ['matematyka', '1 klasa', 'liceum', 'kurs online', 'lekcje wideo'],
  openGraph: {
    title: 'Minikurs dla 1 klasy - Paulina od Matematyki',
    description: 'Kompletny kurs matematyki dla 1 klasy liceum',
    type: 'website',
  },
};

export default function Home() {
  return (
    <main className="min-h-screen">
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

##### 3.2 Strona OTO - `app/oto/page.tsx`

```typescript
import Navigation from '@/components/layout/Navigation';
import HeroOTO from '@/components/sections/HeroOTO';
import OTOCounter from '@/components/ui/OTOCounter';
import PricingTable from '@/components/sections/PricingTable';
// ... rest same as standard page
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Oferta Specjalna - Minikurs 1 klasa',
  description: 'Jednorazowa oferta! Minikurs dla 1 klasy w specjalnej cenie. Oferta ważna tylko 15 minut!',
  robots: {
    index: false, // Don't index OTO pages
    follow: false,
  },
};

export default function OTOPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroOTO />
      <OTOCounter />
      <PricingTable />
      {/* ... same sections as standard */}
      <Footer />
    </main>
  );
}
```

#### Faza 4: Content Migration (1-2 godziny)

Dla każdej sekcji, skopiuj content z oryginalnego projektu:

```typescript
// components/sections/Problem.tsx
'use client';

import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';

export default function Problem() {
  const problems = [
    {
      title: 'Nie rozumiesz materiału w szkole',
      description: 'Nauczyciel idzie za szybko, nie masz czasu na pytania',
    },
    {
      title: 'Brakuje Ci praktyki',
      description: 'W szkole rozwiązujecie tylko kilka zadań, to za mało',
    },
    {
      title: 'Korepetycje są drogie',
      description: 'Godzina korepetycji to 80-150 zł, rocznie to kilka tysięcy',
    },
  ];

  return (
    <section id="problem" className="section-padding bg-red-50">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={staggerItem} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Zmagasz się z matematyką?
            </h2>
            <p className="text-xl text-gray-600">
              Nie jesteś sam. Większość uczniów ma te same problemy:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <AlertTriangle className="text-red-500 w-12 h-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">{problem.title}</h3>
                <p className="text-gray-600">{problem.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

#### Faza 5: Testing (1 godzina)

```bash
# 1. Zainstaluj dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Test w przeglądarce
# - http://localhost:3000 (standard page)
# - http://localhost:3000/oto (OTO page)

# 4. Check tracking w console
# - Otwórz Developer Tools → Console
# - Powinieneś zobaczyć tracking events

# 5. Test formularzy
# - Wypełnij email
# - Submit
# - Check MailerLite Worker response

# 6. Test responsive
# - Mobile (375px)
# - Tablet (768px)
# - Desktop (1920px)

# 7. Test animations
# - Scroll przez całą stronę
# - Wszystkie animacje powinny działać smooth
```

#### Faza 6: Build & Deploy (30 min)

```bash
# 1. Build locally
npm run pages:build

# 2. Verify build
ls -la .vercel/output/static

# 3. Commit to git
git add .
git commit -m "feat: Next.js migration complete"

# 4. Create GitHub repo
# - GitHub.com → New repository
# - Name: minikurs-1-klasa-nextjs
# - Private/Public (twój wybór)

# 5. Push to GitHub
git remote add origin git@github.com:username/minikurs-1-klasa-nextjs.git
git push -u origin main

# 6. Create Cloudflare Pages project
# - Cloudflare Dashboard → Pages
# - "Create a project" → "Connect to Git"
# - Select: minikurs-1-klasa-nextjs
# - Configuration:
#   - Framework: Next.js
#   - Build command: npm run pages:build
#   - Build output: .vercel/output/static
#   - Environment variables: Add all from .env.example

# 7. Deploy
# - Click "Save and Deploy"
# - Wait for build (2-5 min)
# - Get deployment URL: minikurs-1-klasa-nextjs.pages.dev

# 8. Test production
# - Visit deployment URL
# - Test tracking (check Console)
# - Test forms
# - Test responsive
```

---

## Pozostałe Projekty

### Projekty 2-11: Identyczna procedura

Dla każdego z pozostałych kursów klasowych:
1. Skopiuj template
2. Zmień `PROJECT_ID` w `.env.local`
3. Skopiuj content z oryginalnego projektu
4. Update metadata (title, description)
5. Build & deploy

**Przykład dla minikurs-osmoklasisty**:

```bash
cp -r minikurs-nextjs-template minikurs-osmoklasisty-nextjs
cd minikurs-osmoklasisty-nextjs

# Update .env.local
NEXT_PUBLIC_PROJECT_ID=osmoklasisty

# Update metadata w app/page.tsx
title: 'Przygotowanie do egzaminu ósmoklasisty - Paulina od Matematyki'
description: 'Kompletny kurs przygotowujący do egzaminu ósmoklasisty. 500+ rozwiązanych zadań.'

# Skopiuj content z ../minikurs-osmoklasisty/src/components/
# Update każdy component z content specyficznym dla projektu

# Build & deploy
npm run pages:build
git init && git add . && git commit -m "Initial commit"
# ... push to GitHub & Cloudflare
```

### Projekt 12: promocja-sms-2025 (prostszy)

Promocja ma prostszą strukturę (tylko 1 główny component):

```bash
cp -r minikurs-nextjs-template promocja-sms-2025-nextjs
cd promocja-sms-2025-nextjs

# W app/page.tsx potrzebujesz tylko:
# - Navigation
# - Main promo section (z countdown)
# - Course comparison
# - Footer

# Brak:
# - OTO variant
# - Wielu sekcji (Problem, Solution, etc.)
```

**`components/sections/PromoHero.tsx`**:

```typescript
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

export default function PromoHero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2025-07-31T23:59:59');

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-purple-600 to-pink-600 text-white pt-16">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Promocja SMS dla Absolwentów
          </h1>

          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Clock className="w-6 h-6" />
              <h2 className="text-2xl font-semibold">Oferta ważna do:</h2>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'Dni', value: timeLeft.days },
                { label: 'Godzin', value: timeLeft.hours },
                { label: 'Minut', value: timeLeft.minutes },
                { label: 'Sekund', value: timeLeft.seconds },
              ].map((item) => (
                <div key={item.label} className="bg-white/20 rounded-lg p-4">
                  <div className="text-4xl font-bold">{item.value}</div>
                  <div className="text-sm">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-2xl mb-8">
            Wszystkie 4 kursy w jednej cenie!
          </p>

          <a
            href="#pricing"
            className="inline-block bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
          >
            Zobacz ofertę
          </a>
        </motion.div>
      </div>
    </section>
  );
}
```

---

## Checklist dla Każdego Projektu

### Development
- [ ] Template skopiowany
- [ ] `.env.local` skonfigurowany
- [ ] Dependencies zainstalowane
- [ ] Wszystkie komponenty przekonwertowane na TypeScript
- [ ] Content skopiowany z oryginalnego projektu
- [ ] Metadata zaktualizowana
- [ ] Dev server działa (`npm run dev`)
- [ ] Wszystkie sekcje renderują się poprawnie
- [ ] Animacje działają smooth
- [ ] Responsive design działa (mobile/tablet/desktop)

### Testing
- [ ] Local build successful (`npm run pages:build`)
- [ ] Tracking pixels działają (sprawdzone w Console)
- [ ] Formularze submittują się poprawnie
- [ ] Wszystkie linki działają
- [ ] Images ładują się
- [ ] Performance dobry (Lighthouse >90)

### Deployment
- [ ] GitHub repo utworzone
- [ ] Code wypushowany do GitHub
- [ ] Cloudflare Pages projekt utworzony
- [ ] Environment variables ustawione (Prod + Preview)
- [ ] Build successful na Cloudflare
- [ ] Deployment URL działa
- [ ] Custom domain skonfigurowana (opcjonalnie)
- [ ] SSL certificate aktywny

### Post-Deployment
- [ ] Tracking weryfikowany na production
- [ ] Forms testowane na production
- [ ] Analytics skonfigurowane
- [ ] Master Router zaktualizowany (jeśli używany)

---

## Troubleshooting

### Problem: Build fails z TypeScript errors

```bash
# Solution: Check wszystkie komponenty dla TypeScript errors
npm run build

# Typowe błędy:
# 1. Brak types dla props
# 2. Implicit 'any' type
# 3. Missing imports

# Fix: Dodaj explicit types
interface HeroProps {
  title: string;
  subtitle?: string;
}

export default function Hero({ title, subtitle }: HeroProps) {
  // ...
}
```

### Problem: Tracking nie działa

```javascript
// Solution 1: Check environment variables
console.log('FB Pixel:', process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID);

// Solution 2: Check tracking initialization
// W components/providers/TrackingProvider.tsx
useEffect(() => {
  console.log('Initializing tracking...');
  initializeTracking();
  console.log('Tracking initialized');
}, []);

// Solution 3: Verify Worker URLs
// Test Workers directly:
fetch('https://tracking-api.workers.dev', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ test: true }),
}).then(r => r.json()).then(console.log);
```

### Problem: Images nie ładują się

```typescript
// Solution: Use correct paths
// ❌ NIE
<img src="./images/logo.png" />

// ✅ TAK
<img src="/images/logo.png" />

// Zawsze rozpoczynaj ścieżkę od / dla plików w public/
```

### Problem: Animations są laggy

```typescript
// Solution: Use will-change CSS property
<motion.div
  className="will-change-transform"
  variants={slideUp}
>
  {/* content */}
</motion.div>

// Lub w Tailwind config:
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      willChange: {
        transform: 'transform',
      },
    },
  },
};
```

---

## Bulk Migration Script

Dla automatyzacji migracji wszystkich projektów:

```bash
#!/bin/bash
# migrate-all.sh

PROJECTS=(
  "1-klasa"
  "2-klasa"
  "3-klasa"
  "7-klasa"
  "osmoklasisty"
  "arkusze-egzamin"
  "arkusze-matura"
  "arkusze-rozszerzenie"
  "pewniaki-matura"
  "strategie-strzelania"
  "zadania-cke"
  "promocja-sms-2025"
)

for project in "${PROJECTS[@]}"
do
  echo "Migrating $project..."

  # Copy template
  cp -r minikurs-nextjs-template "minikurs-$project-nextjs"
  cd "minikurs-$project-nextjs"

  # Update .env.local
  sed -i '' "s/PROJECT_ID=.*/PROJECT_ID=$project/" .env.local

  # Install dependencies
  npm install

  # Initialize git
  git init
  git add .
  git commit -m "Initial commit: Next.js template"

  cd ..

  echo "✅ $project migrated"
done

echo "🎉 All projects migrated!"
```

Użycie:
```bash
chmod +x migrate-all.sh
./migrate-all.sh
```

---

**Czas total na wszystkie 12 projektów**: 2-3 tygodnie (przy równoległej pracy)
**Czas per projekt**: 4-6 godzin (po pierwszym projekcie, który jest template)

Powodzenia! 🚀

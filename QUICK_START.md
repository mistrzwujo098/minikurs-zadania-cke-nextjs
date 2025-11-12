# Quick Start Guide

Najszybszy sposób na migrację projektu z React (CRA) na Next.js.

## 5-Minute Setup

### 1. Skopiuj Template

```bash
cp -r minikurs-nextjs-template minikurs-1-klasa-nextjs
cd minikurs-1-klasa-nextjs
```

### 2. Konfiguracja

```bash
# Utwórz .env.local
cp .env.example .env.local

# Edytuj .env.local
NEXT_PUBLIC_PROJECT_ID=1-klasa
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=your-pixel-id
NEXT_PUBLIC_GOOGLE_ADS_ID=your-ads-id
NEXT_PUBLIC_TIKTOK_PIXEL_ID=your-tiktok-id
NEXT_PUBLIC_TRACKING_WORKER_URL=https://tracking-api.workers.dev
NEXT_PUBLIC_MAILERLITE_WORKER_URL=https://mailerlite-api.workers.dev
NEXT_PUBLIC_CHECKOUT_URL=https://paulinaodmatematyki.salescrmapp.pl
```

### 3. Instalacja

```bash
npm install
```

### 4. Development

```bash
npm run dev
# Open http://localhost:3000
```

---

## Migracja Komponentów (Cheat Sheet)

### React Component → Next.js Component

```typescript
// PRZED (React/CRA)
// src/components/Hero.js
import { motion } from 'framer-motion';

export default function Hero() {
  return <section>Hero</section>;
}

// PO (Next.js)
// components/sections/Hero.tsx
'use client';  // ← DODAJ to dla interactive components

import { motion } from 'framer-motion';

export default function Hero() {
  return <section>Hero</section>;
}
```

### Kluczowe Zmiany

1. **Dodaj `'use client'`** na początku pliku dla:
   - Components z `useState`, `useEffect`, etc.
   - Components z `framer-motion`
   - Components z event handlers (`onClick`, etc.)

2. **Zmień rozszerzenie** `.js` → `.tsx`

3. **Dodaj typy TypeScript**:

```typescript
// PRZED
export default function Hero({ title, subtitle }) {
  return <h1>{title}</h1>;
}

// PO
interface HeroProps {
  title: string;
  subtitle?: string;
}

export default function Hero({ title, subtitle }: HeroProps) {
  return <h1>{title}</h1>;
}
```

4. **Images**: Nie używaj Next.js `<Image>` (Cloudflare nie wspiera)

```typescript
// ❌ NIE
import Image from 'next/image';
<Image src="/logo.png" width={200} height={50} alt="Logo" />

// ✅ TAK
<img src="/logo.png" alt="Logo" className="w-50 h-auto" />
```

---

## Component Conversion Examples

### Navigation

```bash
# Copy from old project
cp ../minikurs-1-klasa/src/components/Navigation.js .

# Rename to .tsx
mv Navigation.js components/layout/Navigation.tsx

# Add 'use client' at top
# Add types for props
# Update imports to use @/ alias
```

**Template** → `components/layout/Navigation.tsx` ✅ Already created

### Hero

**From**: `src/components/Hero.js`
**To**: `components/sections/Hero.tsx`

**Template** → `components/sections/Hero.tsx` ✅ Already created

### Footer

**Template** → `components/layout/Footer.tsx` ✅ Already created

---

## Strony (Pages)

### Standard Page

**`app/page.tsx`**:

```typescript
import Navigation from '@/components/layout/Navigation';
import Hero from '@/components/sections/Hero';
import Footer from '@/components/layout/Footer';
// ... import all sections

export const metadata = {
  title: 'Minikurs 1 klasa - Paulina od Matematyki',
  description: 'Opis kursu...',
};

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      {/* All sections */}
      <Footer />
    </main>
  );
}
```

### OTO Page

**`app/oto/page.tsx`**:

```typescript
import Navigation from '@/components/layout/Navigation';
import HeroOTO from '@/components/sections/HeroOTO';
// ... same imports as standard

export const metadata = {
  title: 'Oferta Specjalna - Minikurs 1 klasa',
  robots: { index: false }, // Don't index OTO pages
};

export default function OTOPage() {
  return (
    <main>
      <Navigation />
      <HeroOTO />
      {/* Same sections as standard */}
    </main>
  );
}
```

---

## Common Tasks

### Add New Section Component

```bash
# Create file
touch components/sections/Testimonials.tsx
```

```typescript
'use client';

import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';

export default function Testimonials() {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="section-padding bg-gray-50"
    >
      <div className="container">
        <h2 className="text-4xl font-bold text-center mb-12">
          Opinie uczniów
        </h2>
        {/* Content */}
      </div>
    </motion.section>
  );
}
```

### Add Tracking to CTA

```typescript
import { trackInitiateCheckout } from '@/lib/tracking';
import { config } from '@/lib/config';

const handleClick = () => {
  trackInitiateCheckout(config.project.price.current);
};

<button onClick={handleClick}>
  Kup teraz
</button>
```

### Add Form with MailerLite

```typescript
'use client';

import { useState } from 'react';
import { submitLeadForm } from '@/lib/mailerlite';

export default function LeadForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await submitLeadForm({
      email,
      consent: true,
    });

    if (result.success) {
      alert('Dziękujemy!');
      setEmail('');
    } else {
      alert('Błąd: ' + result.error);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Twój email"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Wysyłanie...' : 'Zapisz się'}
      </button>
    </form>
  );
}
```

---

## Build & Deploy (Fast Track)

### Local Build

```bash
npm run pages:build
```

### Deploy to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Next.js migration"
git branch -M main
git remote add origin git@github.com:username/minikurs-1-klasa-nextjs.git
git push -u origin main
```

### Deploy to Cloudflare (via Dashboard)

1. Cloudflare Dashboard → Pages
2. "Create a project" → "Connect to Git"
3. Select repo: `minikurs-1-klasa-nextjs`
4. Settings:
   - Framework: **Next.js**
   - Build command: `npm run pages:build`
   - Output directory: `.vercel/output/static`
5. Add all environment variables from `.env.local`
6. Save and Deploy

---

## Troubleshooting

### Error: "You're importing a component that needs useState..."

**Fix**: Add `'use client'` at top of file

```typescript
'use client';  // ← ADD THIS

import { useState } from 'react';
// ...
```

### Error: "Module not found: Can't resolve '@/...'"

**Fix**: Check `tsconfig.json` has paths configured:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Tracking not working

**Fix**: Check environment variables in Cloudflare Dashboard

```bash
# Cloudflare Dashboard → Pages → Project → Settings → Environment variables
# Make sure ALL variables are set for BOTH Production AND Preview
```

### Build fails with TypeScript errors

**Fix**: Add explicit types

```typescript
// Error: Parameter 'props' implicitly has an 'any' type
function Component(props) { ... }

// Fix:
interface ComponentProps {
  title: string;
}
function Component(props: ComponentProps) { ... }
```

---

## Checklist

### Before Starting
- [ ] Template copied
- [ ] `.env.local` created and configured
- [ ] Dependencies installed
- [ ] Dev server running

### During Migration
- [ ] All components converted to `.tsx`
- [ ] `'use client'` added where needed
- [ ] TypeScript types added
- [ ] Imports updated to use `@/` alias
- [ ] Content copied from original project
- [ ] Metadata updated

### Before Deploy
- [ ] Local build successful
- [ ] All pages render correctly
- [ ] Tracking tested in console
- [ ] Forms tested
- [ ] Mobile responsive checked
- [ ] No TypeScript errors

### Deploy
- [ ] GitHub repo created
- [ ] Code pushed
- [ ] Cloudflare Pages project created
- [ ] Environment variables set
- [ ] Build successful
- [ ] Production site works

---

## Time Estimates

| Task | Time |
|------|------|
| Setup template | 5 min |
| Convert components | 1-2 hours |
| Test locally | 30 min |
| Deploy to GitHub | 5 min |
| Deploy to Cloudflare | 15 min |
| **Total** | **2-3 hours** |

*(After first project, subsequent projects faster due to familiarity)*

---

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run lint             # Check for errors

# Cloudflare Pages
npm run pages:build      # Build for Cloudflare
npm run pages:dev        # Dev with Cloudflare adapter
npm run pages:deploy     # Deploy to Cloudflare (requires wrangler)

# Git
git status               # Check changes
git add .                # Stage all changes
git commit -m "message"  # Commit
git push                 # Push to GitHub

# Wrangler (Cloudflare CLI)
wrangler login           # Login to Cloudflare
wrangler pages deploy    # Deploy to Cloudflare Pages
```

---

## Next Steps

1. ✅ Complete first project (minikurs-1-klasa)
2. Use it as reference for remaining 11 projects
3. Create shared component library for common elements
4. Automate deployment with GitHub Actions

---

**Need Help?** Check:
- `README.md` - Full documentation
- `MIGRATION_GUIDE.md` - Detailed migration steps
- `DEPLOYMENT_GUIDE.md` - Deployment instructions

**Happy coding! 🚀**

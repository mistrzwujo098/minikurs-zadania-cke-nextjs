# Deployment Guide: Cloudflare Pages + GitHub

Kompletny przewodnik deployment'u wszystkich 12 projektów Next.js na Cloudflare Pages.

## Przegląd

- **Platform**: Cloudflare Pages
- **Source**: GitHub repositories (12 osobnych repo)
- **Build**: Next.js 14 + Cloudflare Pages adapter
- **Routing**: Master Router Worker dla custom domains
- **Tracking**: Workers dla Facebook/Google/TikTok + MailerLite

---

## Wymagania Wstępne

### 1. Accounts

- [ ] GitHub account (z dostępem do private repos jeśli potrzebne)
- [ ] Cloudflare account (darmowy wystarczy)
- [ ] Dostęp do domeny `paulinaodmatematyki.com`

### 2. Tools

```bash
# Git
git --version  # >=2.0

# Node.js
node --version  # >=18.0.0

# npm
npm --version  # >=9.0.0

# GitHub CLI (opcjonalnie, ale polecane)
gh --version  # >=2.0
# Install: brew install gh (macOS) lub https://cli.github.com
```

### 3. SSH Keys dla GitHub

```bash
# Generate SSH key (jeśli nie masz)
ssh-keygen -t ed25519 -C "your_email@example.com"

# Start ssh-agent
eval "$(ssh-agent -s)"

# Add key
ssh-add ~/.ssh/id_ed25519

# Copy public key
cat ~/.ssh/id_ed25519.pub

# Add to GitHub:
# GitHub.com → Settings → SSH and GPG keys → New SSH key
```

---

## Deployment Strategy

### Architektura

```
paulinaodmatematyki.com
├── /1-klasa        → minikurs-1-klasa.pages.dev
├── /1-klasa-oto    → minikurs-1-klasa.pages.dev/oto
├── /osmoklasisty   → minikurs-osmoklasisty.pages.dev
├── /osmoklasisty-oto → minikurs-osmoklasisty.pages.dev/oto
└── ... (24 routes total: 12 standard + 12 OTO)

Master Router Worker
└── Routes traffic to correct Cloudflare Pages project
```

---

## Phase 1: GitHub Setup

### Option A: Manual (przez GitHub Web UI)

Dla każdego projektu:

1. **Utwórz nowe repo**
   - GitHub.com → Repositories → New
   - Name: `minikurs-[project]-nextjs`
   - Description: `Next.js migration of minikurs-[project]`
   - Private/Public (twój wybór)
   - ❌ **NIE** inicjalizuj z README, .gitignore, license

2. **Push local code**
   ```bash
   cd minikurs-1-klasa-nextjs

   git remote add origin git@github.com:username/minikurs-1-klasa-nextjs.git
   git branch -M main
   git push -u origin main
   ```

### Option B: Automated (przez GitHub CLI)

**Recommended!** Szybsze dla 12 projektów.

```bash
# 1. Login do GitHub CLI
gh auth login
# Follow prompts → SSH → Authenticate

# 2. Script dla wszystkich projektów
#!/bin/bash
# create-github-repos.sh

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
  echo "Creating repo for $project..."

  cd "minikurs-$project-nextjs"

  # Create GitHub repo
  gh repo create "minikurs-$project-nextjs" \
    --private \
    --source=. \
    --remote=origin \
    --push

  echo "✅ Repo created and pushed: minikurs-$project-nextjs"

  cd ..
done

echo "🎉 All 12 repos created!"
```

**Użycie**:
```bash
chmod +x create-github-repos.sh
./create-github-repos.sh
```

---

## Phase 2: Cloudflare Pages Setup

### Przygotowanie Environment Variables

Utwórz plik `.env.cloudflare` dla każdego projektu z WSZYSTKIMI zmiennymi:

```bash
# .env.cloudflare-1-klasa
NEXT_PUBLIC_PROJECT_ID=1-klasa
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=123456789012345
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-123456789
NEXT_PUBLIC_TIKTOK_PIXEL_ID=ABC123DEF456GHI
NEXT_PUBLIC_TRACKING_WORKER_URL=https://tracking-api.workers.dev
NEXT_PUBLIC_MAILERLITE_WORKER_URL=https://mailerlite-api.workers.dev
NEXT_PUBLIC_CHECKOUT_URL=https://paulinaodmatematyki.salescrmapp.pl
```

### Option A: Manual Setup (przez Cloudflare Dashboard)

Dla każdego projektu:

1. **Create Cloudflare Pages Project**
   - Cloudflare Dashboard → Pages
   - "Create a project"
   - "Connect to Git"
   - Select GitHub account
   - Select repo: `minikurs-1-klasa-nextjs`

2. **Configure Build Settings**
   ```
   Project name: minikurs-1-klasa
   Production branch: main
   Framework preset: Next.js
   Build command: npm run pages:build
   Build output directory: .vercel/output/static
   Root directory: /
   ```

3. **Add Environment Variables**
   - Expand "Environment variables"
   - Add każdą zmienną z `.env.cloudflare-1-klasa`:
     - Variable name: `NEXT_PUBLIC_PROJECT_ID`
     - Value: `1-klasa`
     - Apply to: **Both Production AND Preview** ✅
   - Powtórz dla wszystkich zmiennych

4. **Deploy**
   - Click "Save and Deploy"
   - Wait 2-5 min
   - Deployment URL: `minikurs-1-klasa.pages.dev`

5. **Verify Deployment**
   - Visit `minikurs-1-klasa.pages.dev`
   - Check że strona ładuje się poprawnie
   - Open Console → Check tracking initialization
   - Test formularz newsletter

### Option B: Automated Setup (przez Wrangler CLI)

**Much faster!** Wymaga Wrangler 3.0+.

```bash
# 1. Install Wrangler globally
npm install -g wrangler

# 2. Login do Cloudflare
wrangler login

# 3. Create deployment script
# deploy-all-cloudflare.sh

#!/bin/bash

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
  echo "Deploying $project to Cloudflare Pages..."

  cd "minikurs-$project-nextjs"

  # Build
  npm run pages:build

  # Deploy using Wrangler
  wrangler pages deploy .vercel/output/static \
    --project-name="minikurs-$project" \
    --branch=main

  echo "✅ Deployed: $project"

  cd ..
done

echo "🎉 All projects deployed to Cloudflare Pages!"
```

**UWAGA**: Environment variables muszą być dodane ręcznie przez Dashboard (nawet przy automated deployment).

---

## Phase 3: Environment Variables Configuration

### Bulk Setup Script

Dla uproszczenia, użyj Cloudflare API:

```bash
# set-env-vars.sh

#!/bin/bash

# Your Cloudflare Account ID
ACCOUNT_ID="your-account-id"

# Your Cloudflare API Token (with Pages permissions)
API_TOKEN="your-api-token"

# Project name
PROJECT="minikurs-1-klasa"

# Environment variables
ENV_VARS=(
  "NEXT_PUBLIC_PROJECT_ID=1-klasa"
  "NEXT_PUBLIC_FACEBOOK_PIXEL_ID=123456789"
  "NEXT_PUBLIC_GOOGLE_ADS_ID=AW-123456789"
  "NEXT_PUBLIC_TIKTOK_PIXEL_ID=ABC123"
  "NEXT_PUBLIC_TRACKING_WORKER_URL=https://tracking-api.workers.dev"
  "NEXT_PUBLIC_MAILERLITE_WORKER_URL=https://mailerlite-api.workers.dev"
  "NEXT_PUBLIC_CHECKOUT_URL=https://paulinaodmatematyki.salescrmapp.pl"
)

for env_var in "${ENV_VARS[@]}"
do
  KEY="${env_var%%=*}"
  VALUE="${env_var#*=}"

  # Set for production
  curl -X POST \
    "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects/$PROJECT/env" \
    -H "Authorization: Bearer $API_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"$KEY\",\"value\":\"$VALUE\",\"type\":\"plain_text\"}"

  echo "Set $KEY for $PROJECT"
done
```

**Get Account ID**:
- Cloudflare Dashboard → Pages → any project → URL: `/pages/view/{PROJECT}/{ACCOUNT_ID}`

**Create API Token**:
- Cloudflare Dashboard → My Profile → API Tokens
- "Create Token" → "Edit Cloudflare Workers" template
- Permissions: Pages → Edit
- Continue → Create Token
- Copy token

---

## Phase 4: Custom Domain Setup

### Domain Structure

```
paulinaodmatematyki.com (Main site - WordPress)
├── /1-klasa → CNAME to minikurs-1-klasa.pages.dev
├── /osmoklasisty → CNAME to minikurs-osmoklasisty.pages.dev
└── ... etc (przez Master Router)
```

### Master Router Worker Setup

1. **Update Worker Routes**

```javascript
// workers/master-router/src/index.js

const ROUTES = [
  // Standard pages
  { kind: 'PREFIX', path: '/1-klasa', host: 'minikurs-1-klasa.pages.dev' },
  { kind: 'PREFIX', path: '/2-klasa', host: 'minikurs-2-klasa.pages.dev' },
  { kind: 'PREFIX', path: '/3-klasa', host: 'minikurs-3-klasa.pages.dev' },
  { kind: 'PREFIX', path: '/7-klasa', host: 'minikurs-7-klasa.pages.dev' },
  { kind: 'PREFIX', path: '/osmoklasisty', host: 'minikurs-osmoklasisty.pages.dev' },
  { kind: 'PREFIX', path: '/arkusze-egzamin', host: 'minikurs-arkusze-egzamin.pages.dev' },
  { kind: 'PREFIX', path: '/arkusze-matura', host: 'minikurs-arkusze-matura.pages.dev' },
  { kind: 'PREFIX', path: '/arkusze-rozszerzenie', host: 'minikurs-arkusze-rozszerzenie.pages.dev' },
  { kind: 'PREFIX', path: '/pewniaki-matura', host: 'minikurs-pewniaki-matura.pages.dev' },
  { kind: 'PREFIX', path: '/strategie-strzelania', host: 'minikurs-strategie-strzelania.pages.dev' },
  { kind: 'PREFIX', path: '/zadania-cke', host: 'minikurs-zadania-cke.pages.dev' },
  { kind: 'PREFIX', path: '/promocja-sms', host: 'promocja-sms-2025.pages.dev' },

  // OTO pages
  { kind: 'PREFIX', path: '/1-klasa-oto', host: 'minikurs-1-klasa.pages.dev', rewrite: '/oto' },
  { kind: 'PREFIX', path: '/2-klasa-oto', host: 'minikurs-2-klasa.pages.dev', rewrite: '/oto' },
  { kind: 'PREFIX', path: '/3-klasa-oto', host: 'minikurs-3-klasa.pages.dev', rewrite: '/oto' },
  { kind: 'PREFIX', path: '/7-klasa-oto', host: 'minikurs-7-klasa.pages.dev', rewrite: '/oto' },
  { kind: 'PREFIX', path: '/osmoklasisty-oto', host: 'minikurs-osmoklasisty.pages.dev', rewrite: '/oto' },
  { kind: 'PREFIX', path: '/arkusze-egzamin-oto', host: 'minikurs-arkusze-egzamin.pages.dev', rewrite: '/oto' },
  { kind: 'PREFIX', path: '/arkusze-matura-oto', host: 'minikurs-arkusze-matura.pages.dev', rewrite: '/oto' },
  { kind: 'PREFIX', path: '/arkusze-rozszerzenie-oto', host: 'minikurs-arkusze-rozszerzenie.pages.dev', rewrite: '/oto' },
  { kind: 'PREFIX', path: '/pewniaki-matura-oto', host: 'minikurs-pewniaki-matura.pages.dev', rewrite: '/oto' },
  { kind: 'PREFIX', path: '/strategie-strzelania-oto', host: 'minikurs-strategie-strzelania.pages.dev', rewrite: '/oto' },
  { kind: 'PREFIX', path: '/zadania-cke-oto', host: 'minikurs-zadania-cke.pages.dev', rewrite: '/oto' },
];

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Find matching route
    for (const route of ROUTES) {
      if (url.pathname.startsWith(route.path)) {
        // Rewrite URL to target host
        const targetPath = route.rewrite || url.pathname.replace(route.path, '');
        const targetUrl = `https://${route.host}${targetPath}${url.search}`;

        // Fetch from target
        const response = await fetch(targetUrl, {
          method: request.method,
          headers: request.headers,
          body: request.body,
        });

        // Return response
        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
        });
      }
    }

    // No route matched - return 404
    return new Response('Not Found', { status: 404 });
  },
};
```

2. **Deploy Master Router**

```bash
cd workers/master-router

# Deploy
wrangler deploy

# Output: Published to https://master-router.username.workers.dev
```

3. **Configure Domain Routing**

W Cloudflare Dashboard:
- Websites → `paulinaodmatematyki.com`
- Workers Routes
- Add route:
  - Route: `paulinaodmatematyki.com/*`
  - Worker: `master-router`

---

## Phase 5: Testing & Verification

### Automated Testing Script

```bash
#!/bin/bash
# test-deployments.sh

DOMAIN="paulinaodmatematyki.com"

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
  "promocja-sms"
)

echo "Testing all deployments..."
echo "=========================="

for project in "${PROJECTS[@]}"
do
  echo ""
  echo "Testing $project..."

  # Test standard page
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://$DOMAIN/$project")
  if [ $STATUS -eq 200 ]; then
    echo "✅ Standard page OK ($STATUS)"
  else
    echo "❌ Standard page FAILED ($STATUS)"
  fi

  # Test OTO page (except promocja-sms)
  if [ "$project" != "promocja-sms" ]; then
    STATUS_OTO=$(curl -s -o /dev/null -w "%{http_code}" "https://$DOMAIN/$project-oto")
    if [ $STATUS_OTO -eq 200 ]; then
      echo "✅ OTO page OK ($STATUS_OTO)"
    else
      echo "❌ OTO page FAILED ($STATUS_OTO)"
    fi
  fi
done

echo ""
echo "=========================="
echo "Testing complete!"
```

**Użycie**:
```bash
chmod +x test-deployments.sh
./test-deployments.sh
```

### Manual Testing Checklist

Dla każdego projektu:

#### Standard Page
- [ ] Page loads (200 status)
- [ ] Images load correctly
- [ ] CSS/Tailwind styles applied
- [ ] Navigation works
- [ ] All sections render
- [ ] Animations work smoothly
- [ ] Forms submit successfully
- [ ] Tracking pixels initialized (check Console)
- [ ] Mobile responsive
- [ ] No console errors

#### OTO Page
- [ ] Page loads (200 status)
- [ ] Countdown timer works
- [ ] All features same as standard
- [ ] OTO-specific content displays

#### Performance
- [ ] Lighthouse score >90 (all metrics)
- [ ] Core Web Vitals green
- [ ] First Contentful Paint <1.5s
- [ ] Time to Interactive <3s

#### SEO
- [ ] Meta tags correct
- [ ] Open Graph tags present
- [ ] Robots.txt allows indexing (standard pages)
- [ ] Robots.txt blocks indexing (OTO pages)

#### Tracking
```javascript
// Open browser console on each page

// Should see:
// "Initializing tracking..."
// "Tracking initialized"
// fbq('track', 'PageView')
// gtag('event', 'PageView')
// ttq.track('PageView')
```

---

## Phase 6: Monitoring & Analytics

### Setup Cloudflare Analytics

1. **Enable Web Analytics**
   - Cloudflare Dashboard → Analytics
   - Enable for `paulinaodmatematyki.com`

2. **Configure Alerts**
   - Dashboard → Notifications
   - Create alerts:
     - Deployment failures
     - High error rates (>5%)
     - Traffic spikes

### Setup Error Tracking (Sentry)

```bash
# Install Sentry
npm install @sentry/nextjs

# Initialize
npx @sentry/wizard@latest -i nextjs
```

**`sentry.client.config.ts`**:
```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  debug: false,
});
```

**Add to `.env.cloudflare`**:
```bash
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
```

---

## Troubleshooting

### Build Failures

```bash
# 1. Check build logs
# Cloudflare Dashboard → Pages → Project → Deployments → Latest

# Common issues:
# - Missing environment variables
# - TypeScript errors
# - Dependency version conflicts

# Fix: Check logs, update dependencies, rebuild
npm install
npm run pages:build
git add .
git commit -m "fix: resolve build issues"
git push
```

### 404 Errors on Routes

```bash
# Issue: Master Router not configured
# Fix: Check Worker routes

# Test Worker directly:
curl -v https://paulinaodmatematyki.com/1-klasa

# Should return 200, not 404
# If 404, check:
# 1. Worker deployed
# 2. Routes configured in Cloudflare Dashboard
# 3. ROUTES array in Worker includes path
```

### Tracking Not Working

```javascript
// Issue: Environment variables missing
// Fix: Verify in Cloudflare Dashboard

// Pages → Project → Settings → Environment variables
// Ensure ALL variables set for BOTH Production AND Preview

// Test:
fetch('https://minikurs-1-klasa.pages.dev/api/env')
  .then(r => r.json())
  .then(console.log);

// Should return all NEXT_PUBLIC_* variables
```

### Slow Performance

```bash
# Issue: Large bundle size
# Fix: Analyze bundle

npm run build
# Check output for large modules

# Optimize:
# 1. Lazy load components
# 2. Reduce dependencies
# 3. Enable Cloudflare Automatic Platform Optimization (APO)
```

---

## Deployment Checklist (All Projects)

### Pre-Deployment
- [ ] All 12 projects built locally without errors
- [ ] Environment variables prepared for each project
- [ ] GitHub repos created
- [ ] SSH keys configured

### GitHub
- [ ] All 12 repos created on GitHub
- [ ] Code pushed to `main` branch
- [ ] Repos accessible (public or team has access)

### Cloudflare Pages
- [ ] All 12 Projects created in Cloudflare
- [ ] Build settings correct (command, output dir)
- [ ] Environment variables set (Prod + Preview)
- [ ] Initial deployments successful

### Domain & Routing
- [ ] Master Router Worker updated with all 24 routes
- [ ] Worker deployed
- [ ] Worker route configured on domain
- [ ] SSL certificates active

### Testing
- [ ] All 24 pages accessible (12 standard + 12 OTO - promocja)
- [ ] Tracking working on all pages
- [ ] Forms submitting successfully
- [ ] No console errors
- [ ] Performance good (Lighthouse >90)

### Monitoring
- [ ] Cloudflare Analytics enabled
- [ ] Alerts configured
- [ ] Error tracking setup (Sentry)

### Documentation
- [ ] README updated with deployment URLs
- [ ] Team trained on deployment process
- [ ] Rollback procedure documented

---

## Post-Deployment

### Monitor First 24 Hours

```bash
# Check error rates
# Cloudflare Dashboard → Analytics → Errors

# Check traffic
# Cloudflare Dashboard → Analytics → Traffic

# Check performance
# Cloudflare Dashboard → Speed → Web Vitals
```

### Update DNS (if needed)

If moving from old hosting:

```bash
# Old:
A     paulinaodmatematyki.com → 1.2.3.4 (old server)

# New:
CNAME paulinaodmatematyki.com → xxx.pages.dev (Cloudflare Pages)

# Or keep A record and use Workers for routing
```

---

## Rollback Procedure

Jeśli coś pójdzie nie tak:

### Option 1: Rollback via Cloudflare

```bash
# Cloudflare Dashboard → Pages → Project → Deployments
# Find last working deployment
# Click "..." → "Rollback to this deployment"
```

### Option 2: Rollback via Git

```bash
# Revert to previous commit
git log  # Find last working commit
git revert <commit-hash>
git push

# Cloudflare automatically deploys
```

### Option 3: Emergency - Redirect to Old Site

```javascript
// In Master Router Worker, temporarily redirect:

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/1-klasa')) {
      // Redirect to old site
      return Response.redirect('https://old-site.com/1-klasa', 302);
    }

    // ... rest of routes
  },
};

// Deploy immediately:
wrangler deploy
```

---

## Success Metrics

Po successful deployment:

- ✅ All 12 projects deployed
- ✅ 24 routes working (standard + OTO)
- ✅ Tracking operational
- ✅ Forms submitting to MailerLite
- ✅ Performance >90 Lighthouse
- ✅ Zero console errors
- ✅ Mobile responsive
- ✅ SSL certificates active
- ✅ Master Router routing correctly

**Gratulacje! 🎉 Wszystkie projekty deployed na Cloudflare Pages!**

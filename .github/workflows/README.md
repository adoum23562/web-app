# GitHub Actions Workflows

This directory contains the CI/CD workflows for the Rwanda E-Commerce project.

## 📁 Workflows

### 1. ci.yml - Continuous Integration
**Triggers**: Push & PR to `main` or `develop`

**What it does**:
- Installs dependencies
- Runs ESLint
- Builds the Next.js app
- Uploads build artifacts

**Duration**: ~3-5 minutes

### 2. docker.yml - Docker Build & Push
**Triggers**: Push to `main`, tags `v*`, PR to `main`

**What it does**:
- Builds Docker image
- Tags with version/SHA
- Pushes to GitHub Container Registry
- Caches layers for faster builds

**Duration**: ~5-8 minutes

### 3. deploy.yml - Deploy to Vercel
**Triggers**: Push to `main` only

**What it does**:
- Pulls Vercel config
- Builds project
- Deploys to production
- Comments PR with URL

**Duration**: ~4-6 minutes

## 🔐 Required Secrets

Configure these in **Settings** > **Secrets and variables** > **Actions**:

```
NEXT_PUBLIC_SUPABASE_URL         # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY    # Supabase anon key
VERCEL_TOKEN                     # Vercel authentication token
VERCEL_ORG_ID                    # Vercel organization ID
VERCEL_PROJECT_ID                # Vercel project ID
```

## 📊 Status Badges

Add these to your main README.md:

```markdown
[![CI](https://github.com/YOUR_USERNAME/web-app/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/web-app/actions/workflows/ci.yml)
[![Docker](https://github.com/YOUR_USERNAME/web-app/actions/workflows/docker.yml/badge.svg)](https://github.com/YOUR_USERNAME/web-app/actions/workflows/docker.yml)
[![Deploy](https://github.com/YOUR_USERNAME/web-app/actions/workflows/deploy.yml/badge.svg)](https://github.com/YOUR_USERNAME/web-app/actions/workflows/deploy.yml)
```

## 📖 Full Documentation

See [CI_CD_GUIDE.md](../../CI_CD_GUIDE.md) for complete documentation.

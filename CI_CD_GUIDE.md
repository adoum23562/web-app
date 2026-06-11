# 🚀 CI/CD Pipeline - Rwanda E-Commerce

Ce document explique le pipeline CI/CD automatisé avec GitHub Actions.

## 📊 Vue d'Ensemble

Notre pipeline CI/CD se compose de 3 workflows principaux :

1. **CI (Continuous Integration)** - Lint & Build
2. **Docker** - Build & Push des images
3. **Deploy** - Déploiement automatique sur Vercel

## 🔄 Workflow CI - Build and Test

**Fichier** : `.github/workflows/ci.yml`

**Déclencheurs** :
- Push vers `main` ou `develop`
- Pull Request vers `main` ou `develop`

**Étapes** :
1. ✅ Checkout du code
2. ✅ Setup Node.js 20.x
3. ✅ Installation des dépendances (`npm ci`)
4. ✅ Lint ESLint
5. ✅ Build Next.js
6. ✅ Upload des artefacts

**Durée moyenne** : 3-5 minutes

### Statut du Build

[![CI](https://github.com/VOTRE_USERNAME/web-app/actions/workflows/ci.yml/badge.svg)](https://github.com/VOTRE_USERNAME/web-app/actions/workflows/ci.yml)

## 🐳 Workflow Docker - Build and Push

**Fichier** : `.github/workflows/docker.yml`

**Déclencheurs** :
- Push vers `main`
- Tags `v*` (ex: v1.0.0)
- Pull Request vers `main` (build seulement, pas de push)

**Étapes** :
1. ✅ Checkout du code
2. ✅ Setup Docker Buildx
3. ✅ Login au GitHub Container Registry
4. ✅ Extraction des métadonnées (tags, labels)
5. ✅ Build & Push de l'image Docker
6. ✅ Cache des layers Docker

**Registry** : GitHub Container Registry (ghcr.io)

**Tags générés** :
- `main` - Dernière version de la branche main
- `latest` - Alias pour main
- `sha-XXXXXXX` - Par commit SHA
- `v1.0.0` - Par tag sémantique

**Durée moyenne** : 5-8 minutes

### Image Docker

[![Docker](https://github.com/VOTRE_USERNAME/web-app/actions/workflows/docker.yml/badge.svg)](https://github.com/VOTRE_USERNAME/web-app/actions/workflows/docker.yml)

## 🌐 Workflow Deploy - Vercel

**Fichier** : `.github/workflows/deploy.yml`

**Déclencheurs** :
- Push vers `main` uniquement

**Étapes** :
1. ✅ Checkout du code
2. ✅ Setup Node.js
3. ✅ Installation Vercel CLI
4. ✅ Pull des variables d'environnement Vercel
5. ✅ Build des artifacts
6. ✅ Déploiement vers production

**Durée moyenne** : 4-6 minutes

### Déploiement

[![Deploy](https://github.com/VOTRE_USERNAME/web-app/actions/workflows/deploy.yml/badge.svg)](https://github.com/VOTRE_USERNAME/web-app/actions/workflows/deploy.yml)

## 🔐 Secrets GitHub Requis

Pour que les workflows fonctionnent, configurez ces secrets dans GitHub :

### Pour le Build (CI)
```
NEXT_PUBLIC_SUPABASE_URL         # URL de votre projet Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY    # Clé anonyme Supabase
```

### Pour Vercel Deploy
```
VERCEL_TOKEN          # Token d'authentification Vercel
VERCEL_ORG_ID         # ID de votre organisation Vercel
VERCEL_PROJECT_ID     # ID de votre projet Vercel
```

### Configuration des Secrets

1. Allez dans **Settings** > **Secrets and variables** > **Actions**
2. Cliquez sur **New repository secret**
3. Ajoutez chaque secret avec sa valeur

## 📋 Diagramme du Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│                    PUSH TO MAIN                             │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌───────────────┐   ┌───────────────┐   ┌──────────────┐
│   CI Workflow │   │Docker Workflow│   │Deploy Workflow│
│               │   │               │   │              │
│ • Checkout    │   │ • Checkout    │   │ • Checkout   │
│ • Setup Node  │   │ • Setup Docker│   │ • Setup Node │
│ • Install     │   │ • Login GHCR  │   │ • Vercel CLI │
│ • Lint        │   │ • Build Image │   │ • Build      │
│ • Build       │   │ • Push Image  │   │ • Deploy     │
│ • Upload      │   │ • Cache       │   │              │
└───────────────┘   └───────────────┘   └──────────────┘
        │                   │                   │
        └───────────────────┴───────────────────┘
                            │
                    ✅ SUCCESS
                            │
            ┌───────────────┴───────────────┐
            │                               │
            ▼                               ▼
    🌐 Live on Vercel          🐳 Docker Image on GHCR
```

## 🛠️ Configuration Locale

### Tester les Workflows Localement

Utilisez [act](https://github.com/nektos/act) pour tester localement :

```bash
# Installer act
# macOS: brew install act
# Windows: choco install act-cli
# Linux: voir la doc act

# Tester le workflow CI
act push -W .github/workflows/ci.yml

# Tester avec secrets
act push -W .github/workflows/ci.yml --secret-file .secrets
```

### Format du fichier .secrets

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
```

## 📈 Monitoring et Logs

### Voir les Workflows

1. Allez dans l'onglet **Actions** de votre repo GitHub
2. Sélectionnez un workflow
3. Cliquez sur un run pour voir les détails

### Statut des Jobs

Chaque job affiche :
- ✅ Succès (vert)
- ❌ Échec (rouge)
- 🟡 En cours (jaune)
- ⚪ Annulé (gris)

### Logs Détaillés

Cliquez sur chaque étape pour voir les logs complets.

## 🚨 Dépannage

### Le workflow CI échoue

**Erreur : "npm ci failed"**
- Vérifiez que `package-lock.json` est commité
- Supprimez le cache : Actions > Caches > Delete all

**Erreur : "Lint errors"**
- Corrigez les erreurs ESLint localement
- Exécutez `npm run lint` avant de push

**Erreur : "Build failed"**
- Vérifiez que les variables d'environnement sont configurées
- Testez le build localement : `npm run build`

### Le workflow Docker échoue

**Erreur : "Login to registry failed"**
- Vérifiez les permissions du workflow
- Settings > Actions > General > Workflow permissions
- Activez "Read and write permissions"

**Erreur : "Build failed"**
- Vérifiez le Dockerfile
- Testez localement : `docker build -t test .`

### Le workflow Deploy échoue

**Erreur : "VERCEL_TOKEN invalid"**
- Régénérez le token sur Vercel
- Mettez à jour le secret GitHub

**Erreur : "Project not found"**
- Vérifiez `VERCEL_ORG_ID` et `VERCEL_PROJECT_ID`
- Exécutez `vercel link` localement

## 📊 Métriques et Performances

### Build Times

| Workflow | Temps moyen | Max |
|----------|-------------|-----|
| CI       | 3-5 min     | 8 min |
| Docker   | 5-8 min     | 12 min |
| Deploy   | 4-6 min     | 10 min |

### Optimisations

✅ **Cache npm** : Réduit l'installation de 2-3 minutes
✅ **Cache Docker layers** : Réduit le build de 3-5 minutes
✅ **Artefacts** : Partage entre jobs

## 🎯 Best Practices

1. **Commit Messages** : Utilisez des messages clairs
2. **Branch Protection** : Activez les checks obligatoires
3. **Pull Requests** : Toujours passer par une PR pour main
4. **Tests** : Ajoutez des tests avant de merger
5. **Secrets** : Ne jamais les commiter dans le code
6. **Cache** : Utilisez le cache pour accélérer les builds

## 📸 Pour le Rapport

Captures d'écran à inclure :

1. ✅ Onglet Actions montrant les 3 workflows
2. ✅ Un run réussi du workflow CI
3. ✅ Un run réussi du workflow Docker
4. ✅ Un run réussi du workflow Deploy
5. ✅ Page Settings > Secrets configurée
6. ✅ Image Docker dans GitHub Packages
7. ✅ Application déployée sur Vercel

### Diagramme pour le Rapport

Incluez le diagramme ASCII ci-dessus dans votre rapport pour expliquer le pipeline.

## 🔄 Améliorations Futures

- [ ] Ajout de tests automatisés (Jest, Playwright)
- [ ] Notifications Slack/Discord
- [ ] Déploiement multi-environnements (staging, prod)
- [ ] Analyse de sécurité (Snyk, Dependabot)
- [ ] Performance monitoring
- [ ] Rollback automatique en cas d'échec

## 📚 Ressources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [Docker GitHub Actions](https://github.com/docker/build-push-action)

---

**Pipeline configuré avec succès ? Prêt pour la Phase 8 : Déploiement ! 🎉**

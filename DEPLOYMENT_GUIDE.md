# 🚀 Guide de Déploiement - Rwanda E-Commerce

Ce guide explique comment déployer l'application en production sur Vercel avec Supabase.

## 📋 Prérequis

- ✅ Compte GitHub avec le repository
- ✅ Compte Vercel (gratuit)
- ✅ Compte Supabase (gratuit)
- ✅ Application testée localement

## 🗄️ Étape 1 : Configuration Supabase Production

### 1.1 Créer un Projet Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Cliquez sur **"New Project"**
3. Remplissez les informations :
   - **Name** : rwanda-ecommerce-prod
   - **Database Password** : (créez un mot de passe fort)
   - **Region** : Europe West (London)
   - **Pricing Plan** : Free

### 1.2 Exécuter le Schéma de la Base de Données

1. Dans Supabase, allez dans **SQL Editor**
2. Ouvrez le fichier `database/schema.sql` de votre projet
3. Copiez tout le contenu
4. Collez dans l'éditeur SQL
5. Cliquez sur **Run** (Ctrl+Enter)
6. ✅ Vérifiez : "Success. No rows returned"

### 1.3 Insérer les Données de Seed

1. Nouvelle query dans **SQL Editor**
2. Ouvrez `database/seed.sql`
3. Copiez tout le contenu
4. Collez et **Run**
5. ✅ Vérifiez dans **Table Editor** :
   - 6 catégories
   - ~25 produits

### 1.4 Récupérer les Clés API

1. Allez dans **Settings** > **API**
2. Notez :
   - **Project URL** : `https://xxx.supabase.co`
   - **anon public** key

## 🌐 Étape 2 : Déploiement sur Vercel

### 2.1 Importer le Projet

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur **"Add New..."** > **"Project"**
3. Importez votre repository GitHub
4. Sélectionnez **rwanda-ecommerce** (ou votre nom de repo)

### 2.2 Configurer le Projet

**Framework Preset** : Next.js (détecté automatiquement)

**Root Directory** : `./` (racine)

**Build Command** : `npm run build` (par défaut)

**Output Directory** : `.next` (par défaut)

### 2.3 Configurer les Variables d'Environnement

Dans la section **Environment Variables**, ajoutez :

```
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-clé-anon-ici
```

**Important** : Collez les vraies valeurs de Supabase !

### 2.4 Déployer

1. Cliquez sur **Deploy**
2. Attendez 2-3 minutes
3. ✅ **Deployment Complete !**

Votre URL : `https://votre-projet.vercel.app`

## ✅ Étape 3 : Vérification Post-Déploiement

### 3.1 Tester les Pages Principales

- [ ] Page d'accueil : `https://votre-url.vercel.app`
- [ ] Liste produits : `/products`
- [ ] Détails produit : `/products/[slug]`
- [ ] Catégories : `/categories`
- [ ] Panier : `/cart`
- [ ] Checkout : `/checkout`

### 3.2 Tester le Flow Complet

1. ✅ Parcourir les produits
2. ✅ Ajouter au panier (vérifier le badge)
3. ✅ Modifier quantités
4. ✅ Aller au checkout
5. ✅ Remplir le formulaire
6. ✅ Passer une commande de test
7. ✅ Voir la page de confirmation

### 3.3 Vérifier dans Supabase

1. Allez dans **Table Editor** > **orders**
2. ✅ Votre commande de test doit apparaître
3. Vérifiez **customers** et **order_items**
4. Vérifiez que le **stock** des produits a diminué

### 3.4 Tester le Responsive

- [ ] Mobile (< 640px)
- [ ] Tablet (640-1024px)
- [ ] Desktop (> 1024px)

### 3.5 Tester la Performance

Utilisez [PageSpeed Insights](https://pagespeed.web.dev/) :
- URL : `https://votre-url.vercel.app`
- ✅ Score > 80 recommandé

## 🔧 Configuration Avancée

### Domaine Personnalisé (Optionnel)

1. Dans Vercel : **Settings** > **Domains**
2. Ajoutez votre domaine
3. Suivez les instructions DNS

### Variables d'Environnement par Environnement

Vercel supporte 3 environnements :
- **Production** : branche `main`
- **Preview** : Pull Requests
- **Development** : local

Configurez les variables pour chaque environnement si nécessaire.

### Déploiements Automatiques

✅ **Déjà configuré** via GitHub Actions !

Chaque push vers `main` déclenche :
1. CI/CD checks
2. Build automatique
3. Déploiement production

## 🐛 Dépannage

### Erreur : "Build Failed"

**Vérifiez les logs de build dans Vercel**

Causes communes :
1. Variables d'environnement manquantes
2. Erreurs TypeScript
3. Erreurs ESLint

**Solution** : Corrigez localement, testez `npm run build`, puis push.

### Erreur : "Failed to Fetch Products"

**Vérifiez** :
1. Les URLs Supabase sont correctes
2. Les clés API sont valides
3. Les tables existent dans Supabase
4. RLS policies sont configurées

### Erreur 500 sur les API Routes

**Ouvrez les logs Vercel** : **Deployments** > Votre déploiement > **Functions**

Causes communes :
1. Erreur de connexion Supabase
2. Données manquantes en base
3. Erreur dans le code API

### Performance Lente

**Optimisations** :
1. Utilisez le CDN de Vercel (automatique)
2. Optimisez les images (déjà fait avec next/image)
3. Activez le cache Supabase
4. Utilisez l'edge caching de Vercel

## 📊 Monitoring

### Vercel Analytics

1. Activez **Analytics** dans les settings Vercel
2. Suivez :
   - Temps de chargement
   - Core Web Vitals
   - Erreurs

### Supabase Monitoring

1. **Database** > **Usage** : voir les requêtes
2. **Logs** : erreurs et warnings
3. **API** : nombre d'appels

## 🔐 Sécurité

### Checklist Production

- [x] Variables d'environnement sécurisées (pas dans le code)
- [x] HTTPS activé (automatique sur Vercel)
- [x] RLS activé sur Supabase
- [x] Validation des entrées utilisateur
- [x] Pas de secrets dans le code frontend
- [ ] Rate limiting (à ajouter si nécessaire)
- [ ] CORS configuré (si API externe)

### Sauvegarde Supabase

**Recommandé** : Backup automatique hebdomadaire

1. Supabase : **Database** > **Backups**
2. Activez **Automatic Backups** (plan payant)
3. Ou exportez manuellement via SQL

## 📈 Mise à l'Échelle

### Limites du Plan Gratuit

**Vercel Free** :
- 100 GB bandwidth/mois
- Domaines illimités
- Déploiements illimités

**Supabase Free** :
- 500 MB base de données
- 1 GB bandwidth/mois
- 50,000 requêtes API/mois

**Si dépassement** : Upgrade vers plan payant ou optimisez.

### Optimisations

1. **Cache** : Utilisez ISR (Incremental Static Regeneration)
2. **Images** : Déjà optimisées avec next/image
3. **Bundle** : Analysez avec `npm run build`
4. **Database** : Indexez les colonnes fréquemment requêtées

## 📸 Screenshots pour le Rapport

Prenez des captures d'écran de :

1. ✅ Vercel Dashboard avec déploiement réussi
2. ✅ URL de production fonctionnelle
3. ✅ Supabase avec tables et données
4. ✅ Application en production (pages principales)
5. ✅ Commande de test passée
6. ✅ Analytics/Performance (PageSpeed)
7. ✅ GitHub Actions workflows réussis

## 🎯 Checklist Finale

- [ ] Application déployée sur Vercel
- [ ] URL de production accessible
- [ ] Base de données Supabase configurée
- [ ] Données de seed insérées
- [ ] Commande de test réussie
- [ ] Responsive testé (mobile, tablet, desktop)
- [ ] Performance vérifiée (PageSpeed > 80)
- [ ] GitHub Actions fonctionnels
- [ ] Variables d'environnement configurées
- [ ] Documentation complète
- [ ] Screenshots prises

## 🔗 Liens Utiles

- **Vercel Documentation** : [vercel.com/docs](https://vercel.com/docs)
- **Supabase Documentation** : [supabase.com/docs](https://supabase.com/docs)
- **Next.js Deployment** : [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)

---

**Application déployée avec succès ? Passez à la Phase 9 : Tests et Qualité ! ✅**

# 📸 Guide de Screenshots - Rwanda E-Commerce

Ce guide liste toutes les captures d'écran nécessaires pour le rapport de projet.

## 🎯 Objectif

Démontrer visuellement que toutes les exigences du projet sont remplies.

## 📱 Screenshots Application

### 1. Page d'Accueil (Desktop)
**Fichier** : `01-homepage-desktop.png`
- [ ] Hero section avec titre et CTA
- [ ] Section catégories (6 cartes)
- [ ] Section "Pourquoi nous choisir"
- [ ] Footer complet visible

### 2. Page d'Accueil (Mobile)
**Fichier** : `02-homepage-mobile.png`
- [ ] Menu hamburger
- [ ] Hero adapté au mobile
- [ ] Catégories en 1 colonne
- [ ] Responsive confirmé

### 3. Liste des Produits
**Fichier** : `03-products-list.png`
- [ ] Grille de produits (3-4 colonnes)
- [ ] Images, noms, prix visibles
- [ ] Barre de recherche
- [ ] Filtres (catégorie, tri)
- [ ] Pagination

### 4. Filtres et Recherche
**Fichier** : `04-products-filters.png`
- [ ] Recherche en action
- [ ] Filtre catégorie sélectionné
- [ ] Résultats filtrés

### 5. Détails Produit
**Fichier** : `05-product-details.png`
- [ ] Grande image produit
- [ ] Nom, description, prix
- [ ] Sélecteur de quantité
- [ ] Badge stock
- [ ] Bouton "Ajouter au panier"
- [ ] Produits similaires en bas

### 6. Panier - Drawer Ouvert
**Fichier** : `06-cart-drawer.png`
- [ ] Sidebar panier ouvert à droite
- [ ] Articles avec images miniatures
- [ ] Quantités modifiables
- [ ] Total affiché
- [ ] Boutons "Voir panier" et "Commander"

### 7. Badge Panier avec Articles
**Fichier** : `07-cart-badge.png`
- [ ] Header avec badge rouge
- [ ] Nombre d'articles visible
- [ ] Badge animé (si possible)

### 8. Page Panier Complète
**Fichier** : `08-cart-page.png`
- [ ] Liste détaillée des articles
- [ ] Images, noms, prix
- [ ] Contrôles de quantité
- [ ] Sous-totaux
- [ ] Total général
- [ ] Résumé de commande (sidebar)

### 9. Page Checkout
**Fichier** : `09-checkout.png`
- [ ] Formulaire informations client (gauche)
- [ ] Résumé commande (droite)
- [ ] Tous les champs visibles
- [ ] Validation en place

### 10. Page Confirmation
**Fichier** : `10-order-confirmation.png`
- [ ] Message de succès
- [ ] Numéro de commande
- [ ] Informations client
- [ ] Liste articles commandés
- [ ] Total
- [ ] Guide prochaines étapes

### 11. Page Catégories
**Fichier** : `11-categories-page.png`
- [ ] Toutes les catégories
- [ ] Icônes et descriptions
- [ ] Layout carte

## 🗄️ Screenshots Base de Données

### 12. Supabase - Table Editor
**Fichier** : `12-supabase-tables.png`
- [ ] Liste des 5 tables
- [ ] Icônes de relation visibles

### 13. Supabase - Table Products
**Fichier** : `13-supabase-products.png`
- [ ] Données produits visibles
- [ ] Au moins 10-15 lignes
- [ ] Colonnes : name, price, stock, etc.

### 14. Supabase - Table Orders
**Fichier** : `14-supabase-orders.png`
- [ ] Commande(s) de test visible(s)
- [ ] order_number, total_amount, status

### 15. Supabase - SQL Query
**Fichier** : `15-supabase-sql.png`
- [ ] SQL Editor avec requête
- [ ] Résultats affichés
- [ ] Success message

## 🐳 Screenshots Docker

### 16. Docker Build
**Fichier** : `16-docker-build.png`
```bash
docker build -t rwanda-ecommerce .
```
- [ ] Commande complète visible
- [ ] Étapes du build
- [ ] "Successfully built" message

### 17. Docker Images
**Fichier** : `17-docker-images.png`
```bash
docker images
```
- [ ] Liste des images
- [ ] rwanda-ecommerce visible
- [ ] Taille de l'image (< 300MB)

### 18. Docker Run
**Fichier** : `18-docker-run.png`
```bash
docker ps
```
- [ ] Conteneur en cours d'exécution
- [ ] Port 3000 mappé
- [ ] Status "Up"

### 19. Docker Compose
**Fichier** : `19-docker-compose.png`
```bash
docker-compose up
```
- [ ] Logs de démarrage
- [ ] Services lancés
- [ ] "Ready on http://localhost:3000"

## 🔄 Screenshots CI/CD

### 20. GitHub Actions - Workflows
**Fichier** : `20-github-actions-list.png`
- [ ] Onglet Actions
- [ ] Les 3 workflows visibles (CI, Docker, Deploy)
- [ ] Status verts (✓)

### 21. Workflow CI - Success
**Fichier** : `21-workflow-ci.png`
- [ ] Run du workflow CI
- [ ] Toutes les étapes vertes
- [ ] Durée d'exécution
- [ ] Timestamp

### 22. Workflow Docker - Success
**Fichier** : `22-workflow-docker.png`
- [ ] Run du workflow Docker
- [ ] Build et Push réussis
- [ ] Tags générés

### 23. Workflow Deploy - Success
**Fichier** : `23-workflow-deploy.png`
- [ ] Run du workflow Deploy
- [ ] Déploiement sur Vercel réussi
- [ ] URL de déploiement

## 🌐 Screenshots Déploiement

### 24. Vercel Dashboard
**Fichier** : `24-vercel-dashboard.png`
- [ ] Projet visible
- [ ] Status "Ready"
- [ ] URL de production
- [ ] Dernier déploiement

### 25. Application en Production
**Fichier** : `25-app-production.png`
- [ ] URL Vercel dans la barre d'adresse
- [ ] Application fonctionnelle
- [ ] Page d'accueil chargée

### 26. Vercel - Environment Variables
**Fichier** : `26-vercel-env-vars.png`
- [ ] Section Environment Variables
- [ ] Variables configurées (floutées si sensibles)

## 📊 Screenshots Performance

### 27. Lighthouse Report
**Fichier** : `27-lighthouse-report.png`
- [ ] PageSpeed Insights
- [ ] Scores :
  - Performance > 80
  - Accessibility > 90
  - Best Practices > 90
  - SEO > 90

### 28. Mobile Performance
**Fichier** : `28-lighthouse-mobile.png`
- [ ] Scores mobile
- [ ] Core Web Vitals

## 🔍 Screenshots Code

### 29. Structure du Projet
**Fichier** : `29-project-structure.png`
- [ ] VS Code Explorer
- [ ] Dossiers src/, components/, app/
- [ ] Fichiers clés visibles

### 30. Exemple de Code
**Fichier** : `30-code-example.png`
- [ ] Fichier TypeScript ouvert
- [ ] Code propre et commenté
- [ ] Exemple : CartContext.tsx

## 📱 Screenshots Responsive

### 31. Mobile - Menu
**Fichier** : `31-mobile-menu.png`
- [ ] Menu hamburger ouvert
- [ ] Navigation mobile

### 32. Tablet View
**Fichier** : `32-tablet-view.png`
- [ ] Grille 2 colonnes
- [ ] Layout adapté

### 33. Desktop Full
**Fichier** : `33-desktop-full.png`
- [ ] Large écran
- [ ] Grille 4 colonnes
- [ ] Tous les éléments visibles

## 🎨 Screenshots Design

### 34. Color Scheme
**Fichier** : `34-design-colors.png`
- [ ] Palette de couleurs
- [ ] Vert émeraude dominant
- [ ] Cohérence visuelle

### 35. Components UI
**Fichier** : `35-ui-components.png`
- [ ] Boutons (variants)
- [ ] Cards
- [ ] Badges
- [ ] Inputs

## ✅ Checklist de Capture

### Avant de Capturer
- [ ] Navigateur en mode plein écran
- [ ] Zoom à 100%
- [ ] Console fermée
- [ ] Extensions désactivées (AdBlock, etc.)
- [ ] Données de test cohérentes

### Format des Fichiers
- **Format** : PNG
- **Résolution** : 1920x1080 (desktop) / 375x812 (mobile)
- **Nom** : Numérotés et descriptifs
- **Dossier** : `/screenshots/`

### Outils Recommandés
- **Windows** : Outil Capture (Win+Shift+S)
- **macOS** : Cmd+Shift+4
- **Extensions** : Full Page Screen Capture

## 📁 Organisation des Screenshots

```
screenshots/
├── 01-application/
│   ├── 01-homepage-desktop.png
│   ├── 02-homepage-mobile.png
│   ├── 03-products-list.png
│   └── ...
├── 02-database/
│   ├── 12-supabase-tables.png
│   └── ...
├── 03-docker/
│   ├── 16-docker-build.png
│   └── ...
├── 04-cicd/
│   ├── 20-github-actions-list.png
│   └── ...
└── 05-deployment/
    ├── 24-vercel-dashboard.png
    └── ...
```

## 💡 Conseils

1. **Qualité** : Captures nettes, pas floues
2. **Contenu** : Montrez les informations importantes
3. **Annotations** : Ajoutez des flèches/texte si nécessaire
4. **Cohérence** : Utilisez les mêmes données de test
5. **Timing** : Capturez quand tout est chargé
6. **Taille** : Pas trop lourdes (< 500KB par image)

## 🔒 Sécurité

**Attention** : Ne montrez jamais dans les screenshots :
- ❌ Clés API complètes
- ❌ Mots de passe
- ❌ Tokens d'authentification
- ❌ Emails personnels réels
- ✅ Floutez si nécessaire

---

**Screenshots pris ? Prêt pour la Phase 11 : Rapport de Projet ! 📄**

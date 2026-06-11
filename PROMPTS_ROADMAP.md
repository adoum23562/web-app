# Roadmap de Prompts - Projet E-Commerce
## Stack: Next.js + Supabase

---

## PHASE 1: INITIALISATION ET CONFIGURATION (Jour 1)

### Prompt 1.1 - Initialisation du projet Next.js
```
Initialise un nouveau projet Next.js avec TypeScript, Tailwind CSS et la structure App Router. Configure ESLint et les dépendances de base nécessaires pour une application e-commerce.
```

### Prompt 1.2 - Configuration Supabase
```
Configure Supabase pour ce projet :
1. Crée les variables d'environnement pour SUPABASE_URL et SUPABASE_ANON_KEY
2. Installe et configure le client Supabase
3. Crée un fichier de configuration pour les connexions à la base de données
```

### Prompt 1.3 - Structure de la base de données
```
Crée le schéma SQL complet pour Supabase avec les tables suivantes :
1. categories (id, name, slug, description, created_at)
2. products (id, name, slug, description, price, image_url, category_id, stock, created_at)
3. customers (id, email, name, phone, address, created_at)
4. orders (id, customer_id, total_amount, status, created_at)
5. order_items (id, order_id, product_id, quantity, unit_price)

Inclus les relations, indexes et contraintes nécessaires.
```

### Prompt 1.4 - Structure de dossiers du projet
```
Crée la structure de dossiers suivante pour le projet Next.js :
- app/ (routes)
- components/ (composants réutilisables)
- lib/ (utilitaires, config)
- types/ (TypeScript types)
- public/ (images, assets)
- styles/ (CSS global)

Crée les fichiers de base dans chaque dossier.
```

---

## PHASE 2: INTERFACE UTILISATEUR DE BASE (Jour 1-2)

### Prompt 2.1 - Layout principal et navigation
```
Crée le layout principal de l'application avec :
1. Header avec logo, menu de navigation (Accueil, Produits, Catégories, Panier)
2. Footer avec informations de contact
3. Navigation responsive avec menu mobile hamburger
4. Design moderne et professionnel avec Tailwind CSS
```

### Prompt 2.2 - Page d'accueil
```
Crée une page d'accueil attrayante avec :
1. Hero section avec titre accrocheur et call-to-action
2. Section produits vedettes (afficher 6-8 produits)
3. Section catégories avec cards cliquables
4. Section "Pourquoi nous choisir" avec 3-4 avantages
5. Design responsive et moderne
```

### Prompt 2.3 - Composants produits réutilisables
```
Crée les composants suivants pour les produits :
1. ProductCard : carte produit avec image, nom, prix, bouton "Ajouter au panier"
2. ProductGrid : grille responsive de produits
3. ProductImage : composant d'image optimisé avec Next.js Image
4. PriceDisplay : affichage du prix formaté en RWF (Francs rwandais)
```

### Prompt 2.4 - Design system et thème
```
Crée un système de design cohérent :
1. Palette de couleurs (primary, secondary, accent)
2. Configuration Tailwind personnalisée
3. Composants UI de base : Button, Card, Badge, Input, Select
4. Styles globaux et typographie
```

---

## PHASE 3: GESTION DES PRODUITS (Jour 2)

### Prompt 3.1 - Page liste des produits
```
Crée la page /products qui affiche :
1. Tous les produits depuis Supabase
2. Filtres par catégorie (sidebar ou dropdown)
3. Barre de recherche fonctionnelle
4. Tri (prix croissant/décroissant, nouveautés)
5. Pagination ou infinite scroll
6. Loading states et error handling
```

### Prompt 3.2 - Page détails produit
```
Crée la page /products/[slug] avec :
1. Grande image du produit (avec zoom si possible)
2. Nom, description complète
3. Prix et disponibilité en stock
4. Sélecteur de quantité
5. Bouton "Ajouter au panier"
6. Catégorie et breadcrumb
7. Section "Produits similaires"
```

### Prompt 3.3 - API routes pour produits
```
Crée les API routes Next.js pour :
1. GET /api/products - liste tous les produits avec filtres optionnels
2. GET /api/products/[id] - détails d'un produit
3. GET /api/categories - liste des catégories
4. GET /api/products/category/[id] - produits par catégorie

Utilise Supabase pour les requêtes.
```

### Prompt 3.4 - Seed data pour la base de données
```
Crée un script de seed data avec :
1. 5-6 catégories de produits pertinentes
2. 20-30 produits avec descriptions, prix réalistes en RWF
3. Images via URLs d'images placeholder (unsplash ou similaire)
4. Script SQL ou fichier TypeScript pour insérer les données dans Supabase
```

---

## PHASE 4: PANIER D'ACHAT (Jour 3)

### Prompt 4.1 - Context et state management du panier
```
Crée un système de gestion du panier avec React Context :
1. CartContext avec état du panier
2. Actions : addToCart, removeFromCart, updateQuantity, clearCart
3. Calcul automatique du total
4. Persistence dans localStorage
5. Types TypeScript pour le panier
```

### Prompt 4.2 - Composant panier (sidebar/modal)
```
Crée un composant CartDrawer/CartModal qui affiche :
1. Liste des articles dans le panier
2. Image miniature, nom, prix, quantité de chaque article
3. Boutons +/- pour modifier la quantité
4. Bouton supprimer un article
5. Total du panier
6. Bouton "Passer la commande"
7. Animation d'ouverture/fermeture
```

### Prompt 4.3 - Badge compteur panier
```
Crée un composant CartBadge pour le header qui affiche :
1. Icône de panier
2. Badge avec le nombre d'articles
3. Ouvre le CartDrawer au clic
4. Animation quand un article est ajouté
```

### Prompt 4.4 - Page panier complète
```
Crée la page /cart avec :
1. Tableau détaillé des articles du panier
2. Possibilité de modifier les quantités
3. Calcul des sous-totaux et total général
4. Bouton "Continuer les achats"
5. Bouton "Procéder au paiement"
6. État vide du panier avec message et call-to-action
```

---

## PHASE 5: PROCESSUS DE COMMANDE (Jour 3)

### Prompt 5.1 - Page checkout
```
Crée la page /checkout avec :
1. Formulaire informations client (nom, email, téléphone, adresse)
2. Résumé de la commande (liste produits, quantités, total)
3. Validation des champs avec messages d'erreur
4. Design en 2 colonnes : formulaire à gauche, résumé à droite
5. Responsive design
```

### Prompt 5.2 - API route création de commande
```
Crée l'API route POST /api/orders qui :
1. Reçoit les informations client et les articles du panier
2. Crée un enregistrement dans la table customers
3. Crée une commande dans orders
4. Crée les order_items associés
5. Met à jour le stock des produits
6. Retourne l'ID de la commande et les détails
7. Gère les erreurs (stock insuffisant, validation)
```

### Prompt 5.3 - Page confirmation de commande
```
Crée la page /orders/[id]/confirmation qui affiche :
1. Message de confirmation "Commande réussie"
2. Numéro de commande
3. Résumé complet de la commande
4. Informations de livraison
5. Message de remerciement
6. Bouton "Retour à l'accueil"
```

### Prompt 5.4 - Email de confirmation (optionnel)
```
Configure l'envoi d'email de confirmation avec Resend ou service similaire :
1. Template email HTML avec détails de la commande
2. Envoi automatique après création de commande
3. Configuration des variables d'environnement nécessaires
```

---

## PHASE 6: DOCKER ET CONTAINERISATION (Jour 4)

### Prompt 6.1 - Dockerfile
```
Crée un Dockerfile optimisé pour Next.js avec :
1. Multi-stage build (dependencies, builder, runner)
2. Image de base Node.js LTS
3. Optimisation de la taille de l'image
4. Variables d'environnement pour production
5. Port 3000 exposé
6. Santé check si nécessaire
```

### Prompt 6.2 - Docker Compose
```
Crée un docker-compose.yml qui configure :
1. Service app Next.js
2. Variables d'environnement depuis fichier .env
3. Volumes pour le développement si nécessaire
4. Ports mapping
5. Configuration réseau
6. Commentaires explicatifs
```

### Prompt 6.3 - Scripts et documentation Docker
```
Crée :
1. Fichier .dockerignore avec les dossiers à exclure
2. Script build-docker.sh pour construire l'image
3. Script run-docker.sh pour lancer les conteneurs
4. Section Docker dans le README avec les commandes essentielles
```

### Prompt 6.4 - Test Docker en local
```
Teste la configuration Docker :
1. Build l'image Docker
2. Lance le conteneur
3. Vérifie que l'application est accessible
4. Prends des captures d'écran des commandes et résultats pour le rapport
```

---

## PHASE 7: CI/CD AVEC GITHUB ACTIONS (Jour 4)

### Prompt 7.1 - Workflow CI/CD de base
```
Crée .github/workflows/main.yml qui :
1. Se déclenche sur push vers main et pull requests
2. Checkout du code
3. Setup Node.js
4. Installation des dépendances
5. Lint du code
6. Build de l'application
7. Tests si présents
```

### Prompt 7.2 - Workflow Docker build et push
```
Ajoute au workflow CI/CD :
1. Build de l'image Docker
2. Tag de l'image avec version/commit SHA
3. Push vers Docker Hub ou GitHub Container Registry
4. Authentification sécurisée avec secrets
```

### Prompt 7.3 - Workflow de déploiement automatique
```
Configure le déploiement automatique :
1. Déploiement vers Vercel/Netlify sur push vers main
2. Variables d'environnement configurées dans le service
3. Commentaires dans la PR avec URL de preview si possible
4. Notifications de succès/échec
```

### Prompt 7.4 - Documentation CI/CD
```
Documente le pipeline CI/CD :
1. Diagramme du flux CI/CD
2. Explication de chaque étape
3. Variables d'environnement nécessaires
4. Comment déclencher manuellement
5. Captures d'écran du pipeline en action pour le rapport
```

---

## PHASE 8: DÉPLOIEMENT EN PRODUCTION (Jour 5)

### Prompt 8.1 - Configuration Vercel/Netlify
```
Configure le déploiement sur Vercel :
1. Connecte le repository GitHub
2. Configure les variables d'environnement (Supabase)
3. Configure le domaine si disponible
4. Active le déploiement automatique
5. Teste l'application déployée
```

### Prompt 8.2 - Configuration de la base de données production
```
Configure Supabase pour la production :
1. Crée un projet Supabase dédié si nécessaire
2. Exécute le script SQL de création de tables
3. Insère les données de seed
4. Active les politiques RLS (Row Level Security) si nécessaire
5. Configure les variables d'environnement de production
```

### Prompt 8.3 - Tests de production
```
Teste l'application déployée :
1. Navigation sur toutes les pages
2. Ajout de produits au panier
3. Processus de commande complet
4. Responsive design sur mobile
5. Performance et temps de chargement
6. Note tout problème et corrige-le
```

### Prompt 8.4 - Monitoring et logs
```
Configure le monitoring de base :
1. Vercel Analytics si disponible
2. Logs d'erreurs avec Sentry (optionnel)
3. Supabase logs et monitoring
4. Dashboard de santé de l'application
```

---

## PHASE 9: TESTS ET QUALITÉ (Jour 5)

### Prompt 9.1 - Tests de fonctionnalité
```
Teste manuellement toutes les fonctionnalités :
1. Checklist complète des exigences du projet
2. Tests sur différents navigateurs (Chrome, Firefox, Safari)
3. Tests sur mobile et tablette
4. Tests de performance avec Lighthouse
5. Documente les résultats
```

### Prompt 9.2 - Corrections des bugs identifiés
```
Corrige tous les bugs trouvés lors des tests :
1. Liste priorisée des bugs
2. Correction un par un
3. Vérification après chaque correction
4. Commit des corrections avec messages clairs
```

### Prompt 9.3 - Optimisations
```
Optimise l'application :
1. Images : compression, format WebP, lazy loading
2. Code : suppression du code inutilisé, bundle size
3. Performance : cache, prefetch
4. SEO : meta tags, sitemap
5. Accessibilité : contraste, navigation clavier, ARIA labels
```

### Prompt 9.4 - Sécurité
```
Vérifie la sécurité de base :
1. Validation des entrées utilisateur
2. Protection contre XSS
3. Variables d'environnement sécurisées (pas dans le code)
4. HTTPS en production
5. Sanitisation des données
```

---

## PHASE 10: SCREENSHOTS ET DOCUMENTATION (Jour 5-6)

### Prompt 10.1 - Captures d'écran
```
Prends des captures d'écran professionnelles de :
1. Page d'accueil (desktop et mobile)
2. Liste des produits avec filtres
3. Page détails produit
4. Panier d'achat
5. Page checkout
6. Page de confirmation
7. Pipeline CI/CD en action
8. Commandes Docker réussies
9. Application déployée sur Vercel
10. Base de données Supabase avec données
```

### Prompt 10.2 - README.md complet
```
Crée un README.md professionnel avec :
1. Titre et description du projet
2. Badges (build status, déploiement)
3. Screenshots principaux
4. Fonctionnalités
5. Stack technique
6. Instructions d'installation locale
7. Variables d'environnement nécessaires
8. Commandes Docker
9. Structure du projet
10. Lien vers l'application déployée
11. Lien vers le rapport
12. Crédits et licence
```

### Prompt 10.3 - Documentation technique
```
Crée un fichier TECHNICAL_DOCS.md avec :
1. Architecture de l'application (diagramme si possible)
2. Structure de la base de données avec schéma
3. API endpoints disponibles
4. Flow des données (de la BD à l'UI)
5. Décisions techniques importantes
6. Instructions de déploiement
```

### Prompt 10.4 - Script SQL de base de données
```
Crée un fichier database.sql avec :
1. Tout le schéma de la base de données
2. Les données de seed (catégories et produits)
3. Commentaires explicatifs
4. Instructions d'exécution dans Supabase
5. Export des données si nécessaire
```

---

## PHASE 11: RAPPORT DE PROJET (Jour 6)

### Prompt 11.1 - Rédaction de l'introduction
```
Rédige l'introduction du rapport (1 page) avec :
1. Contexte du projet (examen E-Commerce)
2. Objectif général
3. Type de boutique choisie
4. Aperçu de la solution développée
5. Organisation du rapport
```

### Prompt 11.2 - Problem Statement et Objectives
```
Rédige les sections Problem Statement et Objectives :
1. Problem Statement : besoins de l'entreprise rwandaise, problématiques du commerce traditionnel
2. Objectives : liste numérotée des objectifs fonctionnels et techniques
3. Critères de succès
```

### Prompt 11.3 - System Features et Technologies
```
Rédige les sections :
1. System Features : liste détaillée de toutes les fonctionnalités avec descriptions
2. Technologies Used : tableau avec technologies, versions, et justifications
3. Pourquoi Next.js, Supabase, etc.
```

### Prompt 11.4 - Architecture et Screenshots
```
Rédige les sections :
1. System Architecture : diagramme (frontend → API → Supabase) avec explications
2. Screenshots : toutes les captures avec légendes détaillées
3. Explication du flow utilisateur
```

### Prompt 11.5 - GitHub, Deployment, CI/CD
```
Rédige les sections :
1. GitHub Repository Link : lien + explication de la structure Git
2. Deployment Link : lien + explication du processus de déploiement
3. CI/CD Description : explication détaillée du pipeline avec captures
```

### Prompt 11.6 - Challenges et Future Work
```
Rédige les sections :
1. Challenges Encountered : 3-5 défis rencontrés avec solutions apportées
2. Future Work : 5-7 améliorations futures possibles
3. Soyez honnête et technique
```

### Prompt 11.7 - Conclusion et mise en page
```
Rédige la conclusion et finalise le rapport :
1. Conclusion : résumé des accomplissements, apprentissages
2. Mise en page professionnelle
3. Table des matières
4. Pagination
5. Vérification orthographe et grammaire
6. Export en PDF
```

---

## PHASE 12: BONUS ET AMÉLIORATIONS (Si temps disponible)

### Prompt 12.1 - Intégration paiement Mobile Money
```
Intègre un système de paiement Mobile Money :
1. API Flutterwave ou MTN Mobile Money Rwanda
2. Page de paiement sécurisée
3. Vérification du paiement
4. Mise à jour du statut de commande
5. Documentation de l'intégration
```

### Prompt 12.2 - Dashboard admin basique
```
Crée un dashboard admin simple :
1. Page /admin avec authentification
2. Liste des commandes récentes
3. Statistiques basiques (total ventes, produits vendus)
4. Gestion des produits (CRUD)
5. Graphiques simples si possible
```

### Prompt 12.3 - Système de recherche avancée
```
Améliore la recherche de produits :
1. Recherche full-text avec Supabase
2. Suggestions pendant la saisie
3. Filtres multiples combinables
4. Tri avancé
5. Historique de recherche
```

### Prompt 12.4 - PWA et notifications
```
Transforme l'app en PWA :
1. Manifeste PWA
2. Service Worker pour cache
3. Installable sur mobile
4. Notifications push (optionnel)
5. Mode offline basique
```

---

## PHASE 13: PRÉPARATION DE LA DÉFENSE (Jour 6)

### Prompt 13.1 - Présentation PowerPoint/Slides
```
Crée une présentation de 10-15 slides pour la défense :
1. Slide titre avec logo
2. Contexte et problématique
3. Objectifs
4. Démonstration (screenshots clés)
5. Architecture technique
6. Technologies utilisées
7. CI/CD et Docker
8. Déploiement
9. Défis et solutions
10. Démo live (si possible)
11. Questions
```

### Prompt 13.2 - Script de démonstration
```
Prépare un script de démonstration live :
1. Parcours utilisateur complet (3-5 minutes)
2. Navigation → Sélection produit → Ajout panier → Checkout → Confirmation
3. Points clés à mentionner pendant la démo
4. Plan B si problème réseau
5. Répète la démo plusieurs fois
```

### Prompt 13.3 - Questions/réponses prévisibles
```
Prépare les réponses aux questions probables :
1. Pourquoi Next.js et Supabase ?
2. Comment fonctionne le CI/CD ?
3. Expliquez la structure de la BD
4. Quelles sécurités avez-vous mises en place ?
5. Défis techniques rencontrés ?
6. Comment gérez-vous le state du panier ?
7. Scalabilité de la solution ?
8. Améliorations futures ?
```

### Prompt 13.4 - Checklist finale avant soumission
```
Vérifie la checklist complète :
1. ✓ Application déployée et accessible
2. ✓ Repository GitHub public avec commits significatifs
3. ✓ README complet
4. ✓ Docker fonctionnel
5. ✓ CI/CD actif
6. ✓ Base de données avec données
7. ✓ Rapport PDF finalisé
8. ✓ Screenshots de qualité
9. ✓ Tous les livrables prêts
10. ✓ Présentation préparée
```

---

## ORDRE D'EXÉCUTION RECOMMANDÉ

**Jour 1 (11 juin):**
- Phase 1 complète (Prompts 1.1 à 1.4)
- Phase 2 complète (Prompts 2.1 à 2.4)
- Début Phase 3 (Prompts 3.1 à 3.4)

**Jour 2 (12 juin):**
- Fin Phase 3 si nécessaire
- Phase 4 complète (Prompts 4.1 à 4.4)
- Phase 5 complète (Prompts 5.1 à 5.3)

**Jour 3 (13 juin):**
- Phase 6 complète (Prompts 6.1 à 6.4)
- Phase 7 complète (Prompts 7.1 à 7.4)

**Jour 4 (14 juin):**
- Phase 8 complète (Prompts 8.1 à 8.4)
- Phase 9 complète (Prompts 9.1 à 9.4)

**Jour 5 (15 juin):**
- Phase 10 complète (Prompts 10.1 à 10.4)
- Phase 11 (Prompts 11.1 à 11.7)

**Jour 6 (16 juin):**
- Finitions rapport
- Phase 13 complète (Préparation défense)
- Phase 12 si temps disponible (Bonus)
- Vérifications finales

**Jour 7 (17 juin):**
- Buffer pour imprévus
- Soumission finale
- Défense orale

---

## NOTES IMPORTANTES

1. **Chaque prompt doit être exécuté dans l'ordre**
2. **Ne passe pas au suivant sans avoir terminé le précédent**
3. **Commit régulièrement sur Git après chaque prompt complété**
4. **Teste après chaque fonctionnalité majeure**
5. **Si bloqué sur un prompt, demande de l'aide avant de continuer**
6. **Priorise les fonctionnalités obligatoires avant les bonus**
7. **Garde du temps pour les tests et le rapport**
8. **Documente au fur et à mesure, pas à la fin**

---

**NOMBRE TOTAL DE PROMPTS: 68**

**Estimation temps: 6-7 jours intensifs**

**Prêt à commencer avec le Prompt 1.1 !**

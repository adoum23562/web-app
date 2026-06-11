# ✅ Testing Checklist - Rwanda E-Commerce

Liste complète de tests pour valider toutes les fonctionnalités du projet.

## 🧪 Tests Fonctionnels

### Page d'Accueil (/)
- [ ] Hero section s'affiche correctement
- [ ] Les 6 catégories sont visibles
- [ ] Les liens vers catégories fonctionnent
- [ ] Section "Pourquoi nous choisir" présente
- [ ] Boutons CTA fonctionnels
- [ ] Navigation vers /products fonctionne

### Page Produits (/products)
- [ ] Liste de produits s'affiche
- [ ] Images chargent correctement
- [ ] Prix affichés en RWF
- [ ] Badges de stock fonctionnels
- [ ] Recherche filtre les produits
- [ ] Filtre par catégorie fonctionne
- [ ] Tri (récent, nom, prix) fonctionne
- [ ] Pagination affiche correctement
- [ ] Boutons Précédent/Suivant fonctionnent
- [ ] "Ajouter au panier" fonctionne

### Page Détails Produit (/products/[slug])
- [ ] Grande image s'affiche
- [ ] Nom et description présents
- [ ] Prix affiché correctement
- [ ] Stock affiché
- [ ] Breadcrumb fonctionnel
- [ ] Sélecteur de quantité (+/-) fonctionne
- [ ] Limite de quantité respectée (stock)
- [ ] "Ajouter au panier" fonctionne
- [ ] Produits similaires affichés
- [ ] Badge "Rupture de stock" si applicable

### Page Catégories (/categories)
- [ ] Toutes les catégories affichées
- [ ] Icônes visibles
- [ ] Descriptions présentes
- [ ] Liens vers produits fonctionnent

### Panier - Drawer
- [ ] S'ouvre automatiquement après ajout
- [ ] Liste des articles correcte
- [ ] Images miniatures affichées
- [ ] Prix unitaires corrects
- [ ] Quantité modifiable (+/-)
- [ ] Supprimer un article fonctionne
- [ ] Total calculé correctement
- [ ] Boutons "Voir panier" et "Commander" fonctionnent
- [ ] Fermeture par X, Escape, ou clic extérieur
- [ ] Badge compte dans le header mis à jour

### Page Panier (/cart)
- [ ] Liste complète des articles
- [ ] Images et descriptions affichées
- [ ] Quantités modifiables
- [ ] Supprimer article fonctionne
- [ ] Sous-totaux corrects par article
- [ ] Total général correct
- [ ] "Vider le panier" avec confirmation
- [ ] Bouton "Continuer achats" fonctionne
- [ ] Bouton "Commander" redirige vers checkout
- [ ] État vide affiché si aucun article

### Page Checkout (/checkout)
- [ ] Formulaire d'informations client affiché
- [ ] Résumé de commande présent
- [ ] Tous les champs requis marqués
- [ ] Validation email fonctionne
- [ ] Validation téléphone rwandais fonctionne
- [ ] Messages d'erreur affichés si champs invalides
- [ ] Empêche soumission si invalide
- [ ] Loading state pendant traitement
- [ ] Redirection vers confirmation après succès
- [ ] Panier vidé après commande

### Page Confirmation (/orders/[id]/confirmation)
- [ ] Message de succès affiché
- [ ] Numéro de commande présent
- [ ] Informations client affichées
- [ ] Liste des articles commandés
- [ ] Total correct
- [ ] Badges de statut présents
- [ ] Guide "Prochaines étapes" visible
- [ ] Boutons de navigation fonctionnent

## 📱 Tests Responsive

### Mobile (< 640px)
- [ ] Menu hamburger fonctionne
- [ ] Navigation mobile accessible
- [ ] Images s'adaptent
- [ ] Grilles produits : 1 colonne
- [ ] Formulaires utilisables
- [ ] Boutons cliquables (taille suffisante)
- [ ] Textes lisibles
- [ ] Panier drawer fonctionne

### Tablet (640px - 1024px)
- [ ] Grilles produits : 2 colonnes
- [ ] Layout s'adapte
- [ ] Navigation visible
- [ ] Formulaires bien espacés

### Desktop (> 1024px)
- [ ] Grilles produits : 3-4 colonnes
- [ ] Sidebar checkout visible
- [ ] Navigation complète
- [ ] Footer complet

## 🎨 Tests UI/UX

### Design
- [ ] Couleurs cohérentes (vert émeraude/teal)
- [ ] Typographie lisible
- [ ] Espacements appropriés
- [ ] Ombres et bordures cohérentes
- [ ] Transitions fluides
- [ ] Animations fonctionnent

### Interactions
- [ ] Hover states fonctionnent
- [ ] Focus states visibles (accessibilité)
- [ ] Boutons réagissent au clic
- [ ] Loading spinners affichés
- [ ] Messages de succès/erreur clairs

### Accessibilité
- [ ] Navigation au clavier possible
- [ ] Labels sur tous les inputs
- [ ] Alt text sur les images
- [ ] Contraste suffisant
- [ ] Messages d'erreur descriptifs

## ⚡ Tests Performance

### Lighthouse (Chrome DevTools)
- [ ] Performance > 80
- [ ] Accessibility > 90
- [ ] Best Practices > 90
- [ ] SEO > 90

### Temps de Chargement
- [ ] Page d'accueil < 3s
- [ ] Liste produits < 3s
- [ ] Détails produit < 2s

### Optimisations
- [ ] Images optimisées (WebP, lazy loading)
- [ ] Bundle JS < 500KB
- [ ] CSS minifié
- [ ] Pas de ressources bloquantes

## 🔒 Tests Sécurité

### Validation Côté Client
- [ ] Email validé
- [ ] Téléphone validé
- [ ] Champs requis vérifiés

### API
- [ ] Validation des données entrantes
- [ ] Vérification du stock avant commande
- [ ] Gestion des erreurs
- [ ] Pas de secrets exposés

### Supabase
- [ ] RLS activé sur toutes les tables
- [ ] Politiques appropriées
- [ ] Clés API sécurisées (env variables)

## 🗄️ Tests Base de Données

### Supabase
- [ ] Tables créées correctement
- [ ] Relations fonctionnent
- [ ] Constraints respectées
- [ ] Triggers fonctionnent (updated_at)
- [ ] Seed data présente

### CRUD Operations
- [ ] Create customer fonctionne
- [ ] Create order fonctionne
- [ ] Create order_items fonctionne
- [ ] Read products fonctionne
- [ ] Update stock fonctionne

## 🐳 Tests Docker

### Build
- [ ] `docker build` réussit
- [ ] Pas d'erreurs durant le build
- [ ] Taille image < 300MB

### Run
- [ ] `docker run` démarre l'app
- [ ] Application accessible sur :3000
- [ ] Health check passe
- [ ] Variables env chargées

### Docker Compose
- [ ] `docker-compose up` fonctionne
- [ ] Services démarrent
- [ ] Logs visibles
- [ ] `docker-compose down` arrête proprement

## 🔄 Tests CI/CD

### GitHub Actions
- [ ] Workflow CI s'exécute sur push
- [ ] Lint passe
- [ ] Build réussit
- [ ] Workflow Docker build l'image
- [ ] Workflow Deploy déploie sur Vercel

### Vercel
- [ ] Déploiement automatique sur push main
- [ ] Build réussit
- [ ] Application accessible
- [ ] Variables env configurées
- [ ] Preview deployments sur PR

## 🌐 Tests Multi-Navigateurs

### Chrome
- [ ] Toutes fonctionnalités OK

### Firefox
- [ ] Toutes fonctionnalités OK

### Safari
- [ ] Toutes fonctionnalités OK

### Edge
- [ ] Toutes fonctionnalités OK

## 📊 Tests Données

### Commande Complète
1. [ ] Ajouter 3 produits différents au panier
2. [ ] Modifier les quantités
3. [ ] Supprimer 1 produit
4. [ ] Aller au checkout
5. [ ] Remplir formulaire valide
6. [ ] Soumettre commande
7. [ ] Vérifier confirmation
8. [ ] Vérifier dans Supabase :
   - [ ] Customer créé
   - [ ] Order créée
   - [ ] Order_items corrects
   - [ ] Stock mis à jour

### Edge Cases
- [ ] Panier vide → Redirect depuis checkout
- [ ] Produit en rupture de stock → Bouton désactivé
- [ ] Quantité > stock → Limité au stock disponible
- [ ] Email invalide → Message d'erreur
- [ ] Téléphone invalide → Message d'erreur
- [ ] Commande avec notes → Notes sauvegardées

## 🎯 Checklist Finale

### Fonctionnel
- [ ] Toutes les pages accessibles
- [ ] Navigation fluide
- [ ] Aucune erreur console
- [ ] Panier fonctionne parfaitement
- [ ] Commandes créées en DB

### Qualité Code
- [ ] Pas d'erreurs ESLint
- [ ] Pas d'erreurs TypeScript
- [ ] Code commenté si nécessaire
- [ ] Pas de console.log en production

### Documentation
- [ ] README complet
- [ ] Guides disponibles (Docker, CI/CD, Deployment)
- [ ] Screenshots prises
- [ ] Commits Git significatifs

### Production
- [ ] Déployé sur Vercel
- [ ] Supabase configuré
- [ ] URL accessible publiquement
- [ ] Performance acceptable (> 80)

---

## 📸 Screenshots à Prendre

Pour votre rapport, prenez des captures de :

1. ✅ Page d'accueil complète
2. ✅ Liste produits avec filtres
3. ✅ Détails produit
4. ✅ Panier drawer ouvert
5. ✅ Page panier complète
6. ✅ Page checkout
7. ✅ Page confirmation
8. ✅ Version mobile (responsive)
9. ✅ Supabase avec données
10. ✅ GitHub Actions réussis
11. ✅ Docker build réussi
12. ✅ Application déployée (Vercel)
13. ✅ Lighthouse score
14. ✅ Commande dans la base de données

---

**Tous les tests passés ? Prêt pour la Phase 10 : Documentation finale ! 📚**

# 🛍️ Rwanda E-Commerce Platform

Plateforme e-commerce moderne pour entreprises rwandaises, développée avec Next.js et Supabase.

## 🚀 Technologies Utilisées

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel (à venir)
- **CI/CD**: GitHub Actions (à venir)

## ✨ Fonctionnalités

- ✅ Catalogue de produits avec catégories
- ✅ Page détails produit
- ✅ Panier d'achat dynamique
- ✅ Processus de commande complet
- ✅ Design responsive (mobile + desktop)
- ✅ Stockage dans Supabase
- 🚧 Paiement Mobile Money (à venir)
- 🚧 Dashboard admin (à venir)

## 📋 Prérequis

- Node.js 18+ 
- npm ou yarn
- Compte Supabase (gratuit)

## 🛠️ Installation Locale

1. **Cloner le repository**
```bash
git clone <repo-url>
cd web-app
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
```bash
cp .env.local.example .env.local
```

Éditez `.env.local` avec vos clés Supabase :
```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-clé-anon
```

4. **Configurer la base de données**

Suivez les instructions dans [DATABASE_SETUP.md](./DATABASE_SETUP.md)

5. **Lancer le serveur de développement**
```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

## 🐳 Docker

### Démarrage Rapide avec Docker

```bash
# Option 1: Docker Compose (Recommandé)
docker-compose up --build

# Option 2: Docker seul
docker build -t rwanda-ecommerce .
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=your_url \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key \
  rwanda-ecommerce
```

### Configuration

Assurez-vous que `.env.local` contient vos clés Supabase. Docker Compose les chargera automatiquement.

### Commandes Utiles

```bash
# Lancer en arrière-plan
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêter
docker-compose down

# Rebuild complet
docker-compose up --build --force-recreate
```

📖 **Documentation complète** : [DOCKER_GUIDE.md](./DOCKER_GUIDE.md)

## 📁 Structure du Projet

```
web-app/
├── src/
│   ├── app/              # Pages Next.js (App Router)
│   ├── components/       # Composants React réutilisables
│   ├── lib/             # Utilitaires et configurations
│   └── types/           # Types TypeScript
├── database/            # Scripts SQL
│   ├── schema.sql       # Schéma de la base de données
│   └── seed.sql         # Données de test
├── public/              # Assets statiques
└── .env.local          # Variables d'environnement (non versionné)
```

## 🧪 Tests

```bash
npm run lint         # Vérifier le code
npm run build        # Tester le build de production
```

## 🚀 Déploiement

### Vercel (Recommandé)

1. Connectez votre repo GitHub à Vercel
2. Configurez les variables d'environnement
3. Déployez automatiquement

### Autre plateforme

```bash
npm run build
npm run start
```

## 📝 Scripts Disponibles

- `npm run dev` - Serveur de développement
- `npm run build` - Build de production
- `npm run start` - Serveur de production
- `npm run lint` - Linter ESLint

## 🤝 Contribution

1. Fork le projet
2. Créez une branche (`git checkout -b feature/ma-fonctionnalite`)
3. Commit (`git commit -m 'Ajout de...'`)
4. Push (`git push origin feature/ma-fonctionnalite`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet fait partie d'un examen académique - EWA408510 E-Commerce and Web Application

## 👨‍💻 Auteur

Projet réalisé dans le cadre du cours E-Commerce and Web Application (2025-2026)

## 🔗 Liens

- **Déploiement**: (à venir)
- **Documentation**: [DATABASE_SETUP.md](./DATABASE_SETUP.md)
- **Roadmap**: [PROMPTS_ROADMAP.md](./PROMPTS_ROADMAP.md)

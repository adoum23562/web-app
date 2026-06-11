# Configuration Rapide Supabase

## 📝 Étapes de Configuration

### 1. Créer un Projet Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un compte gratuit
3. Cliquez sur "New Project"
4. Remplissez les informations :
   - **Name**: rwanda-ecommerce (ou votre choix)
   - **Database Password**: Créez un mot de passe sécurisé (notez-le !)
   - **Region**: Europe West (London) - le plus proche
   - **Pricing Plan**: Free

5. Attendez 2-3 minutes que le projet soit créé

### 2. Récupérer les Clés API

1. Dans votre projet Supabase, allez dans **Settings** > **API**
2. Notez ces deux valeurs :
   - **Project URL** (commence par `https://xxxxx.supabase.co`)
   - **anon public** key (clé publique anonyme)

### 3. Configurer les Variables d'Environnement

1. Ouvrez le fichier `.env.local` à la racine du projet
2. Remplacez les valeurs :

```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-cle-anon-ici
```

### 4. Créer les Tables

1. Dans Supabase, allez dans **SQL Editor**
2. Cliquez sur "New Query"
3. Ouvrez le fichier `database/schema.sql` de ce projet
4. Copiez **tout le contenu**
5. Collez-le dans l'éditeur SQL de Supabase
6. Cliquez sur **Run** (ou Ctrl+Enter)
7. Vous devriez voir : "Success. No rows returned"

### 5. Insérer les Données de Test

1. Toujours dans **SQL Editor**, créez une nouvelle query
2. Ouvrez le fichier `database/seed.sql`
3. Copiez **tout le contenu**
4. Collez-le dans l'éditeur SQL
5. Cliquez sur **Run**
6. Vous devriez voir : "Success. No rows returned"

### 6. Vérifier les Données

Dans **Table Editor** de Supabase, vérifiez :

- **categories** : 6 catégories
- **products** : ~25 produits
- **customers** : 1 client test
- **orders** : 0 (vide pour l'instant)
- **order_items** : 0 (vide pour l'instant)

### 7. Tester l'Application

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

Vous devriez voir :
- ✅ Page d'accueil avec catégories
- ✅ Page `/products` avec liste des produits
- ✅ Filtres fonctionnels
- ✅ Page détails produit

## 🔧 Dépannage

### Erreur : "Missing Supabase environment variables"

➡️ Vérifiez que `.env.local` existe et contient les bonnes clés

### Erreur : "Failed to fetch products"

➡️ Vérifiez :
1. Les tables sont bien créées dans Supabase
2. Les politiques RLS sont actives
3. Les URLs dans `.env.local` sont correctes

### Les produits ne s'affichent pas

➡️ Ouvrez la console du navigateur (F12) et vérifiez les erreurs

### Erreur SQL lors du seed

➡️ Assurez-vous d'avoir exécuté `schema.sql` AVANT `seed.sql`

## 📊 Structure des Tables

```
categories
├── id (uuid)
├── name (varchar)
├── slug (varchar)
└── description (text)

products
├── id (uuid)
├── name (varchar)
├── slug (varchar)
├── description (text)
├── price (decimal)
├── image_url (text)
├── category_id (uuid → categories)
├── stock (integer)
└── is_active (boolean)

customers
├── id (uuid)
├── email (varchar)
├── name (varchar)
├── phone (varchar)
└── address (text)

orders
├── id (uuid)
├── order_number (varchar)
├── customer_id (uuid → customers)
├── total_amount (decimal)
└── status (varchar)

order_items
├── id (uuid)
├── order_id (uuid → orders)
├── product_id (uuid → products)
├── quantity (integer)
└── unit_price (decimal)
```

## 🔐 Sécurité (RLS)

Les politiques Row Level Security sont activées :

- **categories** : Lecture publique ✅
- **products** : Lecture publique (seulement actifs) ✅
- **customers** : Lecture pour tous ✅
- **orders** : Lecture/Écriture pour tous ✅
- **order_items** : Lecture/Écriture pour tous ✅

⚠️ **Note** : Pour la production, ajustez les politiques RLS pour plus de sécurité !

## 🎯 Prochaines Étapes

Une fois Supabase configuré :

1. ✅ Testez la page produits
2. ✅ Testez les filtres
3. ✅ Cliquez sur un produit
4. ➡️ Continuez avec Phase 4 : Panier d'achat

## 📞 Besoin d'Aide ?

- Documentation Supabase : [supabase.com/docs](https://supabase.com/docs)
- Next.js + Supabase : [supabase.com/docs/guides/getting-started/quickstarts/nextjs](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

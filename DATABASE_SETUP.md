# Configuration de la Base de Données Supabase

## Étapes de Configuration

### 1. Créer un Compte Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un compte gratuit
3. Créez un nouveau projet
4. Notez votre **Project URL** et votre **anon public key**

### 2. Configurer les Variables d'Environnement

1. Copiez `.env.local.example` vers `.env.local`
2. Remplacez les valeurs par vos vraies clés Supabase:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-clé-anon-ici
```

### 3. Exécuter le Schéma SQL

1. Dans votre projet Supabase, allez dans **SQL Editor**
2. Ouvrez le fichier `database/schema.sql`
3. Copiez tout le contenu
4. Collez-le dans l'éditeur SQL de Supabase
5. Cliquez sur **Run**

### 4. Insérer les Données de Test

1. Dans l'éditeur SQL, ouvrez `database/seed.sql`
2. Copiez le contenu
3. Collez-le dans l'éditeur SQL
4. Cliquez sur **Run**

### 5. Vérifier l'Installation

Dans l'éditeur SQL, exécutez:

```sql
SELECT * FROM categories;
SELECT COUNT(*) FROM products;
```

Vous devriez voir 6 catégories et environ 25 produits.

## Structure de la Base de Données

- **categories** : Catégories de produits
- **products** : Produits disponibles
- **customers** : Informations clients
- **orders** : Commandes passées
- **order_items** : Articles dans chaque commande

## Sécurité (RLS)

Row Level Security est activé sur toutes les tables.
Les politiques actuelles permettent:
- Lecture publique des catégories et produits actifs
- Création de commandes sans authentification
- Lecture des commandes pour tous

Pour la production, ajustez les politiques RLS selon vos besoins.

## Support

En cas de problème:
1. Vérifiez que les variables d'environnement sont correctes
2. Vérifiez les logs dans Supabase Dashboard > Logs
3. Assurez-vous que RLS est bien configuré

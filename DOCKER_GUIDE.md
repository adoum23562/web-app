# 🐳 Guide Docker - Rwanda E-Commerce

Ce guide explique comment construire et exécuter l'application avec Docker.

## 📋 Prérequis

- Docker Desktop installé ([docker.com](https://www.docker.com/products/docker-desktop))
- Docker Compose installé (inclus avec Docker Desktop)
- Fichier `.env.local` configuré avec vos clés Supabase

## 🚀 Démarrage Rapide

### Option 1 : Docker Compose (Recommandé)

```bash
# 1. Construire et lancer l'application
docker-compose up --build

# 2. Accéder à l'application
# Ouvrir http://localhost:3000 dans votre navigateur

# 3. Arrêter l'application
docker-compose down
```

### Option 2 : Docker seul

```bash
# 1. Construire l'image
docker build -t rwanda-ecommerce .

# 2. Lancer le conteneur
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=your_url \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key \
  rwanda-ecommerce

# 3. Accéder à l'application
# Ouvrir http://localhost:3000
```

## 🔧 Configuration

### Variables d'Environnement

Les variables d'environnement sont lues depuis `.env.local` par docker-compose.

Créez un fichier `.env.local` à la racine du projet :

```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-clé-anon
```

### Ports

- **Application** : Port 3000 (modifiable dans `docker-compose.yml`)

## 📦 Structure de l'Image Docker

L'image utilise une **build multi-stage** pour optimiser la taille :

1. **Stage deps** : Installation des dépendances Node.js
2. **Stage builder** : Build de l'application Next.js
3. **Stage runner** : Image finale légère avec seulement les fichiers nécessaires

### Taille de l'Image

- Image finale : ~200-250 MB (optimisée)
- Image non optimisée : ~1+ GB

## 🛠️ Commandes Utiles

### Build

```bash
# Build l'image
docker build -t rwanda-ecommerce .

# Build sans cache (force rebuild complet)
docker build --no-cache -t rwanda-ecommerce .

# Build avec docker-compose
docker-compose build
```

### Run

```bash
# Lancer en mode détaché (background)
docker-compose up -d

# Lancer avec rebuild
docker-compose up --build

# Voir les logs
docker-compose logs -f

# Voir les logs d'un service spécifique
docker-compose logs -f app
```

### Maintenance

```bash
# Arrêter les conteneurs
docker-compose down

# Arrêter et supprimer les volumes
docker-compose down -v

# Redémarrer l'application
docker-compose restart

# Voir les conteneurs en cours
docker ps

# Voir les images
docker images
```

### Debug

```bash
# Entrer dans le conteneur
docker exec -it rwanda-ecommerce sh

# Voir les logs en temps réel
docker logs -f rwanda-ecommerce

# Inspecter le conteneur
docker inspect rwanda-ecommerce

# Vérifier la santé du conteneur
docker ps --format "table {{.Names}}\t{{.Status}}"
```

### Nettoyage

```bash
# Supprimer l'image
docker rmi rwanda-ecommerce

# Nettoyer toutes les images non utilisées
docker image prune -a

# Nettoyer tout (images, conteneurs, volumes, réseau)
docker system prune -a --volumes
```

## 🔍 Health Check

L'image inclut un health check automatique qui vérifie :
- Que l'application répond sur le port 3000
- Que l'API `/api/categories` est accessible

```bash
# Vérifier l'état de santé
docker inspect --format='{{.State.Health.Status}}' rwanda-ecommerce
```

États possibles :
- `starting` : En cours de démarrage
- `healthy` : Fonctionnel
- `unhealthy` : Problème détecté

## 🐛 Dépannage

### L'application ne démarre pas

1. Vérifiez les logs :
```bash
docker-compose logs app
```

2. Vérifiez les variables d'environnement :
```bash
docker exec rwanda-ecommerce env
```

3. Vérifiez que Supabase est accessible :
```bash
curl https://votre-projet.supabase.co
```

### Erreur "port already in use"

Le port 3000 est déjà utilisé. Options :
1. Arrêter l'application qui utilise le port 3000
2. Changer le port dans `docker-compose.yml` :
```yaml
ports:
  - "3001:3000"  # Utilise le port 3001 au lieu de 3000
```

### L'image est trop volumineuse

L'image devrait faire ~200-250 MB. Si elle est plus grande :
1. Vérifiez que `.dockerignore` est présent
2. Vérifiez que `node_modules` n'est pas copié
3. Rebuild avec `--no-cache`

### Changements de code non reflétés

Le mode production ne monte pas les volumes par défaut.
Pour le développement, décommentez dans `docker-compose.yml` :
```yaml
volumes:
  - ./src:/app/src
  - ./public:/app/public
```

## 📊 Monitoring

### Voir l'utilisation des ressources

```bash
# CPU et mémoire en temps réel
docker stats rwanda-ecommerce

# Une fois
docker stats --no-stream rwanda-ecommerce
```

### Limiter les ressources

Dans `docker-compose.yml` :
```yaml
deploy:
  resources:
    limits:
      cpus: '1.0'
      memory: 512M
    reservations:
      cpus: '0.5'
      memory: 256M
```

## 🚢 Déploiement

### Push vers Docker Hub

```bash
# Tag l'image
docker tag rwanda-ecommerce votre-username/rwanda-ecommerce:latest

# Login à Docker Hub
docker login

# Push l'image
docker push votre-username/rwanda-ecommerce:latest
```

### Pull et Run depuis Docker Hub

```bash
docker pull votre-username/rwanda-ecommerce:latest
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=your_url \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key \
  votre-username/rwanda-ecommerce:latest
```

## 📝 Best Practices

1. **Ne jamais committer** `.env.local` dans Git
2. **Toujours utiliser** des variables d'environnement pour les secrets
3. **Tester localement** avec Docker avant de déployer
4. **Utiliser des tags** de version pour les images de production
5. **Monitorer** l'utilisation des ressources en production
6. **Garder les images à jour** avec les dernières versions de Node.js

## 🆘 Support

En cas de problème :
1. Consultez les logs : `docker-compose logs -f`
2. Vérifiez la configuration Supabase
3. Testez l'application hors Docker : `npm run dev`
4. Consultez la documentation Docker : [docs.docker.com](https://docs.docker.com)

## ✅ Checklist pour le Rapport

Pour votre rapport de projet, prenez des captures d'écran de :

1. ✅ Build de l'image Docker réussie
```bash
docker build -t rwanda-ecommerce .
```

2. ✅ Conteneur en cours d'exécution
```bash
docker ps
```

3. ✅ Application accessible sur http://localhost:3000

4. ✅ Logs du conteneur
```bash
docker logs rwanda-ecommerce
```

5. ✅ Health check fonctionnel
```bash
docker inspect --format='{{.State.Health.Status}}' rwanda-ecommerce
```

---

**Image construite avec succès ? Passez à la Phase 7 : CI/CD ! 🎉**

-- ============================================================
-- RESET COMPLET + SEED
-- Rwanda Market — Supabase SQL Editor
-- Supprime tout et repart de zéro.
-- ============================================================

-- 1. Supprimer tables existantes (CASCADE gère les dépendances)
DROP TABLE IF EXISTS order_items  CASCADE;
DROP TABLE IF EXISTS orders       CASCADE;
DROP TABLE IF EXISTS customers    CASCADE;
DROP TABLE IF EXISTS products     CASCADE;
DROP TABLE IF EXISTS categories   CASCADE;

-- 2. Supprimer les fonctions/triggers existants
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- ============================================================
-- SCHÉMA
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- categories
CREATE TABLE categories (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        VARCHAR(100) NOT NULL UNIQUE,
  slug        VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- products
CREATE TABLE products (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        VARCHAR(200) NOT NULL,
  slug        VARCHAR(200) NOT NULL UNIQUE,
  description TEXT,
  price       DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  image_url   TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  stock       INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_products_slug     ON products(slug);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_active   ON products(is_active);

-- customers
CREATE TABLE customers (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email      VARCHAR(255) NOT NULL UNIQUE,
  name       VARCHAR(200) NOT NULL,
  phone      VARCHAR(20),
  address    TEXT,
  city       VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_customers_email ON customers(email);

-- orders
CREATE TABLE orders (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number   VARCHAR(50) NOT NULL UNIQUE,
  customer_id    UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  total_amount   DECIMAL(10,2) NOT NULL CHECK (total_amount >= 0),
  status         VARCHAR(50) DEFAULT 'pending'
                   CHECK (status IN ('pending','confirmed','processing','shipped','delivered','cancelled')),
  payment_status VARCHAR(50) DEFAULT 'unpaid'
                   CHECK (payment_status IN ('unpaid','paid','refunded')),
  access_token   UUID NOT NULL DEFAULT uuid_generate_v4(),
  notes          TEXT,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_orders_customer     ON orders(customer_id);
CREATE INDEX idx_orders_status       ON orders(status);
CREATE INDEX idx_orders_number       ON orders(order_number);
CREATE INDEX idx_orders_access_token ON orders(access_token);

-- order_items
CREATE TABLE order_items (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id     UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id   UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  product_name VARCHAR(200) NOT NULL,
  quantity     INTEGER NOT NULL CHECK (quantity > 0),
  unit_price   DECIMAL(10,2) NOT NULL CHECK (unit_price >= 0),
  total_price  DECIMAL(10,2) NOT NULL CHECK (total_price >= 0),
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_order_items_order   ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);

-- Trigger updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_products_updated_at   BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_customers_updated_at  BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_orders_updated_at     BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security
ALTER TABLE categories  ENABLE ROW LEVEL SECURITY;
ALTER TABLE products    ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers   ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders      ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_categories" ON categories  FOR SELECT USING (true);
CREATE POLICY "public_read_products"   ON products    FOR SELECT USING (is_active = true);

-- ============================================================
-- DONNÉES — CATÉGORIES
-- ============================================================

INSERT INTO categories (name, slug, description) VALUES
  ('Électronique',   'electronique',   'Smartphones, ordinateurs, accessoires électroniques'),
  ('Mode',           'mode',           'Vêtements, chaussures, accessoires de mode'),
  ('Maison & Jardin','maison-jardin',  'Meubles, décoration, outils de jardin'),
  ('Alimentation',   'alimentation',   'Produits alimentaires, boissons, snacks'),
  ('Beauté & Santé', 'beaute-sante',   'Cosmétiques, soins personnels, produits de santé'),
  ('Sports & Loisirs','sports-loisirs','Équipements sportifs, jeux, loisirs');

-- ============================================================
-- DONNÉES — PRODUITS (40 produits)
-- ============================================================

-- Électronique (8)
INSERT INTO products (name, slug, description, price, image_url, category_id, stock) VALUES
(
  'Smartphone Samsung Galaxy A54',
  'samsung-galaxy-a54',
  'Écran AMOLED 6.4", 128GB, Caméra 50MP, Batterie 5000mAh',
  450000,
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
  (SELECT id FROM categories WHERE slug = 'electronique'), 25
),(
  'Ordinateur Portable HP 15"',
  'hp-laptop-15',
  'Intel Core i5, 8GB RAM, 256GB SSD, Windows 11',
  650000,
  'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
  (SELECT id FROM categories WHERE slug = 'electronique'), 15
),(
  'Écouteurs Sans Fil JBL',
  'jbl-wireless-earbuds',
  'Bluetooth 5.0, Réduction de bruit active, Autonomie 24h',
  45000,
  'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800',
  (SELECT id FROM categories WHERE slug = 'electronique'), 50
),(
  'Montre Connectée Samsung Galaxy Watch',
  'samsung-galaxy-watch',
  'GPS intégré, Suivi santé, Notifications, Étanche 5ATM',
  380000,
  'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800',
  (SELECT id FROM categories WHERE slug = 'electronique'), 20
),(
  'Samsung Galaxy Tab A9+ 10.9"',
  'samsung-galaxy-tab-a9-plus',
  '128GB WiFi, Écran TFT 10.9", Android 13, Batterie 7040mAh',
  380000,
  'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800',
  (SELECT id FROM categories WHERE slug = 'electronique'), 18
),(
  'Smart TV Samsung 43" 4K UHD',
  'smart-tv-samsung-43-4k',
  'HDR10+, Tizen OS, WiFi intégré, 3x HDMI',
  520000,
  'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800',
  (SELECT id FROM categories WHERE slug = 'electronique'), 12
),(
  'Appareil Photo Sony Alpha ZV-E10',
  'sony-alpha-zv-e10',
  '24.2MP, Vidéo 4K, Objectif 16-50mm inclus, Stabilisation optique',
  780000,
  'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
  (SELECT id FROM categories WHERE slug = 'electronique'), 8
),(
  'Chargeur Solaire Portable 30000mAh',
  'chargeur-solaire-portable',
  '3 ports USB, Panneau solaire intégré, Charge rapide 18W',
  35000,
  'https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=800',
  (SELECT id FROM categories WHERE slug = 'electronique'), 35
);

-- Mode (8)
INSERT INTO products (name, slug, description, price, image_url, category_id, stock) VALUES
(
  'T-Shirt Coton Bio Homme',
  'tshirt-coton-bio-homme',
  'Coton 100% bio certifié, Disponible en 6 couleurs, Tailles S-XXL',
  12000,
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
  (SELECT id FROM categories WHERE slug = 'mode'), 100
),(
  'Jean Femme Slim Fit',
  'jean-femme-slim',
  'Denim stretch 98% coton, Coupe moderne, Tailles 36-44',
  35000,
  'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800',
  (SELECT id FROM categories WHERE slug = 'mode'), 75
),(
  'Baskets Sport Running',
  'baskets-sport-running',
  'Semelle amortissante EVA, Mesh respirant, Pointures 38-46',
  65000,
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
  (SELECT id FROM categories WHERE slug = 'mode'), 60
),(
  'Sac à Main Cuir Véritable',
  'sac-main-cuir',
  'Cuir véritable tanné, Multiple compartiments, Bandoulière amovible',
  55000,
  'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800',
  (SELECT id FROM categories WHERE slug = 'mode'), 40
),(
  'Umushanana Traditionnel Rwandais',
  'umushanana-traditionnel',
  'Tissu wax premium imprimé, Taille unique ajustable, Confection locale',
  55000,
  'https://images.unsplash.com/photo-1594938298603-c8148c4b4357?w=800',
  (SELECT id FROM categories WHERE slug = 'mode'), 30
),(
  'Veste en Denim Homme Oversize',
  'veste-denim-homme-oversize',
  'Coton 100% denim épais, Coupe oversize tendance, Tailles S-XXL',
  42000,
  'https://images.unsplash.com/photo-1544441893-675973e31985?w=800',
  (SELECT id FROM categories WHERE slug = 'mode'), 45
),(
  'Sandales Cuir Artisanales Femme',
  'sandales-cuir-artisanales',
  'Fabriquées à Kigali, Cuir souple, Semelle confort antidérapante',
  28000,
  'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800',
  (SELECT id FROM categories WHERE slug = 'mode'), 55
),(
  'Sac à Dos Étudiant 30L',
  'sac-dos-etudiant-30l',
  'Polyester résistant à l''eau, Compartiment PC 15", Dos rembourré',
  22000,
  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
  (SELECT id FROM categories WHERE slug = 'mode'), 80
);

-- Maison & Jardin (6)
INSERT INTO products (name, slug, description, price, image_url, category_id, stock) VALUES
(
  'Canapé 3 Places Moderne',
  'canape-3-places',
  'Tissu microfibre résistant, Mousses haute densité, L220 x P90cm',
  450000,
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
  (SELECT id FROM categories WHERE slug = 'maison-jardin'), 10
),(
  'Table Basse en Bois Massif',
  'table-basse-bois',
  'Acacia massif huilé, Style scandinave, 100x60x42cm',
  85000,
  'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800',
  (SELECT id FROM categories WHERE slug = 'maison-jardin'), 20
),(
  'Lampe LED à Poser Moderne',
  'lampe-led-moderne',
  'Ampoule E27 incluse 12W, Intensité réglable, Base béton',
  28000,
  'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800',
  (SELECT id FROM categories WHERE slug = 'maison-jardin'), 45
),(
  'Set de Cadres Photo Muraux (lot de 3)',
  'set-cadres-photo-muraux',
  'Bois de pin naturel, Formats 20x25cm, Verre anti-reflets',
  18000,
  'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800',
  (SELECT id FROM categories WHERE slug = 'maison-jardin'), 60
),(
  'Batterie de Cuisine 12 pièces',
  'batterie-cuisine-12-pieces',
  'Aluminium forgé antiadhésif, Compatible tous feux dont induction',
  95000,
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
  (SELECT id FROM categories WHERE slug = 'maison-jardin'), 25
),(
  'Rideau Occultant 140x260cm',
  'rideau-occultant',
  'Isolation thermique et phonique, Triple couche, Lavable 40°',
  32000,
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
  (SELECT id FROM categories WHERE slug = 'maison-jardin'), 50
);

-- Alimentation (6)
INSERT INTO products (name, slug, description, price, image_url, category_id, stock) VALUES
(
  'Café Rwandais Premium 500g',
  'cafe-rwandais-premium',
  'Arabica Single Origin, Torréfaction artisanale, Notes de caramel',
  8500,
  'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800',
  (SELECT id FROM categories WHERE slug = 'alimentation'), 200
),(
  'Miel Naturel du Rwanda 1kg',
  'miel-naturel-1kg',
  'Miel pur non pasteurisé, Récolté dans les forêts rwandaises',
  15000,
  'https://images.unsplash.com/photo-1587049352846-4a222e784acc?w=800',
  (SELECT id FROM categories WHERE slug = 'alimentation'), 80
),(
  'Thé Vert Bio des Collines 100g',
  'the-vert-bio',
  'Récolte altitude 2000m, Certifié bio, Antioxydants naturels',
  6500,
  'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800',
  (SELECT id FROM categories WHERE slug = 'alimentation'), 150
),(
  'Huile de Palme Rouge Locale 5L',
  'huile-palme-rouge-5l',
  'Pressée à froid, Production paysanne certifiée, Riche en vitamine A',
  12000,
  'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800',
  (SELECT id FROM categories WHERE slug = 'alimentation'), 100
),(
  'Farine de Sorgho Bio 2kg',
  'farine-sorgho-bio-2kg',
  'Sans gluten, Mouture traditionnelle, Agriculture locale certifiée',
  4500,
  'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800',
  (SELECT id FROM categories WHERE slug = 'alimentation'), 150
),(
  'Bananes Séchées du Rwanda 500g',
  'bananes-sechees-500g',
  'Variété Intuntu locale, Sans sucre ni conservateurs, Snack sain',
  7000,
  'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800',
  (SELECT id FROM categories WHERE slug = 'alimentation'), 200
);

-- Beauté & Santé (6)
INSERT INTO products (name, slug, description, price, image_url, category_id, stock) VALUES
(
  'Crème Hydratante Visage 50ml',
  'creme-hydratante-visage',
  'Tous types de peaux, Aloe vera et karité, SPF 15',
  22000,
  'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800',
  (SELECT id FROM categories WHERE slug = 'beaute-sante'), 90
),(
  'Shampoing Naturel 500ml',
  'shampoing-naturel-500ml',
  'Sans sulfates ni parabènes, Huile d''argan, Cheveux secs et abîmés',
  18000,
  'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800',
  (SELECT id FROM categories WHERE slug = 'beaute-sante'), 110
),(
  'Parfum Floral Eau de Toilette 50ml',
  'parfum-floral-50ml',
  'Notes de jasmin et de rose, Tenue 8h, Vaporisateur',
  45000,
  'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800',
  (SELECT id FROM categories WHERE slug = 'beaute-sante'), 55
),(
  'Huile de Coco Vierge 250ml',
  'huile-coco-vierge-250ml',
  'Pressée à froid, 100% naturelle, Multi-usage peau et cheveux',
  14000,
  'https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?w=800',
  (SELECT id FROM categories WHERE slug = 'beaute-sante'), 120
),(
  'Sérum Vitamine C Éclat 30ml',
  'serum-vitamine-c-30ml',
  'Concentration 15%, Anti-taches et anti-âge, Formule légère non grasse',
  32000,
  'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800',
  (SELECT id FROM categories WHERE slug = 'beaute-sante'), 75
),(
  'Lotion Corporelle au Karité 400ml',
  'lotion-corporelle-karite-400ml',
  'Beurre de karité du Rwanda, Hydratation 48h, Parfum floral délicat',
  16000,
  'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800',
  (SELECT id FROM categories WHERE slug = 'beaute-sante'), 90
);

-- Sports & Loisirs (6)
INSERT INTO products (name, slug, description, price, image_url, category_id, stock) VALUES
(
  'Ballon de Football Taille 5',
  'ballon-football-t5',
  'Cuir synthétique cousu main, Résistant aux intempéries, Certifié FIFA',
  25000,
  'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=800',
  (SELECT id FROM categories WHERE slug = 'sports-loisirs'), 70
),(
  'Tapis de Yoga Premium 183x61cm',
  'tapis-yoga-premium',
  'TPE écologique antidérapant, Épaisseur 6mm, Sangle de transport incluse',
  32000,
  'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800',
  (SELECT id FROM categories WHERE slug = 'sports-loisirs'), 50
),(
  'Haltères Néoprène 5kg (Paire)',
  'halteres-neoprene-5kg',
  'Revêtement néoprène antidérapant, Prise ergonomique, Couleurs vives',
  28000,
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
  (SELECT id FROM categories WHERE slug = 'sports-loisirs'), 40
),(
  'Corde à Sauter Speed Rope',
  'corde-sauter-speed-rope',
  'Câble acier gainé PVC, Poignées aluminium, Longueur ajustable',
  8500,
  'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=800',
  (SELECT id FROM categories WHERE slug = 'sports-loisirs'), 100
),(
  'Gourde Isotherme Sport 750ml',
  'gourde-isotherme-750ml',
  'Inox 18/8 double paroi, 24h froid / 12h chaud, Bouchon sport',
  18000,
  'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800',
  (SELECT id FROM categories WHERE slug = 'sports-loisirs'), 85
),(
  'Sac de Sport 40L',
  'sac-sport-40l',
  'Compartiment chaussures imperméable, Bandoulière et bretelles amovibles',
  25000,
  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
  (SELECT id FROM categories WHERE slug = 'sports-loisirs'), 65
);

-- ============================================================
-- CLIENTS
-- ============================================================

INSERT INTO customers (email, name, phone, address, city) VALUES
  ('jean.uwimana@example.com',    'Jean Uwimana',    '+250788123456', 'KG 15 Ave',  'Kigali'),
  ('marie.mukamana@example.com',  'Marie Mukamana',  '+250722654321', 'KN 3 Rd',    'Kigali'),
  ('paul.habimana@example.com',   'Paul Habimana',   '+250788987654', 'KG 33 Ave',  'Kigali'),
  ('alice.nzeyimana@example.com', 'Alice Nzeyimana', '+250722111222', 'KN 12 St',   'Kigali'),
  ('eric.mugisha@example.com',    'Eric Mugisha',    '+250788444555', 'KK 7 Ave',   'Kigali')
ON CONFLICT (email) DO NOTHING;

-- ============================================================
-- COMMANDES DE DÉMONSTRATION
-- ============================================================

INSERT INTO orders (order_number, customer_id, total_amount, status, payment_status, notes)
VALUES
(
  'ORD-2026001',
  (SELECT id FROM customers WHERE email = 'jean.uwimana@example.com'),
  495000, 'delivered', 'paid',
  'Livraison effectuée sans problème'
),(
  'ORD-2026002',
  (SELECT id FROM customers WHERE email = 'marie.mukamana@example.com'),
  107000, 'shipped', 'paid',
  'En cours de livraison'
),(
  'ORD-2026003',
  (SELECT id FROM customers WHERE email = 'paul.habimana@example.com'),
  35000, 'confirmed', 'unpaid',
  'Paiement à la livraison'
),(
  'ORD-2026004',
  (SELECT id FROM customers WHERE email = 'alice.nzeyimana@example.com'),
  65000, 'pending', 'unpaid',
  NULL
),(
  'ORD-2026005',
  (SELECT id FROM customers WHERE email = 'eric.mugisha@example.com'),
  180000, 'processing', 'paid',
  'Commande urgente'
)
ON CONFLICT (order_number) DO NOTHING;

-- Lignes de commandes (order_items) pour ORD-2026001
INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, total_price)
VALUES (
  (SELECT id FROM orders WHERE order_number = 'ORD-2026001'),
  (SELECT id FROM products WHERE slug = 'samsung-galaxy-a54'),
  'Smartphone Samsung Galaxy A54', 1, 450000, 450000
),(
  (SELECT id FROM orders WHERE order_number = 'ORD-2026001'),
  (SELECT id FROM products WHERE slug = 'jbl-wireless-earbuds'),
  'Écouteurs Sans Fil JBL', 1, 45000, 45000
);

-- Lignes pour ORD-2026002
INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, total_price)
VALUES (
  (SELECT id FROM orders WHERE order_number = 'ORD-2026002'),
  (SELECT id FROM products WHERE slug = 'baskets-sport-running'),
  'Baskets Sport Running', 1, 65000, 65000
),(
  (SELECT id FROM orders WHERE order_number = 'ORD-2026002'),
  (SELECT id FROM products WHERE slug = 'tshirt-coton-bio-homme'),
  'T-Shirt Coton Bio Homme', 2, 12000, 24000
),(
  (SELECT id FROM orders WHERE order_number = 'ORD-2026002'),
  (SELECT id FROM products WHERE slug = 'sac-dos-etudiant-30l'),
  'Sac à Dos Étudiant 30L', 1, 22000, 22000
);

-- Lignes pour ORD-2026003
INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, total_price)
VALUES (
  (SELECT id FROM orders WHERE order_number = 'ORD-2026003'),
  (SELECT id FROM products WHERE slug = 'jean-femme-slim'),
  'Jean Femme Slim Fit', 1, 35000, 35000
);

-- Lignes pour ORD-2026004
INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, total_price)
VALUES (
  (SELECT id FROM orders WHERE order_number = 'ORD-2026004'),
  (SELECT id FROM products WHERE slug = 'baskets-sport-running'),
  'Baskets Sport Running', 1, 65000, 65000
);

-- Lignes pour ORD-2026005
INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, total_price)
VALUES (
  (SELECT id FROM orders WHERE order_number = 'ORD-2026005'),
  (SELECT id FROM products WHERE slug = 'hp-laptop-15'),
  'Ordinateur Portable HP 15"', 1, 650000, 650000
);

-- ============================================================
-- VÉRIFICATION
-- ============================================================

SELECT
  (SELECT COUNT(*) FROM categories)  AS categories,
  (SELECT COUNT(*) FROM products)    AS products,
  (SELECT COUNT(*) FROM customers)   AS customers,
  (SELECT COUNT(*) FROM orders)      AS orders,
  (SELECT COUNT(*) FROM order_items) AS order_items;

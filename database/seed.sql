-- ============================================
-- Rwanda E-Commerce Seed Data
-- Sample data for testing and development
-- ============================================

-- Clear existing data (optional, use with caution)
-- TRUNCATE TABLE order_items, orders, customers, products, categories CASCADE;

-- ============================================
-- Categories
-- ============================================

INSERT INTO categories (name, slug, description) VALUES
('Électronique', 'electronique', 'Smartphones, ordinateurs, accessoires électroniques'),
('Mode', 'mode', 'Vêtements, chaussures, accessoires de mode'),
('Maison & Jardin', 'maison-jardin', 'Meubles, décoration, outils de jardin'),
('Alimentation', 'alimentation', 'Produits alimentaires, boissons, snacks'),
('Beauté & Santé', 'beaute-sante', 'Cosmétiques, soins personnels, produits de santé'),
('Sports & Loisirs', 'sports-loisirs', 'Équipements sportifs, jeux, loisirs')
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- Products
-- ============================================

-- Électronique
INSERT INTO products (name, slug, description, price, image_url, category_id, stock) VALUES
(
  'Smartphone Samsung Galaxy A54',
  'samsung-galaxy-a54',
  'Écran AMOLED 6.4", 128GB, Caméra 50MP, Batterie 5000mAh',
  450000,
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
  (SELECT id FROM categories WHERE slug = 'electronique'),
  25
),
(
  'Ordinateur Portable HP 15"',
  'hp-laptop-15',
  'Intel Core i5, 8GB RAM, 256GB SSD, Windows 11',
  650000,
  'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
  (SELECT id FROM categories WHERE slug = 'electronique'),
  15
),
(
  'Écouteurs Sans Fil JBL',
  'jbl-wireless-earbuds',
  'Bluetooth 5.0, Réduction de bruit, Autonomie 24h',
  45000,
  'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800',
  (SELECT id FROM categories WHERE slug = 'electronique'),
  50
),
(
  'Montre Connectée Apple Watch SE',
  'apple-watch-se',
  'GPS, Suivi santé, Notifications, Étanche',
  380000,
  'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800',
  (SELECT id FROM categories WHERE slug = 'electronique'),
  20
);

-- Mode
INSERT INTO products (name, slug, description, price, image_url, category_id, stock) VALUES
(
  'T-Shirt Coton Bio Homme',
  'tshirt-coton-bio-homme',
  'Coton 100% bio, Disponible en plusieurs couleurs, Taille S-XXL',
  12000,
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
  (SELECT id FROM categories WHERE slug = 'mode'),
  100
),
(
  'Jean Femme Slim Fit',
  'jean-femme-slim',
  'Denim stretch, Coupe moderne, Taille 36-44',
  35000,
  'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800',
  (SELECT id FROM categories WHERE slug = 'mode'),
  75
),
(
  'Baskets Sport Nike',
  'baskets-sport-nike',
  'Confort optimal, Semelle amortissante, Design moderne',
  65000,
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
  (SELECT id FROM categories WHERE slug = 'mode'),
  60
),
(
  'Sac à Main Cuir',
  'sac-main-cuir',
  'Cuir véritable, Multiple compartiments, Élégant',
  55000,
  'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800',
  (SELECT id FROM categories WHERE slug = 'mode'),
  40
);

-- Maison & Jardin
INSERT INTO products (name, slug, description, price, image_url, category_id, stock) VALUES
(
  'Canapé 3 Places Moderne',
  'canape-3-places',
  'Tissu résistant, Confortable, Design contemporain',
  450000,
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
  (SELECT id FROM categories WHERE slug = 'maison-jardin'),
  10
),
(
  'Table Basse en Bois',
  'table-basse-bois',
  'Bois massif, Style rustique, 100x60cm',
  85000,
  'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800',
  (SELECT id FROM categories WHERE slug = 'maison-jardin'),
  20
),
(
  'Lampe LED Moderne',
  'lampe-led-moderne',
  'Économie d''énergie, Intensité réglable, Design épuré',
  28000,
  'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800',
  (SELECT id FROM categories WHERE slug = 'maison-jardin'),
  45
);

-- Alimentation
INSERT INTO products (name, slug, description, price, image_url, category_id, stock) VALUES
(
  'Café Rwandais Premium 500g',
  'cafe-rwandais-premium',
  'Café arabica, Cultivé localement, Saveur riche',
  8500,
  'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800',
  (SELECT id FROM categories WHERE slug = 'alimentation'),
  200
),
(
  'Miel Naturel 1kg',
  'miel-naturel-1kg',
  'Miel pur, Produit local, Qualité premium',
  15000,
  'https://images.unsplash.com/photo-1587049352846-4a222e784acc?w=800',
  (SELECT id FROM categories WHERE slug = 'alimentation'),
  80
),
(
  'Thé Vert Bio 100g',
  'the-vert-bio',
  'Agriculture biologique, Antioxydants naturels',
  6500,
  'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800',
  (SELECT id FROM categories WHERE slug = 'alimentation'),
  150
);

-- Beauté & Santé
INSERT INTO products (name, slug, description, price, image_url, category_id, stock) VALUES
(
  'Crème Hydratante Visage',
  'creme-hydratante-visage',
  'Tous types de peaux, Ingrédients naturels, 50ml',
  22000,
  'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800',
  (SELECT id FROM categories WHERE slug = 'beaute-sante'),
  90
),
(
  'Shampoing Naturel 500ml',
  'shampoing-naturel',
  'Sans sulfates, Pour cheveux secs et abîmés',
  18000,
  'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800',
  (SELECT id FROM categories WHERE slug = 'beaute-sante'),
  110
),
(
  'Parfum Floral 50ml',
  'parfum-floral-50ml',
  'Senteur délicate, Longue tenue, Notes florales',
  45000,
  'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800',
  (SELECT id FROM categories WHERE slug = 'beaute-sante'),
  55
);

-- Sports & Loisirs
INSERT INTO products (name, slug, description, price, image_url, category_id, stock) VALUES
(
  'Ballon de Football Nike',
  'ballon-football-nike',
  'Taille 5, Résistant, Certification FIFA',
  25000,
  'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=800',
  (SELECT id FROM categories WHERE slug = 'sports-loisirs'),
  70
),
(
  'Tapis de Yoga Premium',
  'tapis-yoga-premium',
  'Antidérapant, Écologique, 183x61cm',
  32000,
  'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800',
  (SELECT id FROM categories WHERE slug = 'sports-loisirs'),
  50
),
(
  'Haltères 5kg (Paire)',
  'halteres-5kg',
  'Revêtement néoprène, Prise confortable',
  28000,
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
  (SELECT id FROM categories WHERE slug = 'sports-loisirs'),
  40
);

-- ============================================
-- Sample Customer (for testing)
-- ============================================

INSERT INTO customers (email, name, phone, address, city) VALUES
('test@example.com', 'Jean Uwimana', '+250788123456', 'KG 15 Ave', 'Kigali')
ON CONFLICT (email) DO NOTHING;

-- ============================================
-- Verification Queries
-- ============================================

-- Check inserted data
-- SELECT * FROM categories ORDER BY name;
-- SELECT COUNT(*) as total_products FROM products;
-- SELECT c.name as category, COUNT(p.id) as product_count
-- FROM categories c
-- LEFT JOIN products p ON c.id = p.category_id
-- GROUP BY c.name
-- ORDER BY c.name;

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

-- Électronique (nouveaux)
INSERT INTO products (name, slug, description, price, image_url, category_id, stock) VALUES
(
  'Samsung Galaxy Tab A9+ 10.9"',
  'samsung-galaxy-tab-a9-plus',
  '128GB WiFi, Écran TFT 10.9", Android 13',
  380000,
  'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800',
  (SELECT id FROM categories WHERE slug = 'electronique'),
  18
),
(
  'Smart TV Samsung 43" 4K UHD',
  'smart-tv-samsung-43-4k',
  'HDR10+, Tizen OS, WiFi intégré',
  520000,
  'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800',
  (SELECT id FROM categories WHERE slug = 'electronique'),
  12
),
(
  'Appareil Photo Sony Alpha ZV-E10',
  'sony-alpha-zv-e10',
  '24.2MP, Vidéo 4K, Objectif 16-50mm',
  780000,
  'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
  (SELECT id FROM categories WHERE slug = 'electronique'),
  8
),
(
  'Chargeur Solaire Portable 30000mAh',
  'chargeur-solaire-portable-30000mah',
  '3 ports USB, Panneau solaire intégré',
  35000,
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
  (SELECT id FROM categories WHERE slug = 'electronique'),
  35
);

-- Mode (nouveaux)
INSERT INTO products (name, slug, description, price, image_url, category_id, stock) VALUES
(
  'Umushanana Traditionnel Rwandais',
  'umushanana-traditionnel-rwandais',
  'Tissu wax premium, Taille unique ajustable',
  55000,
  'https://images.unsplash.com/photo-1594938298603-c8148c4b4357?w=800',
  (SELECT id FROM categories WHERE slug = 'mode'),
  30
),
(
  'Veste en Denim Homme Oversize',
  'veste-denim-homme-oversize',
  'Coton 100%, Disponible S-XXL',
  42000,
  'https://images.unsplash.com/photo-1544441893-675973e31985?w=800',
  (SELECT id FROM categories WHERE slug = 'mode'),
  45
),
(
  'Sandales Cuir Artisanales Femme',
  'sandales-cuir-artisanales-femme',
  'Fabriquées localement, Semelle confort',
  28000,
  'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800',
  (SELECT id FROM categories WHERE slug = 'mode'),
  55
),
(
  'Sac à Dos Étudiant 30L',
  'sac-dos-etudiant-30l',
  'Polyester résistant, Compartiment PC 15"',
  22000,
  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
  (SELECT id FROM categories WHERE slug = 'mode'),
  80
);

-- Maison & Jardin (nouveaux)
INSERT INTO products (name, slug, description, price, image_url, category_id, stock) VALUES
(
  'Set de Cadres Photo Muraux (lot de 3)',
  'set-cadres-photo-muraux-lot-3',
  'Bois naturel, 20x25cm',
  18000,
  'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800',
  (SELECT id FROM categories WHERE slug = 'maison-jardin'),
  60
),
(
  'Batterie de Cuisine 12 pièces',
  'batterie-cuisine-12-pieces',
  'Aluminium antiadhésif, Tous feux',
  95000,
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
  (SELECT id FROM categories WHERE slug = 'maison-jardin'),
  25
),
(
  'Rideau Occultant 140x260cm',
  'rideau-occultant-140x260cm',
  'Isolation thermique, Coloris au choix',
  32000,
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
  (SELECT id FROM categories WHERE slug = 'maison-jardin'),
  50
);

-- Alimentation (nouveaux)
INSERT INTO products (name, slug, description, price, image_url, category_id, stock) VALUES
(
  'Huile de Palme Rouge Locale 5L',
  'huile-palme-rouge-locale-5l',
  'Pressée à froid, Production rwandaise',
  12000,
  'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800',
  (SELECT id FROM categories WHERE slug = 'alimentation'),
  100
),
(
  'Farine de Sorgho Bio 2kg',
  'farine-sorgho-bio-2kg',
  'Sans gluten, Agriculture locale certifiée',
  4500,
  'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800',
  (SELECT id FROM categories WHERE slug = 'alimentation'),
  150
),
(
  'Bananes Séchées du Rwanda 500g',
  'bananes-sechees-rwanda-500g',
  'Sans sucre ajouté, Snack naturel',
  7000,
  'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800',
  (SELECT id FROM categories WHERE slug = 'alimentation'),
  200
);

-- Beauté & Santé (nouveaux)
INSERT INTO products (name, slug, description, price, image_url, category_id, stock) VALUES
(
  'Huile de Coco Vierge 250ml',
  'huile-coco-vierge-250ml',
  '100% naturelle, Multi-usage peau et cheveux',
  14000,
  'https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?w=800',
  (SELECT id FROM categories WHERE slug = 'beaute-sante'),
  120
),
(
  'Sérum Vitamine C 30ml',
  'serum-vitamine-c-30ml',
  'Anti-taches, Éclat du teint, Formule légère',
  32000,
  'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800',
  (SELECT id FROM categories WHERE slug = 'beaute-sante'),
  75
),
(
  'Lotion Corporelle au Karité 400ml',
  'lotion-corporelle-karite-400ml',
  'Hydratation 48h, Parfum fleuri',
  16000,
  'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800',
  (SELECT id FROM categories WHERE slug = 'beaute-sante'),
  90
);

-- Sports & Loisirs (nouveaux)
INSERT INTO products (name, slug, description, price, image_url, category_id, stock) VALUES
(
  'Corde à Sauter Speed Rope',
  'corde-sauter-speed-rope',
  'Câble acier, Poignées ergonomiques',
  8500,
  'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=800',
  (SELECT id FROM categories WHERE slug = 'sports-loisirs'),
  100
),
(
  'Gourde Isotherme Sport 750ml',
  'gourde-isotherme-sport-750ml',
  'Inox 18/8, Maintien 24h froid / 12h chaud',
  18000,
  'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800',
  (SELECT id FROM categories WHERE slug = 'sports-loisirs'),
  85
),
(
  'Sac de Sport 40L',
  'sac-sport-40l',
  'Compartiment chaussures séparé, Bandoulière amovible',
  25000,
  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
  (SELECT id FROM categories WHERE slug = 'sports-loisirs'),
  65
);

-- ============================================
-- Sample Customers (for testing)
-- ============================================

INSERT INTO customers (email, name, phone, address, city) VALUES
('test@example.com', 'Jean Uwimana', '+250788123456', 'KG 15 Ave', 'Kigali'),
('marie.mukamana@example.com', 'Marie Mukamana', '+250722654321', 'KN 3 Rd', 'Kigali'),
('paul.habimana@example.com', 'Paul Habimana', '+250788987654', 'KG 33 Ave', 'Kigali'),
('alice.nzeyimana@example.com', 'Alice Nzeyimana', '+250722111222', 'KN 12 St', 'Kigali')
ON CONFLICT (email) DO NOTHING;

-- ============================================
-- Sample Orders (demo with different statuses)
-- ============================================

INSERT INTO orders (order_number, customer_id, status, payment_status, total_amount, shipping_address) VALUES
(
  'ORD-2026001',
  (SELECT id FROM customers WHERE email = 'test@example.com'),
  'delivered',
  'paid',
  495000,
  '{"name": "Jean Uwimana", "phone": "+250788123456", "address": "KG 15 Ave", "city": "Kigali", "sector": "Kimihurura"}'
),
(
  'ORD-2026002',
  (SELECT id FROM customers WHERE email = 'marie.mukamana@example.com'),
  'shipped',
  'paid',
  107000,
  '{"name": "Marie Mukamana", "phone": "+250722654321", "address": "KN 3 Rd", "city": "Kigali", "sector": "Nyarutarama"}'
),
(
  'ORD-2026003',
  (SELECT id FROM customers WHERE email = 'paul.habimana@example.com'),
  'confirmed',
  'unpaid',
  35000,
  '{"name": "Paul Habimana", "phone": "+250788987654", "address": "KG 33 Ave", "city": "Kigali", "sector": "Kacyiru"}'
),
(
  'ORD-2026004',
  (SELECT id FROM customers WHERE email = 'alice.nzeyimana@example.com'),
  'pending',
  'unpaid',
  65000,
  '{"name": "Alice Nzeyimana", "phone": "+250722111222", "address": "KN 12 St", "city": "Kigali", "sector": "Gisozi"}'
)
ON CONFLICT (order_number) DO NOTHING;

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

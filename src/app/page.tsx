import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function Home() {
  const categories = [
    {
      name: 'Électronique',
      slug: 'electronique',
      icon: '📱',
      description: 'Smartphones, ordinateurs, accessoires',
    },
    {
      name: 'Mode',
      slug: 'mode',
      icon: '👕',
      description: 'Vêtements, chaussures, accessoires',
    },
    {
      name: 'Maison & Jardin',
      slug: 'maison-jardin',
      icon: '🏠',
      description: 'Meubles, décoration, outils',
    },
    {
      name: 'Alimentation',
      slug: 'alimentation',
      icon: '🍽️',
      description: 'Produits alimentaires, boissons',
    },
    {
      name: 'Beauté & Santé',
      slug: 'beaute-sante',
      icon: '💄',
      description: 'Cosmétiques, soins personnels',
    },
    {
      name: 'Sports & Loisirs',
      slug: 'sports-loisirs',
      icon: '⚽',
      description: 'Équipements sportifs, jeux',
    },
  ];

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
      title: 'Produits de Qualité',
      description: 'Sélection rigoureuse des meilleurs produits pour vous',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Livraison Rapide',
      description: 'Livraison dans tout le Rwanda en 24-48h',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'Paiement Sécurisé',
      description: 'Mobile Money, cartes bancaires acceptées',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: 'Support Client 24/7',
      description: 'Notre équipe est là pour vous aider à tout moment',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 text-white">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Bienvenue sur Rwanda Market
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-50">
              Votre marketplace rwandaise de confiance. Découvrez des milliers de produits de qualité à prix imbattables.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" variant="secondary" className="shadow-lg hover:shadow-xl">
                  Découvrir nos produits
                </Button>
              </Link>
              <Link href="/categories">
                <Button size="lg" variant="outline" className="bg-white text-primary-600 border-white hover:bg-primary-50">
                  Parcourir les catégories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Nos Catégories
            </h2>
            <p className="text-lg text-gray-600">
              Explorez notre large gamme de produits par catégorie
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/products?category=${category.slug}`}
              >
                <Card hover className="h-full cursor-pointer group">
                  <div className="flex items-start space-x-4">
                    <div className="text-5xl">{category.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Pourquoi Nous Choisir ?
            </h2>
            <p className="text-lg text-gray-600">
              Une expérience d'achat exceptionnelle à chaque commande
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prêt à commencer vos achats ?
          </h2>
          <p className="text-xl mb-8 text-primary-50">
            Rejoignez des milliers de clients satisfaits au Rwanda
          </p>
          <Link href="/products">
            <Button size="lg" variant="secondary" className="shadow-lg hover:shadow-xl">
              Commencer à magasiner
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

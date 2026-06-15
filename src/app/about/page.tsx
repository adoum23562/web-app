import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À propos | Rwanda Market',
  description: 'Découvrez l\'histoire et la mission de Rwanda Market, votre marketplace rwandaise de confiance.',
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 bg-gray-50 dark:bg-dark-bg min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            À propos de Rwanda Market
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            La plateforme e-commerce qui connecte les consommateurs rwandais avec des produits de qualité, locaux et internationaux.
          </p>
        </div>

        {/* Histoire */}
        <div className="bg-white dark:bg-dark-card rounded-3xl p-8 md:p-12 shadow-soft border border-gray-100 dark:border-dark-border mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Notre histoire</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              Rwanda Market a été fondé à Kigali avec une vision simple : rendre le commerce en ligne accessible à tous les Rwandais. Depuis notre création, nous nous sommes engagés à offrir une expérience d&apos;achat fluide, sécurisée et adaptée aux besoins locaux.
            </p>
            <p>
              Notre mission est de connecter les consommateurs rwandais avec les meilleurs produits disponibles sur le marché, qu&apos;ils soient fabriqués localement ou importés. Nous croyons que chaque Rwandais mérite d&apos;accéder à des produits de qualité, livrés rapidement et à des prix compétitifs.
            </p>
            <p>
              Aujourd&apos;hui, Rwanda Market propose des milliers de produits dans des catégories variées : électronique, mode, alimentation, beauté, sport et bien plus encore. Nous travaillons en partenariat avec des producteurs locaux et des fournisseurs internationaux pour garantir la meilleure sélection possible.
            </p>
          </div>
        </div>

        {/* Valeurs */}
        <div className="bg-white dark:bg-dark-card rounded-3xl p-8 md:p-12 shadow-soft border border-gray-100 dark:border-dark-border mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Nos valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-dark-bg/50">
              <div className="w-14 h-14 bg-primary-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Qualité</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Chaque produit référencé sur notre plateforme est sélectionné avec soin pour garantir la meilleure qualité à nos clients.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-dark-bg/50">
              <div className="w-14 h-14 bg-secondary-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Confiance</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                La confiance de nos clients est notre priorité absolue. Transactions sécurisées, données protégées et service client réactif.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-dark-bg/50">
              <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Localité</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Nous soutenons l&apos;économie rwandaise en mettant en avant les producteurs et artisans locaux sur notre plateforme.
              </p>
            </div>
          </div>
        </div>

        {/* Équipe */}
        <div className="bg-white dark:bg-dark-card rounded-3xl p-8 md:p-12 shadow-soft border border-gray-100 dark:border-dark-border">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Notre équipe</h2>
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
            <p>
              L&apos;équipe Rwanda Market est composée de professionnels passionnés par le commerce digital et le développement économique du Rwanda. Basés à Kigali, nous travaillons chaque jour pour améliorer votre expérience d&apos;achat et élargir notre catalogue de produits.
            </p>
            <p>
              Nous sommes à l&apos;écoute de nos clients et partenaires. Si vous souhaitez nous rejoindre ou collaborer avec nous, n&apos;hésitez pas à nous contacter via notre formulaire de contact.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Retours & Remboursements | Rwanda Market',
  description: 'Politique de retour et remboursement de Rwanda Market. 30 jours pour changer d\'avis.',
};

export default function ReturnsPage() {
  return (
    <div className="pt-32 pb-24 bg-gray-50 dark:bg-dark-bg min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Retours &amp; Remboursements
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Votre satisfaction est notre priorité. Retournez vos achats sous 30 jours.
          </p>
        </div>

        {/* Politique de retour */}
        <div className="bg-white dark:bg-dark-card rounded-3xl p-8 md:p-12 shadow-soft border border-gray-100 dark:border-dark-border mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-primary-500/10 rounded-2xl">
              <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Politique de retour 30 jours</h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Chez Rwanda Market, vous disposez de <strong>30 jours</strong> à compter de la date de réception de votre commande pour retourner un produit. Nous vous remboursons intégralement si les conditions ci-dessous sont respectées.
          </p>
        </div>

        {/* Conditions */}
        <div className="bg-white dark:bg-dark-card rounded-3xl p-8 md:p-12 shadow-soft border border-gray-100 dark:border-dark-border mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Conditions de retour</h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            {[
              'Le produit doit être dans son état d\'origine, non utilisé',
              'L\'emballage d\'origine doit être intact et non endommagé',
              'Tous les accessoires, manuels et étiquettes doivent être présents',
              'La demande de retour doit être effectuée dans les 30 jours suivant la réception',
              'Le produit ne doit pas avoir été personnalisé ou modifié',
            ].map((cond, i) => (
              <li key={i} className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {cond}
              </li>
            ))}
          </ul>
        </div>

        {/* Processus */}
        <div className="bg-white dark:bg-dark-card rounded-3xl p-8 md:p-12 shadow-soft border border-gray-100 dark:border-dark-border mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Comment effectuer un retour ?</h2>
          <div className="space-y-4">
            {[
              { step: '1', title: 'Contactez notre service client', desc: 'Envoyez un email à contact@rwandamarket.rw en indiquant votre numéro de commande et la raison du retour.' },
              { step: '2', title: 'Validation de votre demande', desc: 'Notre équipe vous répond sous 24h pour valider votre demande et vous communiquer les instructions de retour.' },
              { step: '3', title: 'Retour organisé', desc: 'Nous organisons la collecte du colis à votre adresse, sans frais supplémentaires pour vous.' },
              { step: '4', title: 'Remboursement', desc: 'Une fois le produit reçu et vérifié, le remboursement est effectué sous 5 à 7 jours ouvrés via le même moyen de paiement.' },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {item.step}
                </div>
                <div className="pt-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Exclusions */}
        <div className="bg-white dark:bg-dark-card rounded-3xl p-8 md:p-12 shadow-soft border border-gray-100 dark:border-dark-border">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Produits non retournables</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Pour des raisons d&apos;hygiène et de sécurité, certains produits ne peuvent pas être retournés :
          </p>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            {[
              'Produits alimentaires et boissons',
              'Produits cosmétiques et de beauté ouverts ou utilisés',
              'Sous-vêtements et maillots de bain',
              'Produits numériques et logiciels téléchargés',
              'Produits personnalisés ou sur mesure',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}

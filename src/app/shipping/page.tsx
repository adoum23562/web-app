import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Livraison | Rwanda Market',
  description: 'Informations sur les zones de livraison, tarifs et délais de Rwanda Market.',
};

export default function ShippingPage() {
  return (
    <div className="pt-32 pb-24 bg-gray-50 dark:bg-dark-bg min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Informations de livraison
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Tout ce que vous devez savoir sur nos zones de livraison, tarifs et délais.
          </p>
        </div>

        {/* Zones et délais */}
        <div className="bg-white dark:bg-dark-card rounded-3xl p-8 md:p-12 shadow-soft border border-gray-100 dark:border-dark-border mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Zones de livraison</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-primary-500/5 border border-primary-500/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary-500/10 rounded-xl">
                  <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Kigali</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Délai de livraison : <span className="font-semibold text-gray-900 dark:text-white">24 heures</span></p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Livraison disponible dans tous les secteurs de la capitale.</p>
            </div>
            <div className="p-6 rounded-2xl bg-secondary-500/5 border border-secondary-500/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-secondary-500/10 rounded-xl">
                  <svg className="w-5 h-5 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Reste du Rwanda</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Délai de livraison : <span className="font-semibold text-gray-900 dark:text-white">48 à 72 heures</span></p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Livraison dans toutes les villes et districts du Rwanda.</p>
            </div>
          </div>
        </div>

        {/* Tarifs */}
        <div className="bg-white dark:bg-dark-card rounded-3xl p-8 md:p-12 shadow-soft border border-gray-100 dark:border-dark-border mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Tarifs de livraison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-dark-border">
                  <th className="text-left py-3 font-semibold text-gray-900 dark:text-white">Montant de la commande</th>
                  <th className="text-left py-3 font-semibold text-gray-900 dark:text-white">Frais de livraison</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-dark-border text-gray-700 dark:text-gray-300">
                <tr>
                  <td className="py-3">Moins de 50 000 RWF</td>
                  <td className="py-3 font-semibold">2 000 RWF</td>
                </tr>
                <tr>
                  <td className="py-3">50 000 RWF et plus</td>
                  <td className="py-3 font-semibold text-green-600 dark:text-green-400">Gratuit</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Processus */}
        <div className="bg-white dark:bg-dark-card rounded-3xl p-8 md:p-12 shadow-soft border border-gray-100 dark:border-dark-border mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Comment fonctionne la livraison ?</h2>
          <div className="space-y-4">
            {[
              { step: '1', title: 'Passez votre commande', desc: 'Ajoutez vos produits au panier et finalisez votre commande en renseignant vos coordonnées de livraison.' },
              { step: '2', title: 'Confirmation', desc: 'Vous recevez une confirmation de commande par SMS ou email avec un numéro de suivi.' },
              { step: '3', title: 'Préparation', desc: 'Notre équipe prépare votre colis avec soin et le remet à notre partenaire logistique.' },
              { step: '4', title: 'Livraison', desc: 'Notre livreur vous contacte avant de se rendre à votre adresse pour s\'assurer de votre disponibilité.' },
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

        {/* FAQ */}
        <div className="bg-white dark:bg-dark-card rounded-3xl p-8 md:p-12 shadow-soft border border-gray-100 dark:border-dark-border">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Questions fréquentes</h2>
          <div className="space-y-6">
            {[
              {
                q: 'Puis-je suivre ma commande en temps réel ?',
                a: 'Oui, après confirmation de votre commande, vous recevrez un lien de suivi par SMS. Vous pourrez ainsi suivre l\'avancement de votre livraison en temps réel.',
              },
              {
                q: 'Que se passe-t-il si je suis absent lors de la livraison ?',
                a: 'Notre livreur vous contactera par téléphone avant la livraison. En cas d\'absence, un nouveau créneau de livraison sera planifié sans frais supplémentaires.',
              },
              {
                q: 'Livrez-vous en dehors de Kigali ?',
                a: 'Oui, nous livrons dans tout le Rwanda. Pour les villes secondaires (Huye, Musanze, Rubavu, etc.), le délai est de 48 à 72 heures.',
              },
              {
                q: 'Les commandes sont-elles livrées le week-end ?',
                a: 'Oui, nos livreurs travaillent du lundi au samedi. Les commandes passées le dimanche sont traitées dès le lundi matin.',
              },
            ].map((item, i) => (
              <div key={i} className="border-b border-gray-100 dark:border-dark-border pb-6 last:border-0 last:pb-0">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.q}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

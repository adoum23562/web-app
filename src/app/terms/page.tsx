import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conditions Générales d\'Utilisation | Rwanda Market',
  description: 'Conditions générales d\'utilisation de Rwanda Market. Droits et obligations des utilisateurs.',
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24 bg-gray-50 dark:bg-dark-bg min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white dark:bg-dark-card rounded-3xl p-8 md:p-12 shadow-soft border border-gray-100 dark:border-dark-border">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Conditions Générales d&apos;Utilisation
          </h1>

          <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Objet et acceptation</h2>
              <p>
                Les présentes Conditions Générales d&apos;Utilisation (CGU) régissent l&apos;accès et l&apos;utilisation du site web Rwanda Market, disponible à l&apos;adresse rwandamarket.rw. En accédant au site et en passant une commande, vous acceptez sans réserve les présentes CGU. Si vous n&apos;acceptez pas ces conditions, veuillez ne pas utiliser nos services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Utilisation du site</h2>
              <p className="mb-4">En utilisant Rwanda Market, vous vous engagez à :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fournir des informations exactes et à jour lors de vos commandes</li>
                <li>Ne pas utiliser le site à des fins illicites ou frauduleuses</li>
                <li>Ne pas perturber le fonctionnement normal du site</li>
                <li>Respecter les droits de propriété intellectuelle de Rwanda Market</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. Commandes</h2>
              <p className="mb-4">
                Toute commande passée sur notre site constitue un contrat de vente entre vous et Rwanda Market. Une commande est considérée comme confirmée après validation de votre paiement et envoi d&apos;un email ou SMS de confirmation.
              </p>
              <p>
                Rwanda Market se réserve le droit d&apos;annuler toute commande en cas de rupture de stock, d&apos;erreur de prix manifeste, ou de suspicion de fraude. Vous en serez informé dans les meilleurs délais.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Prix et paiements</h2>
              <p className="mb-4">
                Tous les prix affichés sur notre site sont en Francs Rwandais (RWF) et incluent les taxes applicables. Les frais de livraison sont indiqués séparément avant la validation de votre commande.
              </p>
              <p>
                Nous acceptons les paiements par Mobile Money (MTN, Airtel), carte bancaire et espèces à la livraison. Toutes les transactions sont sécurisées.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Responsabilité</h2>
              <p>
                Rwanda Market s&apos;engage à tout mettre en oeuvre pour assurer la disponibilité du site et la qualité de ses services. Cependant, notre responsabilité ne saurait être engagée en cas d&apos;interruption du service due à des causes indépendantes de notre volonté (maintenance, panne technique, force majeure).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Propriété intellectuelle</h2>
              <p>
                L&apos;ensemble des contenus présents sur le site Rwanda Market (textes, images, logos, marques) est protégé par les droits de propriété intellectuelle. Toute reproduction ou utilisation sans autorisation préalable est strictement interdite.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Droit applicable</h2>
              <p>
                Les présentes CGU sont soumises au droit rwandais. En cas de litige, les parties s&apos;engagent à rechercher une solution amiable avant tout recours judiciaire. À défaut, les tribunaux compétents de Kigali seront seuls habilités à connaître du différend.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. Contact</h2>
              <p>
                Pour toute question relative aux présentes CGU, vous pouvez nous contacter à l&apos;adresse suivante : <a href="mailto:legal@rwandamarket.rw" className="text-primary-600 dark:text-primary-400 hover:underline">legal@rwandamarket.rw</a>
              </p>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-dark-border text-sm text-gray-500">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-RW')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

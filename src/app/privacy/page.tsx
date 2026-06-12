import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité | Rwanda Market',
  description: 'Découvrez comment nous protégeons vos données personnelles chez Rwanda Market.',
};

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-24 bg-gray-50 dark:bg-dark-bg min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white dark:bg-dark-card rounded-3xl p-8 md:p-12 shadow-soft border border-gray-100 dark:border-dark-border">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Politique de Confidentialité</h1>
          
          <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Introduction</h2>
              <p>
                Chez Rwanda Market, nous accordons une importance primordiale à la confidentialité et à la sécurité de vos données personnelles. Cette politique de confidentialité explique comment nous recueillons, utilisons et protégeons vos informations lorsque vous utilisez notre site web et nos services au Rwanda.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Collecte des données</h2>
              <p className="mb-4">Nous collectons les informations suivantes lors de votre utilisation de nos services :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Informations d'identification (Nom, Prénom)</li>
                <li>Coordonnées (Adresse e-mail, Numéro de téléphone)</li>
                <li>Informations de livraison (Adresse postale, Ville, Secteur)</li>
                <li>Historique de vos commandes et préférences d'achat</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. Utilisation de vos données</h2>
              <p className="mb-4">Vos données sont utilisées exclusivement pour :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Traiter et expédier vos commandes dans les meilleurs délais</li>
                <li>Communiquer avec vous concernant l'état de vos livraisons</li>
                <li>Améliorer notre service client et personnaliser votre expérience</li>
                <li>Vous envoyer des offres promotionnelles (uniquement si vous y avez consenti)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Sécurité des données</h2>
              <p>
                Toutes vos données sont stockées de manière sécurisée. Nous utilisons des protocoles de cryptage modernes pour garantir que vos informations personnelles et vos coordonnées de paiement par Mobile Money ou carte bancaire sont protégées contre tout accès non autorisé.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Partage des données</h2>
              <p>
                Rwanda Market ne vend ni ne loue vos informations personnelles à des tiers. Nous partageons vos données uniquement avec nos partenaires logistiques strictement dans le but d'assurer la livraison de vos colis.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Vos droits</h2>
              <p>
                Conformément aux lois en vigueur, vous avez le droit de consulter, de modifier ou de supprimer vos données personnelles stockées sur notre plateforme. Pour exercer ce droit, veuillez contacter notre service client à <a href="mailto:contact@rwandamarket.rw" className="text-primary-600 dark:text-primary-400 hover:underline">contact@rwandamarket.rw</a>.
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

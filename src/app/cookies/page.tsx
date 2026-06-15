import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de Cookies | Rwanda Market',
  description: 'Découvrez comment Rwanda Market utilise les cookies pour améliorer votre expérience.',
};

export default function CookiesPage() {
  return (
    <div className="pt-32 pb-24 bg-gray-50 dark:bg-dark-bg min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white dark:bg-dark-card rounded-3xl p-8 md:p-12 shadow-soft border border-gray-100 dark:border-dark-border">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Politique de Cookies</h1>

          <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Qu&apos;est-ce qu&apos;un cookie ?</h2>
              <p>
                Un cookie est un petit fichier texte déposé sur votre appareil (ordinateur, smartphone, tablette) lors de votre visite sur notre site web. Les cookies permettent à Rwanda Market de reconnaître votre navigateur et de mémoriser certaines informations pour améliorer votre expérience d&apos;achat.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Types de cookies utilisés</h2>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-gray-50 dark:bg-dark-bg/50 border border-gray-100 dark:border-dark-border">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Cookies essentiels</h3>
                  <p className="text-sm">
                    Ces cookies sont indispensables au fonctionnement du site. Ils permettent notamment de maintenir votre session active, de gérer votre panier d&apos;achat et d&apos;assurer la sécurité de vos transactions. Ils ne peuvent pas être désactivés.
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Durée de conservation : session ou jusqu&apos;à 1 an</p>
                </div>

                <div className="p-5 rounded-2xl bg-gray-50 dark:bg-dark-bg/50 border border-gray-100 dark:border-dark-border">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Cookies analytiques</h3>
                  <p className="text-sm">
                    Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site en collectant des informations de manière anonyme (pages visitées, temps passé, erreurs rencontrées). Ces données nous permettent d&apos;améliorer continuellement votre expérience.
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Durée de conservation : jusqu&apos;à 2 ans</p>
                </div>

                <div className="p-5 rounded-2xl bg-gray-50 dark:bg-dark-bg/50 border border-gray-100 dark:border-dark-border">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Cookies de préférences</h3>
                  <p className="text-sm">
                    Ces cookies mémorisent vos préférences (langue, devise, thème clair/sombre) afin de personnaliser votre navigation sur notre site.
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Durée de conservation : jusqu&apos;à 1 an</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. Durée de conservation</h2>
              <p>
                Les cookies sont conservés pour une durée variable selon leur type. Les cookies de session expirent dès la fermeture de votre navigateur. Les autres cookies peuvent être conservés pour une période allant jusqu&apos;à 2 ans. Passé ce délai, ils sont automatiquement supprimés.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Gestion de vos cookies</h2>
              <p className="mb-4">
                Vous pouvez contrôler et gérer les cookies de plusieurs façons :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Via les paramètres de votre navigateur (Chrome, Firefox, Safari, Edge), vous pouvez accepter ou refuser les cookies</li>
                <li>En supprimant les cookies déjà déposés depuis les paramètres de votre navigateur</li>
                <li>En utilisant les outils de gestion des cookies disponibles sur notre site</li>
              </ul>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Attention : la désactivation de certains cookies peut affecter le fonctionnement du site et certaines fonctionnalités pourraient ne plus être disponibles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Mise à jour de cette politique</h2>
              <p>
                Rwanda Market se réserve le droit de modifier cette politique de cookies à tout moment. En continuant à utiliser notre site après toute modification, vous acceptez la politique de cookies mise à jour.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Contact</h2>
              <p>
                Pour toute question concernant notre utilisation des cookies, contactez-nous à : <a href="mailto:contact@rwandamarket.rw" className="text-primary-600 dark:text-primary-400 hover:underline">contact@rwandamarket.rw</a>
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

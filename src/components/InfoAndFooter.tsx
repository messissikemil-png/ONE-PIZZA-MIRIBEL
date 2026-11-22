import { useEffect, useState } from 'react';
import { CheckCircle2, Clock, MapPin, Navigation, Phone, X, XCircle } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import type { OpeningStatus } from '../hooks/useOpeningStatus';

interface InfoAndFooterProps {
  openingStatus: OpeningStatus;
}

export function InfoAndFooter({ openingStatus }: InfoAndFooterProps) {
  const [legalModalOpen, setLegalModalOpen] = useState(false);

  useEffect(() => {
    if (!legalModalOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLegalModalOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [legalModalOpen]);

  return (
    <>
      <section id="infos" className="border-t border-white/8 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#FF6B00]">Infos Pratiques &amp; Accès</p>
            <h2
              className="mt-2 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
              style={{ textWrap: 'balance' }}
            >
              Nous trouver à Miribel
            </h2>
            <p className="mt-3 text-base leading-relaxed text-stone-300">
              Situé au centre commercial Carrefour Market, avec parking gratuit juste devant le
              restaurant.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
            {/* Left Info Card */}
            <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#1A1A1E] p-6 sm:p-8 lg:col-span-5">
              <div className="space-y-7">
                {/* Real-time dynamic OPEN / CLOSED badge (paired with icon + explicit text) */}
                <div
                  className={`flex items-start gap-3.5 rounded-xl border p-4 ${
                    openingStatus.isOpen
                      ? 'border-emerald-500/35 bg-emerald-500/10'
                      : 'border-rose-500/35 bg-rose-500/10'
                  }`}
                >
                  {openingStatus.isOpen ? (
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400"
                      aria-hidden="true"
                    />
                  ) : (
                    <XCircle
                      className="mt-0.5 h-5 w-5 shrink-0 text-rose-400"
                      aria-hidden="true"
                    />
                  )}
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`font-display text-base font-bold tracking-wider ${
                          openingStatus.isOpen ? 'text-emerald-300' : 'text-rose-300'
                        }`}
                      >
                        {openingStatus.badgeText}
                      </span>
                      <span aria-hidden="true" className="text-stone-500">
                        ·
                      </span>
                      <span className="font-mono text-xs tabular-nums text-stone-300">
                        Il est {openingStatus.currentTimeLabel}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-stone-200">{openingStatus.detailText}</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#FF6B00]" aria-hidden="true" />
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-wide text-white">
                      ADRESSE
                    </h3>
                    <p className="mt-1 text-sm font-medium text-stone-200">
                      {RESTAURANT_INFO.addressTitle}
                    </p>
                    <p className="text-sm text-stone-400">{RESTAURANT_INFO.addressStreet}</p>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex items-start gap-3.5">
                  <Clock className="mt-1 h-5 w-5 shrink-0 text-[#FF6B00]" aria-hidden="true" />
                  <div className="w-full">
                    <h3 className="font-display text-lg font-semibold tracking-wide text-white">
                      HORAIRES D’OUVERTURE
                    </h3>
                    <p className="mt-1 text-sm text-stone-300">{RESTAURANT_INFO.scheduleDays}</p>
                    <div className="mt-2.5 space-y-1.5 border-t border-white/8 pt-2.5 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-stone-400">Service du midi</span>
                        <span className="font-mono font-semibold tabular-nums text-[#FFCC00]">
                          11:00 - 14:00
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-stone-400">Service du soir</span>
                        <span className="font-mono font-semibold tabular-nums text-[#FFCC00]">
                          17:00 - 22:00
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <Phone className="mt-1 h-5 w-5 shrink-0 text-[#FF6B00]" aria-hidden="true" />
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-wide text-white">
                      TÉLÉPHONE &amp; COMMANDES
                    </h3>
                    <a
                      href={RESTAURANT_INFO.phoneHref}
                      className="mt-1 inline-block font-mono text-xl font-bold tabular-nums text-white transition-colors hover:text-[#FFCC00]"
                    >
                      {RESTAURANT_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row">
                <a
                  href={RESTAURANT_INFO.mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#FF6B00] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#FF8533] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFCC00]"
                >
                  <Navigation className="h-4 w-4" aria-hidden="true" />
                  <span>Y aller (Google Maps)</span>
                </a>
                <a
                  href={RESTAURANT_INFO.phoneHref}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-white/15 bg-[#242429] px-4 py-3 text-sm font-semibold text-white transition-colors hover:border-[#FF6B00] hover:text-[#FFCC00]"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  <span>Appeler</span>
                </a>
              </div>
            </div>

            {/* Right Interactive Map Embed (Standard HTML iframe) */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#1A1A1E] lg:col-span-7">
              <iframe
                title="Carte Google Maps — ONE PIZZA, 50 Rue du Figuier, 01700 Miribel"
                src={RESTAURANT_INFO.mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[360px] w-full border-0 lg:h-full lg:min-h-[460px]"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0E0E10] pb-24 pt-12 md:pb-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-6 border-b border-white/8 pb-8 md:flex-row md:items-center">
            <div>
              <span className="font-display text-2xl font-bold tracking-wider text-white">
                ONE <span className="text-[#FF6B00]">PIZZA</span>
              </span>
              <p className="mt-1 text-sm text-stone-400">
                CC Carrefour Market · 50 Rue du Figuier, 01700 Miribel
              </p>
            </div>

            <nav aria-label="Liens de pied de page" className="flex flex-wrap items-center gap-6 text-sm text-stone-300">
              <a href="#accueil" className="transition-colors hover:text-white">
                Accueil
              </a>
              <a href="#carte" className="transition-colors hover:text-white">
                La Carte
              </a>
              <a href="#galerie" className="transition-colors hover:text-white">
                Galerie
              </a>
              <a href="#infos" className="transition-colors hover:text-white">
                Infos &amp; Accès
              </a>
            </nav>
          </div>

          <div className="mt-6 flex flex-col items-start justify-between gap-4 text-xs text-stone-400 sm:flex-row sm:items-center">
            <p>© 2026 ONE PIZZA. Tous droits réservés.</p>
            <button
              type="button"
              onClick={() => setLegalModalOpen(true)}
              className="cursor-pointer underline decoration-stone-600 underline-offset-4 transition-colors hover:text-white hover:decoration-[#FF6B00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
            >
              Mentions Légales
            </button>
          </div>
        </div>
      </footer>

      {/* Mentions Légales Modal */}
      {legalModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
          onClick={() => setLegalModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-white/15 bg-[#18181D] p-6 sm:p-8"
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="text-xs font-semibold text-[#FF6B00]">Informations réglementaires</p>
                <h3 id="legal-modal-title" className="mt-1 font-display text-2xl font-bold text-white">
                  Mentions Légales
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setLegalModalOpen(false)}
                aria-label="Fermer les mentions légales"
                className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-white/10 text-stone-300 transition-colors hover:border-[#FF6B00] hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 space-y-5 text-sm leading-relaxed text-stone-300">
              <div>
                <h4 className="font-semibold text-white">1. Éditeur du site</h4>
                <p className="mt-1">
                  <strong className="text-stone-100">ONE PIZZA</strong> — Restauration rapide sur
                  place, à emporter et en livraison.
                  <br />
                  Adresse : CC Carrefour Market, 50 Rue du Figuier, 01700 Miribel, France.
                  <br />
                  Téléphone : 09 80 95 98 07
                  <br />
                  Directeur de la publication : La Direction — ONE PIZZA Miribel.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white">2. Hébergement</h4>
                <p className="mt-1">
                  Ce site vitrine est hébergé sur une infrastructure cloud sécurisée garantissant la
                  disponibilité et l’intégrité des contenus publiés.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white">3. Propriété intellectuelle</h4>
                <p className="mt-1">
                  L’ensemble des éléments présents sur ce site (textes, visuels, photographies de
                  plats, logo ONE PIZZA et mise en page) est protégé par le droit d’auteur. Toute
                  reproduction sans autorisation préalable est interdite.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white">4. Données personnelles &amp; cookies</h4>
                <p className="mt-1">
                  Ce site vitrine ne collecte aucune donnée personnelle via formulaire et ne dépose
                  aucun cookie publicitaire. L’affichage de la carte interactive Google Maps peut
                  soumettre votre adresse IP aux services de Google selon leurs conditions
                  d’utilisation.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white">5. Tarifs &amp; allergènes</h4>
                <p className="mt-1">
                  Les prix affichés s’entendent toutes taxes comprises (TTC) en euros et sont
                  susceptibles d’évoluer. Pour toute information sur les allergènes présents dans
                  nos préparations, veuillez contacter directement le restaurant au{' '}
                  <a href={RESTAURANT_INFO.phoneHref} className="text-[#FFCC00] hover:underline">
                    09 80 95 98 07
                  </a>
                  .
                </p>
              </div>
            </div>

            <div className="mt-7 flex justify-end border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={() => setLegalModalOpen(false)}
                className="cursor-pointer rounded-lg bg-[#FF6B00] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#FF8533]"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

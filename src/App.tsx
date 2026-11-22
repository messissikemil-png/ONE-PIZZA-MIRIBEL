import { ArrowDown, CheckCircle2, Clock, MapPin, Phone, XCircle } from 'lucide-react';
import { GallerySection } from './components/GallerySection';
import { InfoAndFooter } from './components/InfoAndFooter';
import { MenuSection } from './components/MenuSection';
import { Navbar } from './components/Navbar';
import { RESTAURANT_INFO } from './data/menuData';
import { useOpeningStatus } from './hooks/useOpeningStatus';

export default function App() {
  const openingStatus = useOpeningStatus();

  return (
    <div className="bg-brick-texture min-h-screen text-[#F5F5F4]">
      <Navbar />

      <main>
        {/* 1. HERO SECTION (ACCUEIL) */}
        <section
          id="accueil"
          className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24"
        >
          {/* Ambient wood-fired pizza backdrop with measured contrast scrim */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <img
              src="/assets/aistudio/PIZZA_8badf670.webp"
              alt=""
              referrerPolicy="no-referrer"
              className="h-full w-full scale-110 object-cover object-[50%_72%] opacity-20 blur-[2px]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/90 via-[#121212]/80 to-[#121212]" />
            <div
              className="absolute -top-24 left-1/2 h-96 w-[44rem] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
              style={{
                background:
                  'radial-gradient(circle, rgba(255,107,0,0.65) 0%, rgba(232,121,249,0.22) 55%, transparent 75%)',
              }}
            />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
              {/* Hero Copy */}
              <div className="flex flex-col justify-center lg:col-span-7">
                {/* Real-time opening status text line */}
                <div className="flex flex-wrap items-center gap-2 text-sm text-stone-200">
                  {openingStatus.isOpen ? (
                    <CheckCircle2
                      className="h-4 w-4 shrink-0 text-emerald-400"
                      aria-hidden="true"
                    />
                  ) : (
                    <XCircle className="h-4 w-4 shrink-0 text-rose-400" aria-hidden="true" />
                  )}
                  <span
                    className={`font-semibold ${
                      openingStatus.isOpen ? 'text-emerald-300' : 'text-rose-300'
                    }`}
                  >
                    {openingStatus.badgeText}
                  </span>
                  <span aria-hidden="true" className="text-stone-500">
                    ·
                  </span>
                  <span className="text-stone-300">{openingStatus.detailText}</span>
                </div>

                <h1
                  className="mt-5 font-display text-5xl leading-[0.95] font-bold tracking-tight text-white sm:text-6xl lg:text-[5.25rem]"
                  style={{ textWrap: 'balance' }}
                >
                  ONE <span className="text-[#FF6B00]">PIZZA</span>
                </h1>

                <p
                  className="mt-4 font-display text-2xl font-semibold tracking-wide text-[#FFCC00] sm:text-3xl"
                  style={{ textWrap: 'balance' }}
                >
                  {RESTAURANT_INFO.slogan}
                </p>

                <p className="mt-5 max-w-xl text-base leading-relaxed text-stone-300 sm:text-lg">
                  Pizzas artisanales à la pâte faite maison, burgers préparés avec de la viande de
                  chez le boucher, tacos gratinés au four et One Crousty — fraîchement préparés
                  chaque jour à Miribel.
                </p>

                {/* Primary & Secondary Action Buttons */}
                <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
                  <a
                    href="#carte"
                    className="ember-glow inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-xl bg-[#FF6B00] px-7 py-4 text-base font-bold text-white transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#FF8533] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFCC00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212]"
                  >
                    <span>Voir la carte</span>
                    <ArrowDown className="h-4 w-4" aria-hidden="true" />
                  </a>

                  <a
                    href={RESTAURANT_INFO.phoneHref}
                    className="inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-xl border border-white/15 bg-[#1A1A1E]/90 px-6 py-4 text-base font-semibold text-white transition-colors duration-150 hover:border-[#FFCC00]/60 hover:text-[#FFCC00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFCC00]"
                  >
                    <Phone className="h-4 w-4 text-[#FF6B00]" aria-hidden="true" />
                    <span>
                      Nous appeler{' '}
                      <span className="font-mono tabular-nums">
                        ({RESTAURANT_INFO.phoneDisplay})
                      </span>
                    </span>
                  </a>
                </div>
              </div>

              {/* Hero Visual Showcase Frame */}
              <div className="lg:col-span-5">
                <div className="neon-street-ring relative h-full min-h-[300px] overflow-hidden rounded-2xl bg-[#1A1A1E] sm:min-h-[360px]">
                  <img
                    src="/assets/aistudio/PIZZA_8badf670.webp"
                    alt="Pizza artisanale au four ONE PIZZA à Miribel, pâte faite maison dorée et fromage fondant servie sur planche en bois."
                    referrerPolicy="no-referrer"
                    className="h-full w-full scale-125 object-cover object-[50%_72%]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/20 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-xs font-semibold tracking-wider text-[#38BDF8]">
                      MIRIBEL · CC CARREFOUR MARKET
                    </p>
                    <p className="mt-1 font-display text-2xl font-bold tracking-wide text-white">
                      Pâte pétrie maison &amp; garnitures généreuses
                    </p>
                    <p className="mt-1 font-mono text-xs tabular-nums text-[#FFCC00]">
                      Pizzas dès 7,00 € · Burgers dès 6,00 € · Tacos dès 7,00 €
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 4-Column Full-Width Practical Strip below Hero */}
            <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-[#16161A] px-5 py-4">
                <p className="text-xs font-medium text-stone-400">Artisanat</p>
                <p className="mt-1 font-display text-lg font-semibold tracking-wide text-white">
                  Pâte faite maison
                </p>
              </div>
              <div className="bg-[#16161A] px-5 py-4">
                <p className="text-xs font-medium text-stone-400">Qualité Burgers</p>
                <p className="mt-1 font-display text-lg font-semibold tracking-wide text-white">
                  Viande de chez le boucher
                </p>
              </div>
              <div className="bg-[#16161A] px-5 py-4">
                <p className="flex items-center gap-1.5 text-xs font-medium text-stone-400">
                  <Clock className="h-3.5 w-3.5 text-[#FF6B00]" aria-hidden="true" />
                  <span>Ouvert 7j/7</span>
                </p>
                <p className="mt-1 font-mono text-sm font-semibold tabular-nums text-[#FFCC00]">
                  {RESTAURANT_INFO.hoursDisplay}
                </p>
              </div>
              <div className="bg-[#16161A] px-5 py-4">
                <p className="flex items-center gap-1.5 text-xs font-medium text-stone-400">
                  <MapPin className="h-3.5 w-3.5 text-[#FF6B00]" aria-hidden="true" />
                  <span>Miribel (01700)</span>
                </p>
                <p className="mt-1 text-sm font-semibold text-white">50 Rue du Figuier</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. LA CARTE / LE MENU */}
        <MenuSection />

        {/* 3. GALERIE PHOTOS */}
        <GallerySection />

        {/* 4 & 5. INFOS PRATIQUES, CARTE & FOOTER */}
        <InfoAndFooter openingStatus={openingStatus} />
      </main>

      {/* Permanent Mobile Floating Call CTA (compact height respecting <=15% sticky budget) */}
      <div className="fixed inset-x-3 bottom-3 z-40 md:hidden">
        <a
          href={RESTAURANT_INFO.phoneHref}
          className="ember-glow flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B00] px-4 text-sm font-bold text-white shadow-lg transition-colors active:bg-[#FF8533]"
        >
          <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="truncate">
            Appeler pour commander ({RESTAURANT_INFO.phoneDisplay})
          </span>
        </a>
      </div>
    </div>
  );
}

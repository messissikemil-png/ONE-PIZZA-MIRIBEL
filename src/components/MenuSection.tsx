import { useMemo, useState } from 'react';
import { Phone, Search, Sparkles, X } from 'lucide-react';
import {
  BOISSONS,
  BURGERS,
  DESSERTS,
  FINGER_FOOD,
  PIZZAS_CREME,
  PIZZAS_TOMATE,
  RESTAURANT_INFO,
  TACOS,
  TACOS_MEATS,
  TACOS_SAUCES,
  TACOS_SUPPLEMENTS,
  type MenuItem,
} from '../data/menuData';

type CategoryTab = 'pizzas' | 'burgers' | 'tacos' | 'extras';
type PizzaBaseFilter = 'all' | 'tomate' | 'creme';

const CATEGORY_TABS: { id: CategoryTab; label: string; count: string }[] = [
  { id: 'pizzas', label: 'Pizzas', count: '28' },
  { id: 'burgers', label: 'Burgers', count: '9' },
  { id: 'tacos', label: 'Tacos', count: '8' },
  { id: 'extras', label: 'Finger Food & Boissons', count: '11' },
];

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function MenuItemRow({ item }: { item: MenuItem }) {
  return (
    <article className="group flex flex-col justify-between gap-2 rounded-xl border border-white/8 bg-[#1A1A1E] p-5 transition-all duration-150 hover:-translate-y-0.5 hover:border-[#FF6B00]/45 hover:bg-[#1E1E24]">
      <div className="flex items-baseline justify-between gap-4">
        <div className="flex flex-wrap items-baseline gap-2.5">
          <h4 className="font-display text-lg font-semibold tracking-wide text-white transition-colors group-hover:text-[#FFCC00]">
            {item.name}
          </h4>
          {item.highlight && (
            <span className="text-xs font-medium text-[#FF6B00]">· {item.highlight}</span>
          )}
        </div>
        <span className="shrink-0 font-mono text-base font-bold tabular-nums text-[#FFCC00]">
          {item.price}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-stone-300">{item.description}</p>
    </article>
  );
}

export function MenuSection() {
  const [activeTab, setActiveTab] = useState<CategoryTab>('pizzas');
  const [pizzaBase, setPizzaBase] = useState<PizzaBaseFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const normalizedQuery = normalizeText(searchQuery.trim());

  const filterList = (items: MenuItem[]) => {
    if (!normalizedQuery) return items;
    return items.filter(
      (item) =>
        normalizeText(item.name).includes(normalizedQuery) ||
        normalizeText(item.description).includes(normalizedQuery)
    );
  };

  const filteredTomate = useMemo(
    () => filterList(PIZZAS_TOMATE),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [normalizedQuery]
  );
  const filteredCreme = useMemo(
    () => filterList(PIZZAS_CREME),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [normalizedQuery]
  );
  const filteredBurgers = useMemo(
    () => filterList(BURGERS),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [normalizedQuery]
  );
  const filteredTacos = useMemo(
    () => filterList(TACOS),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [normalizedQuery]
  );
  const filteredDesserts = useMemo(
    () => filterList(DESSERTS),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [normalizedQuery]
  );
  const filteredBoissons = useMemo(
    () => filterList(BOISSONS),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [normalizedQuery]
  );
  const filteredFingerFood = useMemo(() => {
    if (!normalizedQuery) return FINGER_FOOD;
    return FINGER_FOOD.filter((item) => normalizeText(item.name).includes(normalizedQuery));
  }, [normalizedQuery]);

  const showCrousty =
    !normalizedQuery ||
    normalizeText('one crousty riz tenders escalope marinee nouveaute').includes(normalizedQuery);

  const hasPizzaResults =
    (pizzaBase !== 'creme' && filteredTomate.length > 0) ||
    (pizzaBase !== 'tomate' && filteredCreme.length > 0);

  const hasExtrasResults =
    showCrousty ||
    filteredFingerFood.length > 0 ||
    filteredDesserts.length > 0 ||
    filteredBoissons.length > 0;

  return (
    <section id="carte" className="relative border-t border-white/8 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Heading */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#FF6B00]">La Carte ONE PIZZA · Miribel</p>
            <h2
              className="mt-2 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
              style={{ textWrap: 'balance' }}
            >
              Pizzas pâte maison, burgers du boucher &amp; tacos gratinés
            </h2>
            <p className="mt-3 text-base leading-relaxed text-stone-300">
              Préparés à la commande chaque midi et soir. Choisissez une catégorie ou filtrez par
              ingrédient.
            </p>
          </div>

          {/* Search input */}
          <div className="relative w-full md:w-72">
            <Search
              className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-stone-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher (chèvre, saumon...)"
              aria-label="Rechercher un plat ou un ingrédient dans la catégorie active"
              className="h-11 w-full rounded-lg border border-white/12 bg-[#1A1A1E] pr-9 pl-10 text-sm text-white placeholder:text-stone-400 transition-colors focus:border-[#FF6B00] focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Effacer la recherche"
                className="absolute top-1/2 right-2.5 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded text-stone-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Catégories de la carte"
          className="mt-10 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]"
        >
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                type="button"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg px-5 py-3 text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFCC00] ${
                  isActive
                    ? 'bg-[#FF6B00] text-white ember-glow'
                    : 'border border-white/10 bg-[#1A1A1E] text-stone-300 hover:border-white/25 hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`font-mono text-xs tabular-nums ${
                    isActive ? 'text-white/85' : 'text-stone-400'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: PIZZAS */}
        {activeTab === 'pizzas' && (
          <div id="panel-pizzas" role="tabpanel" aria-labelledby="tab-pizzas" className="mt-8">
            <div className="flex flex-col justify-between gap-4 border-y border-white/10 py-4 sm:flex-row sm:items-center">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-stone-200">
                <span className="font-semibold text-white">Pâte faite maison</span>
                <span aria-hidden="true" className="text-stone-500">
                  ·
                </span>
                <span>
                  MENU <strong className="font-mono tabular-nums text-[#FFCC00]">+2,50 €</strong>
                </span>
                <span aria-hidden="true" className="text-stone-500">
                  ·
                </span>
                <span>
                  MAXI <strong className="font-mono tabular-nums text-[#FFCC00]">+4,00 €</strong>
                </span>
              </div>

              <div className="flex items-center gap-1 self-start rounded-lg bg-[#1A1A1E] p-1 sm:self-auto">
                {(
                  [
                    { id: 'all', label: 'Toutes (28)' },
                    { id: 'tomate', label: 'Base Tomate (17)' },
                    { id: 'creme', label: 'Base Crème (11)' },
                  ] as const
                ).map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setPizzaBase(option.id)}
                    className={`cursor-pointer whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                      pizzaBase === option.id
                        ? 'bg-[#2A2A32] text-white'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {!hasPizzaResults ? (
              <div className="mt-10 rounded-xl border border-white/10 bg-[#1A1A1E] p-10 text-center">
                <p className="text-base text-stone-300">
                  Aucune pizza ne correspond à « {searchQuery} ».
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setPizzaBase('all');
                  }}
                  className="mt-4 rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-white hover:border-[#FF6B00] hover:text-[#FF6B00]"
                >
                  Afficher toutes les pizzas
                </button>
              </div>
            ) : (
              <div className="mt-10 space-y-12">
                {pizzaBase !== 'creme' && filteredTomate.length > 0 && (
                  <div>
                    <div className="mb-6 flex items-baseline justify-between border-b border-white/10 pb-3">
                      <h3 className="font-display text-2xl font-bold tracking-wide text-white">
                        BASE TOMATE
                      </h3>
                      <span className="font-mono text-xs tabular-nums text-stone-400">
                        {filteredTomate.length} recettes
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {filteredTomate.map((pizza) => (
                        <MenuItemRow key={pizza.id} item={pizza} />
                      ))}
                    </div>
                  </div>
                )}

                {pizzaBase !== 'tomate' && filteredCreme.length > 0 && (
                  <div>
                    <div className="mb-6 flex items-baseline justify-between border-b border-white/10 pb-3">
                      <h3 className="font-display text-2xl font-bold tracking-wide text-white">
                        BASE CRÈME
                      </h3>
                      <span className="font-mono text-xs tabular-nums text-stone-400">
                        {filteredCreme.length} recettes
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {filteredCreme.map((pizza) => (
                        <MenuItemRow key={pizza.id} item={pizza} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: BURGERS */}
        {activeTab === 'burgers' && (
          <div id="panel-burgers" role="tabpanel" aria-labelledby="tab-burgers" className="mt-8">
            <div className="flex flex-col justify-between gap-4 border-y border-white/10 py-4 md:flex-row md:items-center">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-stone-200">
                <span className="font-semibold text-white">Steak de 90g</span>
                <span aria-hidden="true" className="text-stone-500">
                  ·
                </span>
                <span>Viande hachée et escalope de poulet de chez LE BOUCHER</span>
                <span aria-hidden="true" className="text-stone-500">
                  ·
                </span>
                <span>
                  MENU <strong className="font-mono tabular-nums text-[#FFCC00]">+2,50 €</strong>
                </span>
              </div>

              <div className="inline-flex shrink-0 items-center gap-2.5 self-start rounded-lg border border-[#FFCC00]/40 bg-[#FFCC00]/10 px-4 py-2 text-sm font-semibold text-[#FFCC00] md:self-auto">
                <span className="font-display tracking-wide">MENU KIDS</span>
                <span aria-hidden="true" className="text-[#FFCC00]/50">
                  ·
                </span>
                <span className="font-mono tabular-nums text-white">6,00 €</span>
              </div>
            </div>

            {filteredBurgers.length === 0 ? (
              <div className="mt-10 rounded-xl border border-white/10 bg-[#1A1A1E] p-10 text-center">
                <p className="text-base text-stone-300">
                  Aucun burger ne correspond à « {searchQuery} ».
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="mt-4 rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-white hover:border-[#FF6B00] hover:text-[#FF6B00]"
                >
                  Réinitialiser la recherche
                </button>
              </div>
            ) : (
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredBurgers.map((burger) => (
                  <MenuItemRow key={burger.id} item={burger} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: TACOS */}
        {activeTab === 'tacos' && (
          <div id="panel-tacos" role="tabpanel" aria-labelledby="tab-tacos" className="mt-8">
            <div className="flex flex-col justify-between gap-2 border-y border-white/10 py-4 md:flex-row md:items-center">
              <p className="text-sm text-stone-200">
                <strong className="text-white">Tous nos Tacos contiennent :</strong> Crudités,
                frites et sauce gruyère.
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-stone-200">
                <span>
                  MAXI <strong className="font-mono tabular-nums text-[#FFCC00]">+4,00 €</strong>
                </span>
                <span aria-hidden="true" className="text-stone-500">
                  ·
                </span>
                <span>
                  MENU <strong className="font-mono tabular-nums text-[#FFCC00]">+2,50 €</strong>
                </span>
              </div>
            </div>

            {filteredTacos.length === 0 ? (
              <div className="mt-10 rounded-xl border border-white/10 bg-[#1A1A1E] p-10 text-center">
                <p className="text-base text-stone-300">
                  Aucun tacos ne correspond à « {searchQuery} ».
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="mt-4 rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-white hover:border-[#FF6B00] hover:text-[#FF6B00]"
                >
                  Réinitialiser la recherche
                </button>
              </div>
            ) : (
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {filteredTacos.map((tacos) => (
                  <MenuItemRow key={tacos.id} item={tacos} />
                ))}
              </div>
            )}

            {/* Composition & Customization Guide */}
            <div className="mt-10 grid grid-cols-1 gap-8 rounded-xl border border-white/10 bg-[#1A1A1E] p-6 md:grid-cols-3 md:divide-x md:divide-white/10">
              <div>
                <h3 className="font-display text-lg font-semibold tracking-wide text-[#FF6B00]">
                  VIANDES AU CHOIX
                </h3>
                <p className="mt-3 text-sm leading-7 text-stone-200">
                  {TACOS_MEATS.join(' · ')}
                </p>
              </div>

              <div className="md:pl-8">
                <h3 className="font-display text-lg font-semibold tracking-wide text-[#FF6B00]">
                  SAUCES AU CHOIX
                </h3>
                <p className="mt-3 text-sm leading-7 text-stone-200">
                  {TACOS_SAUCES.join(' · ')}
                </p>
              </div>

              <div className="md:pl-8">
                <h3 className="font-display text-lg font-semibold tracking-wide text-[#FF6B00]">
                  SUPPLÉMENTS
                </h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {TACOS_SUPPLEMENTS.map((sup) => (
                    <li key={sup.name} className="flex items-center justify-between text-stone-200">
                      <span>{sup.name}</span>
                      <span className="font-mono font-semibold tabular-nums text-[#FFCC00]">
                        +{sup.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FINGER FOOD, DESSERTS & BOISSONS */}
        {activeTab === 'extras' && (
          <div id="panel-extras" role="tabpanel" aria-labelledby="tab-extras" className="mt-8">
            {!hasExtrasResults ? (
              <div className="mt-10 rounded-xl border border-white/10 bg-[#1A1A1E] p-10 text-center">
                <p className="text-base text-stone-300">
                  Aucun produit ne correspond à « {searchQuery} ».
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="mt-4 rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-white hover:border-[#FF6B00] hover:text-[#FF6B00]"
                >
                  Réinitialiser la recherche
                </button>
              </div>
            ) : (
              <div className="space-y-12">
                {/* Spotlight: NOUVEAUTÉ ONE CROUSTY */}
                {showCrousty && (
                  <div className="neon-street-ring overflow-hidden rounded-2xl bg-[#18181D]">
                    <div className="grid grid-cols-1 items-stretch md:grid-cols-12">
                      <div className="relative min-h-[220px] overflow-hidden bg-[#121212] md:col-span-5">
                        <img
                          src="/assets/aistudio/carte_4_863ddd91.webp"
                          alt="Nouveauté ONE CROUSTY chez ONE PIZZA Miribel : barquette gourmande de riz parfumé avec tenders croustillants ou escalope marinée et sauce."
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover object-top"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-[#18181D] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#18181D]"
                        />
                      </div>
                      <div className="flex flex-col justify-center p-6 sm:p-8 md:col-span-7">
                        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#38BDF8]">
                          <Sparkles className="h-4 w-4 text-[#E879F9]" aria-hidden="true" />
                          <span>NOUVEAUTÉ À LA CARTE</span>
                        </div>
                        <h3 className="mt-2 font-display text-3xl font-bold tracking-wide text-white sm:text-4xl">
                          ONE CROUSTY
                        </h3>
                        <p className="mt-3 text-base leading-relaxed text-stone-200">
                          Riz tenders ou escalope marinée — généreusement nappé de sauce crémeuse
                          et parsemé d’oignons frits croustillants.
                        </p>
                        <div className="mt-6 flex flex-wrap items-center gap-4">
                          <a
                            href={RESTAURANT_INFO.phoneHref}
                            className="inline-flex items-center gap-2 rounded-lg bg-[#FF6B00] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#FF8533]"
                          >
                            <Phone className="h-4 w-4" aria-hidden="true" />
                            <span>Commander par téléphone</span>
                          </a>
                          <span className="text-xs text-stone-400">
                            Disponible midi &amp; soir à Miribel
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Finger Food */}
                {filteredFingerFood.length > 0 && (
                  <div>
                    <div className="mb-6 flex items-baseline justify-between border-b border-white/10 pb-3">
                      <h3 className="font-display text-2xl font-bold tracking-wide text-white">
                        FINGER FOOD
                      </h3>
                      <span className="text-xs text-stone-400">À partager ou en accompagnement</span>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      {filteredFingerFood.map((item) => (
                        <article
                          key={item.id}
                          className="rounded-xl border border-white/8 bg-[#1A1A1E] p-5"
                        >
                          <h4 className="font-display text-xl font-bold tracking-wide text-white">
                            {item.name}
                          </h4>
                          <ul className="mt-4 divide-y divide-white/8">
                            {item.tiers.map((tier) => (
                              <li
                                key={tier.label}
                                className="flex items-center justify-between py-2.5 text-sm"
                              >
                                <span className="text-stone-300">{tier.label}</span>
                                <span className="font-mono font-bold tabular-nums text-[#FFCC00]">
                                  {tier.price}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </article>
                      ))}
                    </div>
                  </div>
                )}

                {/* Desserts & Boissons Side by Side */}
                {(filteredDesserts.length > 0 || filteredBoissons.length > 0) && (
                  <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                    {filteredDesserts.length > 0 && (
                      <div>
                        <div className="mb-6 flex items-baseline justify-between border-b border-white/10 pb-3">
                          <h3 className="font-display text-2xl font-bold tracking-wide text-white">
                            DESSERTS
                          </h3>
                          <span className="font-mono text-xs tabular-nums text-stone-400">
                            {filteredDesserts.length} choix
                          </span>
                        </div>
                        <div className="space-y-3">
                          {filteredDesserts.map((dessert) => (
                            <MenuItemRow key={dessert.id} item={dessert} />
                          ))}
                        </div>
                      </div>
                    )}

                    {filteredBoissons.length > 0 && (
                      <div>
                        <div className="mb-6 flex items-baseline justify-between border-b border-white/10 pb-3">
                          <h3 className="font-display text-2xl font-bold tracking-wide text-white">
                            BOISSONS
                          </h3>
                          <span className="font-mono text-xs tabular-nums text-stone-400">
                            {filteredBoissons.length} formats
                          </span>
                        </div>
                        <div className="space-y-3">
                          {filteredBoissons.map((drink) => (
                            <MenuItemRow key={drink.id} item={drink} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

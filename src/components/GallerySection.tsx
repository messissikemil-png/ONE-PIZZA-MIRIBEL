import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { GALLERY_PHOTOS } from '../data/menuData';

export function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedIndex(null);
      } else if (event.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % GALLERY_PHOTOS.length));
      } else if (event.key === 'ArrowLeft') {
        setSelectedIndex((prev) =>
          prev === null ? null : (prev - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedIndex]);

  const activePhoto = selectedIndex !== null ? GALLERY_PHOTOS[selectedIndex] : null;

  return (
    <section id="galerie" className="border-t border-white/8 bg-[#151518] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#FF6B00]">Galerie Gourmande</p>
            <h2
              className="mt-2 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
              style={{ textWrap: 'balance' }}
            >
              Sortis du four, servis bien chauds
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-stone-400">
            Photos authentiques réalisées dans notre cuisine à Miribel. Cliquez sur une image pour
            l’agrandir.
          </p>
        </div>

        {/* 4-Card Responsive Gallery Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {GALLERY_PHOTOS.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#1A1A1E] text-left transition-transform duration-200 hover:-translate-y-1 hover:border-[#FF6B00]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFCC00]"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#121212]">
                {failedImages[photo.id] ? (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#1A1A1E] to-[#121212] p-6 text-center">
                    <span className="font-display text-xl font-bold text-[#FF6B00]">ONE PIZZA</span>
                    <span className="mt-2 text-sm text-stone-300">{photo.title}</span>
                  </div>
                ) : (
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setFailedImages((prev) => ({ ...prev, [photo.id]: true }))
                    }
                    className={`h-full w-full transition-transform duration-300 group-hover:scale-110 ${
                      photo.imgClassName ?? 'object-cover object-center'
                    }`}
                  />
                )}

                {/* Measured contrast scrim */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/25 to-transparent"
                />

                {/* Expand affordance */}
                <span
                  aria-hidden="true"
                  className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-[#121212]/70 text-stone-200 opacity-0 backdrop-blur-sm transition-opacity duration-150 group-hover:opacity-100"
                >
                  <Expand className="h-4 w-4" />
                </span>

                {/* Caption overlay */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-xs font-medium text-[#FFCC00]">{photo.category}</p>
                  <h3 className="mt-1 font-display text-2xl font-bold tracking-wide text-white">
                    {photo.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-stone-300">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Authentic Kitchen Craft Strip */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-[#1A1A1E]">
          <div className="grid grid-cols-1 items-stretch lg:grid-cols-12">
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:col-span-7">
              <p className="text-xs font-semibold tracking-wider text-[#38BDF8]">
                SAVOIR-FAIRE · MIRIBEL
              </p>
              <h3 className="mt-2 font-display text-3xl font-bold tracking-wide text-white">
                Pâte fraîche façonnée chaque jour, garnitures sélectionnées
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-stone-300">
                Pâtons maturés et étalés sur plan de travail, légumes frais tranchés chaque matin,
                viandes hachées et escalopes issues de chez le boucher : chaque commande est
                préparée minute pour garantir chaleur et croustillant jusqu’à votre table.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-5 text-sm text-stone-200">
                <span>Pâte faite maison</span>
                <span aria-hidden="true" className="text-stone-600">
                  ·
                </span>
                <span>Viande du boucher</span>
                <span aria-hidden="true" className="text-stone-600">
                  ·
                </span>
                <span>Sur place, à emporter &amp; livraison</span>
              </div>
            </div>
            <div className="relative min-h-[240px] bg-[#121212] lg:col-span-5">
              <img
                src="/assets/aistudio/carte_6_7231efc1.webp"
                alt="Dans les coulisses de ONE PIZZA Miribel : pâtons faits maison, légumes frais préparés et pizzas tout juste sorties du four."
                loading="lazy"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      {activePhoto && selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Aperçu agrandi : ${activePhoto.title}`}
          onClick={() => setSelectedIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#16161A]"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <p className="text-xs text-[#FFCC00]">{activePhoto.category}</p>
                <h3 className="font-display text-xl font-bold text-white">{activePhoto.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedIndex(null)}
                aria-label="Fermer l'aperçu"
                className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-white/10 text-stone-300 transition-colors hover:border-[#FF6B00] hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative flex max-h-[68vh] items-center justify-center overflow-hidden bg-[#0E0E10]">
              <img
                src={activePhoto.src}
                alt={activePhoto.alt}
                referrerPolicy="no-referrer"
                className="max-h-[68vh] w-full object-contain"
              />

              <button
                type="button"
                onClick={() =>
                  setSelectedIndex(
                    (selectedIndex - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length
                  )
                }
                aria-label="Photo précédente"
                className="absolute top-1/2 left-3 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg border border-white/15 bg-black/65 text-white transition-colors hover:border-[#FF6B00] hover:bg-black/85"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setSelectedIndex((selectedIndex + 1) % GALLERY_PHOTOS.length)}
                aria-label="Photo suivante"
                className="absolute top-1/2 right-3 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg border border-white/15 bg-black/65 text-white transition-colors hover:border-[#FF6B00] hover:bg-black/85"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-white/10 px-5 py-3.5 text-sm text-stone-300">
              <p>{activePhoto.caption}</p>
              <span className="shrink-0 font-mono text-xs tabular-nums text-stone-400">
                {selectedIndex + 1} / {GALLERY_PHOTOS.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

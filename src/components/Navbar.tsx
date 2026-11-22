import React, { useEffect, useRef, useState } from 'react';
import { Menu, Phone, X, Volume2, VolumeX, Download } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

const NAV_LINKS = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#carte', label: 'Carte' },
  { href: '#galerie', label: 'Galerie' },
  { href: '#infos', label: 'Infos' },
] as const;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showIosGuide, setShowIosGuide] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasAutoPlayedRef = useRef(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        setShowIosGuide(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    const audio = new Audio('/assets/aistudio/ambiance.mp3');
    audio.loop = false;
    audio.volume = 0.35;
    audio.onended = () => setIsPlaying(false);
    audioRef.current = audio;

    const removeStartListeners = () => {
      window.removeEventListener('touchstart', tryStartMusic);
      window.removeEventListener('pointerdown', tryStartMusic);
      window.removeEventListener('click', tryStartMusic);
      window.removeEventListener('keydown', tryStartMusic);
    };

    const tryStartMusic = () => {
      if (hasAutoPlayedRef.current || !audioRef.current) return;
      audioRef.current
        .play()
        .then(() => {
          hasAutoPlayedRef.current = true;
          setIsPlaying(true);
          removeStartListeners();
        })
        .catch(() => {});
    };

    // Tentative immédiate à l'ouverture (fonctionne sur PC si autorisé)
    tryStartMusic();

    // Déclenchement dès le premier effleurement d'écran sur mobile
    window.addEventListener('touchstart', tryStartMusic, { passive: true });
    window.addEventListener('pointerdown', tryStartMusic, { passive: true });
    window.addEventListener('click', tryStartMusic);
    window.addEventListener('keydown', tryStartMusic);

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      removeStartListeners();
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      audio.pause();
    };
  }, []);

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    hasAutoPlayedRef.current = true;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleInstallClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setMobileOpen(false);
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
    } else {
      setShowIosGuide(true);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#121212]/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-16">
          {/* Zone 1: Logo */}
          <a
            href="#accueil"
            className="flex shrink-0 items-center gap-2.5 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
            aria-label="ONE PIZZA - Retour à l'accueil"
          >
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-md border border-[#FF6B00]/50 bg-[#FF6B00]/10"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                <path
                  d="M3.5 5.5L20.5 5.5L12 20L3.5 5.5Z"
                  stroke="#FFCC00"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <circle cx="10.2" cy="9.8" r="1.2" fill="#FF6B00" />
                <circle cx="14" cy="10.8" r="1.2" fill="#FF6B00" />
                <circle cx="12" cy="14.2" r="1.1" fill="#FF6B00" />
              </svg>
            </span>
            <span className="font-display text-xl font-bold tracking-wider text-white sm:text-2xl">
              ONE <span className="text-[#FF6B00]">PIZZA</span>
            </span>
          </a>

          {/* Zone 2: Navigation Desktop */}
          <nav aria-label="Navigation principale" className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative shrink-0 whitespace-nowrap py-1 text-sm font-medium text-stone-300 transition-colors hover:text-white"
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-[#FF6B00] transition-transform duration-200 group-hover:scale-x-100"
                />
              </a>
            ))}

            <button
              type="button"
              onClick={toggleMusic}
              aria-label="Musique d'ambiance"
              className="rounded-full p-2 text-stone-300 transition-colors hover:bg-white/5 hover:text-[#FF6B00]"
              title={isPlaying ? 'Couper la musique' : 'Activer la musique'}
            >
              {isPlaying ? <Volume2 className="h-4 w-4 text-[#FF6B00]" /> : <VolumeX className="h-4 w-4" />}
            </button>

            <button
              type="button"
              onClick={handleInstallClick}
              className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/20"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Installer</span>
            </button>
          </nav>

          {/* Zone 3: CTA + Boutons rapides Mobile */}
          <div className="flex shrink-0 items-center gap-2">
            {/* Bouton musique visible directement sur mobile */}
            <button
              type="button"
              onClick={toggleMusic}
              aria-label="Musique d'ambiance"
              className="rounded-full p-2 text-stone-300 transition-colors hover:bg-white/5 hover:text-[#FF6B00] md:hidden"
            >
              {isPlaying ? <Volume2 className="h-4 w-4 text-[#FF6B00]" /> : <VolumeX className="h-4 w-4" />}
            </button>

            {/* Bouton Installer visible directement sur mobile */}
            <button
              type="button"
              onClick={handleInstallClick}
              className="flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/20 md:hidden"
            >
              <Download className="h-3.5 w-3.5 text-[#FF6B00]" />
              <span>Installer</span>
            </button>

            <a
              href={RESTAURANT_INFO.phoneHref}
              className="hidden shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-[#FF6B00] px-3.5 py-2 text-sm font-semibold text-black transition-colors hover:bg-[#FF8533] sm:flex"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span className="font-mono tabular-nums">{RESTAURANT_INFO.phoneDisplay}</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-menu"
              aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              className="inline-flex items-center justify-center rounded-lg border border-white/10 p-2 text-stone-200 transition-colors hover:bg-white/5 md:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {mobileOpen && (
          <nav
            id="mobile-nav-menu"
            aria-label="Navigation mobile"
            className="border-t border-white/10 bg-[#161619] px-4 py-3 md:hidden"
          >
            <div className="flex flex-col divide-y divide-white/5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-base font-medium text-stone-200 transition-colors hover:text-[#FF6B00]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* Fenêtre d'instructions d'installation (hors du header pour passer au-dessus de tout) */}
      {showIosGuide && (
        <div
          onClick={() => setShowIosGuide(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xs space-y-4 rounded-2xl border border-white/15 bg-[#1c1c1c] p-5 text-center text-white shadow-2xl"
          >
            <p className="text-base font-bold text-[#FF6B00]">Installer l'application ONE PIZZA</p>
            <div className="space-y-2 text-left text-xs leading-relaxed text-stone-300">
              <p>
                <strong>Sur iPhone / iPad (Safari) :</strong> appuie sur l'icône{' '}
                <strong className="text-white">Partager</strong> (carré avec flèche en bas), puis{' '}
                <strong className="text-white">« Sur l'écran d'accueil »</strong>.
              </p>
              <p>
                <strong>Sur Android (Chrome) :</strong> appuie sur les{' '}
                <strong className="text-white">3 points</strong> en haut à droite, puis{' '}
                <strong className="text-white">« Ajouter à l'écran d'accueil »</strong>.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowIosGuide(false)}
              className="w-full rounded-xl bg-[#FF6B00] py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#FF8533]"
            >
              Compris
            </button>
          </div>
        </div>
      )}
    </>
  );
}

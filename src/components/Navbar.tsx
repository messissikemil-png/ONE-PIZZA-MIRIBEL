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

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const [isPlaying, setIsPlaying] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showIosGuide, setShowIosGuide] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/assets/aistudio/ambiance.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    const startOnFirstClick = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
      window.removeEventListener('click', startOnFirstClick);
    };
    window.addEventListener('click', startOnFirstClick);

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('click', startOnFirstClick);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      audio.pause();
    };
  }, []);

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
    } else {
      setShowIosGuide(true);
    }
  };
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#121212]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:h-16">
        {/* Zone 1: Single-line brand wordmark */}
        <a
          href="#accueil"
          className="flex shrink-0 items-center gap-2.5 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212]"
          aria-label="ONE PIZZA — Retour à l'accueil"
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

        {/* Zone 2: Clean single-line navigation links */}
        <nav aria-label="Navigation principale" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative shrink-0 whitespace-nowrap py-1 text-sm font-medium text-stone-300 transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
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
            className="p-2 rounded-full text-stone-300 hover:text-[#FF6B00] hover:bg-white/5 transition-colors"
            title={isPlaying ? 'Couper la musique' : 'Activer la musique'}
          >
            {isPlaying ? <Volume2 className="h-4 w-4 text-[#FF6B00]" /> : <VolumeX className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={handleInstallClick}
            className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/20 transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Installer</span>
          </button>
        </nav>

        {/* Zone 3: Single primary action CTA (desktop) + mobile menu button */}
        <div className="flex shrink-0 items-center gap-3">
          <a
            href={RESTAURANT_INFO.phoneHref}
            className="hidden shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-[#FF6B00] px-4 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#FF8533] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFCC00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212] md:inline-flex"
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#1A1A1E] text-stone-200 transition-colors hover:border-[#FF6B00]/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
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
          <div className="mt-3 flex items-center gap-3 border-t border-white/10 pt-3">
            <button
              type="button"
              onClick={toggleMusic}
              aria-label="Musique d'ambiance"
              className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 text-xs font-medium text-stone-300 hover:text-[#FF6B00] transition-colors"
            >
              {isPlaying ? <Volume2 className="h-4 w-4 text-[#FF6B00]" /> : <VolumeX className="h-4 w-4" />}
              <span>{isPlaying ? 'Musique : ON' : 'Musique : OFF'}</span>
            </button>

            <button
              type="button"
              onClick={handleInstallClick}
              className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-2 text-xs font-medium text-white hover:bg-white/20 transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Installer l'app</span>
            </button>
          </div>
        </nav>
      )}
   {showIosGuide && (
        <div
          onClick={() => setShowIosGuide(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-xs space-y-3 rounded-2xl border border-white/10 bg-[#1c1c1c] p-5 text-center text-white"
          >
            <p className="text-base font-semibold">Installer ONE PIZZA</p>
            <p className="text-sm text-stone-300">
              Sur iPhone/iPad (Safari) : appuie sur le bouton <strong>Partager</strong> en bas de l'écran, puis choisis <strong>« Sur l'écran d'accueil »</strong>.
            </p>
            <button
              type="button"
              onClick={() => setShowIosGuide(false)}
              className="w-full rounded-xl bg-[#FF6B00] py-2 text-sm font-semibold text-black"
            >
              Compris
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

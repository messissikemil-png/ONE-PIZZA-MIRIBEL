import { useEffect, useState } from 'react';

export interface OpeningStatus {
  isOpen: boolean;
  badgeText: 'OUVERT' | 'FERMÉ';
  detailText: string;
  currentTimeLabel: string;
}

function computeOpeningStatus(now: Date): OpeningStatus {
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const totalMinutes = hours * 60 + minutes;

  const lunchStart = 11 * 60; // 11:00
  const lunchEnd = 14 * 60; // 14:00
  const dinnerStart = 17 * 60; // 17:00
  const dinnerEnd = 22 * 60; // 22:00

  const currentTimeLabel = `${String(hours).padStart(2, '0')}h${String(minutes).padStart(2, '0')}`;

  if (totalMinutes >= lunchStart && totalMinutes < lunchEnd) {
    return {
      isOpen: true,
      badgeText: 'OUVERT',
      detailText: "Service du midi en cours · Ferme à 14h00",
      currentTimeLabel,
    };
  }

  if (totalMinutes >= dinnerStart && totalMinutes < dinnerEnd) {
    return {
      isOpen: true,
      badgeText: 'OUVERT',
      detailText: "Service du soir en cours · Ferme à 22h00",
      currentTimeLabel,
    };
  }

  if (totalMinutes < lunchStart) {
    return {
      isOpen: false,
      badgeText: 'FERMÉ',
      detailText: 'Prochain service aujourd’hui à 11h00',
      currentTimeLabel,
    };
  }

  if (totalMinutes >= lunchEnd && totalMinutes < dinnerStart) {
    return {
      isOpen: false,
      badgeText: 'FERMÉ',
      detailText: 'Réouverture ce soir à 17h00',
      currentTimeLabel,
    };
  }

  return {
    isOpen: false,
    badgeText: 'FERMÉ',
    detailText: 'Prochain service demain à 11h00',
    currentTimeLabel,
  };
}

export function useOpeningStatus(): OpeningStatus {
  const [status, setStatus] = useState<OpeningStatus>(() => computeOpeningStatus(new Date()));

  useEffect(() => {
    const interval = window.setInterval(() => {
      setStatus(computeOpeningStatus(new Date()));
    }, 30_000);

    return () => window.clearInterval(interval);
  }, []);

  return status;
}

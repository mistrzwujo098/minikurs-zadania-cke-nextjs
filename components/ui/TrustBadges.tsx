'use client';

import React from 'react';
import { Shield, CreditCard, Truck, Award } from 'lucide-react';

const TrustBadges = () => {
  const badges = [
    {
      icon: Shield,
      text: 'Bezpieczne płatności'
    },
    {
      icon: Award,
      text: '30 dni gwarancji'
    },
    {
      icon: Truck,
      text: 'Natychmiastowy dostęp'
    },
    {
      icon: CreditCard,
      text: 'Płatność w ratach'
    }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 py-4">
      {badges.map((badge, index) => (
        <div key={index} className="flex items-center gap-2 text-sm text-paulina-text-light">
          <badge.icon className="w-4 h-4 text-paulina-accent" />
          <span>{badge.text}</span>
        </div>
      ))}
    </div>
  );
};

export default TrustBadges;
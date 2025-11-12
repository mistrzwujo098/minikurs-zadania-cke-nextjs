'use client';

import React from 'react';

const Footer = () => {
  return (
    <footer id="footer" className="py-8 bg-paulina-primary text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm">
            © 2025 Paulina od Matematyki. Wszelkie prawa zastrzeżone.
          </p>
          <div className="mt-2">
            <a href="/regulamin" className="text-paulina-surface hover:text-white transition-colors mx-2">
              Regulamin
            </a>
            <span className="text-paulina-surface/50">oraz</span>
            <a href="/polityka-prywatnosci" className="text-paulina-surface hover:text-white transition-colors mx-2">
              polityka prywatności
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
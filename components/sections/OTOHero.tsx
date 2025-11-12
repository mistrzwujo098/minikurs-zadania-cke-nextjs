'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Mail, ShoppingCart, Clock } from 'lucide-react';

const OTOHero = () => {
  return (
    <section className="relative bg-gradient-to-br from-paulina-bg-yellow via-paulina-surface to-paulina-bg-light py-12 sm:py-16 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            {/* Success message */}
            <div className="bg-green-100 border-2 border-green-500 rounded-lg p-4 mb-6 inline-flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-lg font-bold text-green-800">Dziękujemy za zapis!</p>
                <p className="text-sm text-green-700">Sprawdź swoją skrzynkę e-mail</p>
              </div>
            </div>

            {/* Main alert */}
            <div className="bg-white rounded-card shadow-xl p-6 sm:p-8 mb-8">
              <div className="flex items-center justify-center mb-4">
                <AlertTriangle className="w-12 h-12 text-paulina-error animate-pulse" />
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-paulina-primary mb-4">
                UWAGA! NIE ZAMYKAJ TEJ KARTY!
              </h1>
              
              <p className="text-lg sm:text-xl text-paulina-error font-semibold mb-4">
                Twoja promocja jest dostępna TYLKO TERAZ
              </p>

              <div className="bg-paulina-bg-yellow rounded-lg p-4 mb-6">
                <p className="text-paulina-text font-medium mb-2">
                  <Clock className="w-5 h-5 inline mr-2 text-paulina-accent" />
                  To jednorazowa oferta specjalna dostępna wyłącznie po zapisie
                </p>
                <p className="text-sm text-paulina-text-light">
                  Jeśli zamkniesz tę stronę, stracisz dostęp do tej promocji na zawsze
                </p>
              </div>

              {/* Instructions */}
              <div className="text-left space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-paulina-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-paulina-primary">Krok 1: Sprawdź e-mail</p>
                    <p className="text-sm text-paulina-text-light">Potwierdzenie zapisu już czeka w Twojej skrzynce</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <ShoppingCart className="w-5 h-5 text-paulina-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-paulina-primary">Krok 2: Skorzystaj z promocji poniżej</p>
                    <p className="text-sm text-paulina-text-light">Oferta ważna tylko przez najbliższe 15 minut</p>
                  </div>
                </div>
              </div>

              {/* Scroll indicator */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-center"
              >
                <p className="text-lg font-semibold text-paulina-accent mb-2">
                  Przewiń w dół, aby zobaczyć szczegóły oferty
                </p>
                <svg className="w-6 h-6 text-paulina-accent mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            </div>

            {/* Original Hero content */}
            <div className="bg-white/50 rounded-card p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-paulina-primary mb-3">
                KOMPLETNY KURS MATEMATYKI DLA 1 KLASY
              </h2>
              <p className="text-lg text-paulina-text">
                Wszystko czego potrzebujesz do nauki matematyki w 1 klasie
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OTOHero;
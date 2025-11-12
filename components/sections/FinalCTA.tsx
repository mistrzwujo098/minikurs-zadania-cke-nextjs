'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ChevronRight } from 'lucide-react';
import TrustBadges from '../ui/TrustBadges';

const FinalCTA = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-paulina-primary mb-8 text-center">
            OSTATNIA SZANSA NA DOBRY START
          </h2>

          <div className="bg-paulina-error/10 border-l-4 border-paulina-error p-6 rounded-r-lg mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-paulina-error flex-shrink-0 mt-1" />
              <div>
                <p className="text-lg text-paulina-text mb-2">
                  Większość uczniów <span className="font-bold">ma problemy z matematyką w 1 klasie liceum</span>.
                </p>
                <p className="text-lg text-paulina-text font-semibold">
                  Twoje dziecko może mieć łatwiejszy start.
                </p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-center mb-10"
          >
            <p className="text-xl text-paulina-text mb-6">
              Ten kurs to kompletny materiał pierwszej klasy wyjaśniony krok po kroku. 
              To solidny fundament pod całą matematykę licealną.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-br from-paulina-surface to-paulina-bg-yellow rounded-card p-8 text-center mb-8"
          >
            <div className="mb-6">
              <p className="text-5xl font-bold text-paulina-error line-through">1000 zł</p>
              <p className="text-6xl font-bold text-paulina-accent">597 zł</p>
            </div>
            
            <a 
              href="https://skutecznekorepetycje.salescrm.pl/cart/add_product/10088" 
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-paulina-accent text-white font-bold text-base sm:text-lg rounded-full shadow-button hover:shadow-button-hover hover:bg-paulina-accent-hover transform transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
              id="pricing"
            >
              Zamawiam kurs
              <ChevronRight className="ml-2 w-5 h-5" />
            </a>

            
            <TrustBadges />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center"
          >
            <img
              src="https://paulinaodmatematyki.com/wp-content/uploads/2024/07/Pasek_banki_karty_raty_odroczona-platnosc.png"
              alt="Metody płatności"
              className="max-w-full mx-auto mb-6"
              loading="lazy"
              width="800"
              height="100"
            />
            
            <p className="text-sm text-paulina-text-light">
              Bezpieczne płatności obsługiwane przez zaufanych partnerów
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
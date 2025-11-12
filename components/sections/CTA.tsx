'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, DollarSign, CheckCircle } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-paulina-primary mb-8">
            ⏰ CZAS NA DECYZJĘ
          </h2>

          <div className="space-y-6 mb-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-paulina-text"
            >
              Drogi Rodzicu, zastanów się:
            </motion.p>

            <div className="space-y-4">
              {[
                'Czy chcesz, aby Twoje dziecko dobrze rozpoczęło naukę w szkole ponadpodstawowej?',
                'Ile warte jest uniknięcie zaległości, które mogą ciągnąć się aż do matury?',
                'Jak ważne jest solidne zrozumienie podstaw matematyki licealnej?'
              ].map((question, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-3 text-left max-w-2xl mx-auto"
                >
                  <Star className="w-6 h-6 text-paulina-accent flex-shrink-0 mt-1" />
                  <p className="text-lg text-paulina-text">{question}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="bg-paulina-surface rounded-card p-8 mb-10"
          >
            <p className="text-xl font-semibold text-paulina-primary mb-6">
              Ten kurs to nie wydatek – to inwestycja w matematyczną przyszłość Twojego dziecka.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-paulina-accent" />
                <span className="text-lg text-paulina-text">
                  Za mniej niż koszt miesięcznych korepetycji
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-paulina-success" />
                <span className="text-lg text-paulina-text">
                  Cały materiał 1 klasy w jednym miejscu
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-gradient-to-r from-paulina-accent to-paulina-accent-hover rounded-full p-1 inline-block"
          >
            <a 
              href="https://skutecznekorepetycje.salescrm.pl/cart/add_product/10088" 
              className="block px-6 sm:px-8 py-3 sm:py-4 bg-paulina-accent text-white font-bold text-base sm:text-lg rounded-full hover:bg-paulina-accent-hover transform transition-all duration-200 hover:scale-[1.02] active:scale-95"
            >
              TAK, CHCĘ ZAPEWNIĆ DZIECKU DOBRY START W LICEUM
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-6 text-paulina-text-light"
          >
            Dołącz do ponad 20 000 rodziców, którzy już zaufali naszym metodom
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
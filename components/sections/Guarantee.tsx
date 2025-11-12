'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle } from 'lucide-react';

const Guarantee = () => {
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
          <div className="bg-gradient-to-br from-paulina-surface to-paulina-bg-yellow rounded-card p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 bg-pattern"></div>
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, type: "spring" }}
                className="inline-flex items-center justify-center w-20 h-20 bg-paulina-success/20 rounded-full mb-6"
              >
                <Shield className="w-10 h-10 text-paulina-success" />
              </motion.div>

              <h2 className="text-3xl sm:text-4xl font-bold text-paulina-primary mb-6">
                🛡️ GWARANCJA SATYSFAKCJI
              </h2>

              <p className="text-xl text-paulina-text mb-8">
                Jestem tak pewna jakości tego kursu, że oferuję:
              </p>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-card max-w-2xl mx-auto mb-8"
              >
                <h3 className="text-2xl font-bold text-paulina-accent mb-4">
                  30-dniową gwarancję zwrotu pieniędzy
                </h3>
                <div className="flex items-start gap-3 text-left max-w-lg mx-auto">
                  <CheckCircle className="w-6 h-6 text-paulina-success flex-shrink-0 mt-1" />
                  <p className="text-lg text-paulina-text">
                    Jeśli z jakiegokolwiek powodu uznasz, że Kurs nie spełnia Twoich oczekiwań – 
                    po prostu napisz do mnie, a zwrócę Ci każdą złotówkę. 
                    <span className="font-semibold"> Bez pytań, bez komplikacji.</span>
                  </p>
                </div>
              </motion.div>

              <div className="grid sm:grid-cols-3 gap-4 text-center">
                <div className="bg-white/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-paulina-primary mb-1">100%</div>
                  <p className="text-sm text-paulina-text-light">Zwrot pieniędzy</p>
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-paulina-primary mb-1">30 dni</div>
                  <p className="text-sm text-paulina-text-light">Na decyzję</p>
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-paulina-primary mb-1">0</div>
                  <p className="text-sm text-paulina-text-light">Pytań</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Guarantee;
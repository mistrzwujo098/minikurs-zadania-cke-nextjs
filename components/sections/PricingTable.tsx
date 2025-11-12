'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, X, Star, Zap } from 'lucide-react';

const PricingTable = () => {
  const comparisonData = [
    { feature: 'Cena', kurs: '597 zł za cały rok', korepetycje: '150-200 zł/h' },
    { feature: 'Ilość lekcji', kurs: '60+ lekcji video', korepetycje: '4-8 lekcji/miesiąc' },
    { feature: 'Dostępność 24/7', kurs: true, korepetycje: false },
    { feature: 'Możliwość powtórek', kurs: true, korepetycje: false },
    { feature: 'Zadania domowe', kurs: 'Z rozwiązaniami', korepetycje: 'Bez rozwiązań' },
    { feature: 'Ściągi i wzory', kurs: 'Włączone w cenę', korepetycje: 'Dodatkowo płatne' },
    { feature: 'Sprawdzone metody', kurs: '20 000+ uczniów', korepetycje: 'Zależy od nauczyciela' },
  ];

  return (
    <section className="py-16 bg-white" id="comparison">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-paulina-primary mb-8 text-center">
            Porównaj i oszczędź
          </h2>

          <div className="overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
            <div className="px-4 sm:px-6 lg:px-8">
              <table className="w-full min-w-[500px]">
              <thead>
                <tr>
                  <th className="text-left p-3 sm:p-4"></th>
                  <th className="p-3 sm:p-4">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center bg-paulina-accent text-white px-3 py-1 rounded-full text-sm mb-2">
                        <Zap className="w-4 h-4 mr-1" />
                        POLECANE
                      </div>
                      <h3 className="font-bold text-paulina-primary text-lg">KURS 1 KLASA</h3>
                    </div>
                  </th>
                  <th className="p-3 sm:p-4 text-center">
                    <h3 className="font-bold text-paulina-text-light text-lg">Korepetycje</h3>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-paulina-surface/30' : ''}>
                    <td className="p-3 sm:p-4 text-sm sm:text-base font-medium text-paulina-text">{row.feature}</td>
                    <td className="p-3 sm:p-4 text-center">
                      {typeof row.kurs === 'boolean' ? (
                        row.kurs ? (
                          <CheckCircle className="w-6 h-6 text-paulina-success mx-auto" />
                        ) : (
                          <X className="w-6 h-6 text-paulina-error mx-auto" />
                        )
                      ) : (
                        <span className="font-semibold text-paulina-primary">{row.kurs}</span>
                      )}
                    </td>
                    <td className="p-3 sm:p-4 text-center">
                      {typeof row.korepetycje === 'boolean' ? (
                        row.korepetycje ? (
                          <CheckCircle className="w-6 h-6 text-paulina-success mx-auto" />
                        ) : (
                          <X className="w-6 h-6 text-paulina-error mx-auto" />
                        )
                      ) : (
                        <span className="text-paulina-text-light">{row.korepetycje}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              </table>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-paulina-accent text-paulina-accent" />
              ))}
              <span className="ml-2 text-paulina-text font-medium">4.9/5 na podstawie 693 opinii</span>
            </div>
            <p className="text-paulina-text-light">
              Dołącz do tysięcy zadowolonych rodziców, którzy wybrali skuteczną alternatywę
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingTable;

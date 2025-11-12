'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Czy kurs obejmuje cały materiał pierwszej klasy?',
      answer: 'Tak! Kurs zawiera ponad 60 lekcji video pokrywających cały materiał matematyki pierwszej klasy - zarówno poziom podstawowy, jak i rozszerzony. Uczysz się tylko tego, czego potrzebujesz.'
    },
    {
      question: 'Czy kurs nadaje się dla ucznia, który ma problemy z matematyką?',
      answer: 'Absolutnie tak! Każdy temat jest wyjaśniony od podstaw, krok po kroku. Używam prostego języka i pokazuję łatwiejsze sposoby rozwiązywania zadań niż te często uczone w szkole.'
    },
    {
      question: 'Jak długo mam dostęp do kursu?',
      answer: 'Dostęp jest przyznawany na cały rok szkolny (12 miesięcy). Możesz wracać do lekcji wielokrotnie, powtarzać trudniejsze tematy i uczyć się we własnym tempie.'
    },
    {
      question: 'Co zawiera kurs oprócz lekcji video?',
      answer: 'Do każdej lekcji dołączone są zadania domowe z pełnymi rozwiązaniami krok po kroku, ściągi ze wzorami oraz schematy rozwiązywania typowych zadań. To kompletny system nauki.'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-paulina-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-paulina-primary mb-8 text-center">
            ❓ NAJCZĘŚCIEJ ZADAWANE PYTANIA
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between hover:bg-paulina-surface/50 transition-colors min-h-[60px]"
                >
                  <h3 className="text-base sm:text-lg font-semibold text-paulina-primary pr-4">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 p-2 -m-2"
                  >
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-paulina-accent" />
                    ) : (
                      <Plus className="w-5 h-5 text-paulina-accent" />
                    )}
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-100">
                        <p className="text-sm sm:text-base text-paulina-text">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
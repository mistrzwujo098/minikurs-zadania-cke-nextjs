'use client';

import { motion } from 'framer-motion';
import { Brain, Target, Trophy, Zap } from 'lucide-react';
import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Target,
      title: 'Uczą się w odpowiednim tempie',
      description: 'Każdy temat wyjaśniony krok po kroku, bez pośpiechu i stresu'
    },
    {
      icon: Brain,
      title: 'Rozumieją zamiast „wkuć”',
      description: 'Proste tłumaczenie z pozoru trudnych zagadnień matematycznych'
    },
    {
      icon: Zap,
      title: 'Ćwiczą i utrwalają',
      description: 'Zadania domowe z rozwiązaniami do każdej lekcji'
    },
    {
      icon: Trophy,
      title: 'Budują solidne podstawy',
      description: 'Które pozwolą im radzić sobie przez całe liceum'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-paulina-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-paulina-primary mb-4">
              JAK DZIAŁA MÓJ KURS?
            </h2>
            <p className="text-xl text-paulina-text-light max-w-3xl mx-auto">
              Większość uczniów gubi się w natłoku nowych tematów w pierwszej klasie. 
              Szybkie tempo, trudne pojęcia, brak czasu na zrozumienie.
            </p>
          </div>

          <div className="bg-white rounded-card shadow-card p-8 mb-12">
            <p className="text-xl font-semibold text-paulina-primary text-center mb-8">
              Mój kurs rozwiązuje te problemy:
            </p>

            <div className="space-y-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-paulina-accent/10 rounded-full flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-paulina-accent" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-paulina-primary mb-2">
                      {step.title}
                    </h3>
                    <p className="text-paulina-text-light">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="bg-gradient-to-r from-paulina-primary to-paulina-primary-light rounded-card p-8 text-white text-center"
          >
            <p className="text-xl font-medium mb-4">
              W efekcie – Twoje dziecko rozumie matematykę i radzi sobie 
              z każdym nowym tematem.
            </p>
            <div className="flex justify-center items-center gap-4">
              <Trophy className="w-8 h-8 text-paulina-accent" />
              <span className="text-2xl font-bold">Solidne podstawy na całe liceum</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
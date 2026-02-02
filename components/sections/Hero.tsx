'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Shield, Users, Trophy, CheckCircle, Star, FileText, BookOpen } from 'lucide-react';
import { content } from '@/lib/content';

const Hero = () => {
  const { hero } = content;

  return (
    <section className="relative bg-gradient-to-b from-paulina-surface to-white overflow-hidden min-h-[100vh] lg:min-h-[90vh] flex items-center pt-16">
      <div className="absolute inset-0 opacity-5 bg-pattern-hero"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 lg:items-center">

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="order-1"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center px-3 py-1.5 bg-paulina-success/10 text-paulina-success rounded-full text-xs sm:text-sm font-semibold">
                  <FileText className="w-3 h-3 mr-1" />
                  Wszystkie zadania CKE
                </span>
                <span className="inline-flex items-center px-3 py-1.5 bg-paulina-accent/10 text-paulina-accent rounded-full text-xs sm:text-sm font-semibold">
                  <BookOpen className="w-3 h-3 mr-1" />
                  Rozwiązania krok po kroku
                </span>
                <span className="hidden sm:inline-flex items-center px-3 py-1.5 bg-paulina-info/10 text-paulina-info rounded-full text-xs sm:text-sm font-semibold">
                  <Shield className="w-3 h-3 mr-1" />
                  14-dniowa gwarancja
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-paulina-primary mb-4 leading-tight">
                {hero.headline}
              </h1>

              <p className="text-lg sm:text-xl lg:text-2xl text-paulina-text mb-6">
                {hero.description}
              </p>

              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-paulina-accent">{hero.price} zł</span>
                  <span className="text-2xl text-paulina-error line-through">{hero.oldPrice} zł</span>
                  <span className="bg-paulina-error text-white px-2 py-1 rounded text-sm font-semibold">{hero.discount}</span>
                </div>
                <p className="text-sm text-paulina-text-light mt-1">Najniższa cena w tym roku!</p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-6"
              >
                <a
                  href={hero.ctaUrl}
                  className="inline-flex items-center px-8 py-4 bg-paulina-accent text-white font-bold text-lg rounded-full shadow-button hover:shadow-button-hover hover:bg-paulina-accent-hover transform transition-all duration-200 hover:-translate-y-0.5 active:scale-95 w-full sm:w-auto justify-center"
                >
                  {hero.ctaText}
                  <ChevronRight className="ml-2 w-5 h-5" />
                </a>
              </motion.div>

              <div className="flex flex-wrap gap-4 text-sm">
                {hero.stats.map((stat, index) => (
                  <div key={index} className="flex items-center text-paulina-text-light">
                    {index === 0 && <Shield className="w-4 h-4 mr-1.5 text-paulina-success flex-shrink-0" />}
                    {index === 1 && <Users className="w-4 h-4 mr-1.5 text-paulina-success flex-shrink-0" />}
                    {index === 2 && <Trophy className="w-4 h-4 mr-1.5 text-paulina-success flex-shrink-0" />}
                    {stat.label}: {stat.value}
                  </div>
                ))}
              </div>

              <div className="hidden lg:block mt-8 space-y-3">
                {hero.features.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="flex items-start"
                  >
                    <CheckCircle className="w-5 h-5 text-paulina-success mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-paulina-text">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="order-2"
            >
              <div className="relative">
                <img
                  src="/zadania-cke/images/hero.webp"
                  alt="Kompletny Zbiór Egzaminów Ósmoklasisty CKE"
                  className="w-full max-w-sm mx-auto lg:max-w-full rounded-2xl shadow-2xl"
                  loading="lazy"
                  width="600"
                  height="800"
                />
                <div className="absolute -bottom-4 -right-2 sm:-right-4 bg-white rounded-lg shadow-lg p-2 sm:p-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-paulina-accent text-paulina-accent" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-paulina-text mt-1">4.9/5 (693 opinii)</p>
                </div>
              </div>
            </motion.div>

          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="lg:hidden mt-8 order-3"
          >
            <div className="bg-white rounded-2xl shadow-card p-4 sm:p-6 max-w-3xl mx-auto">
              <h3 className="font-semibold text-paulina-primary mb-3">Co otrzymujesz:</h3>
              <div className="grid grid-cols-1 gap-2 text-left text-sm">
                {hero.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-paulina-success mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-paulina-text">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

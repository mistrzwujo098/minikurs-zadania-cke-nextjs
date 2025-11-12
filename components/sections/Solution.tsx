'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Video, Brain, Clock, BookOpen, Trophy, Users } from 'lucide-react';

const Solution = () => {
  const features = [
    {
      icon: Video,
      title: '60+ lekcji video',
      description: 'obejmujących cały program 1 klasy'
    },
    {
      icon: Brain,
      title: 'Dokładne wyjaśnienie krok po kroku',
      description: 'wszystkich zagadnień z programu 1 klasy'
    },
    {
      icon: BookOpen,
      title: 'Schematy myślenia',
      description: 'zamiast suchych wzorów'
    },
    {
      icon: Clock,
      title: 'Dostęp 24/7',
      description: 'z dowolnego urządzenia'
    },
    {
      icon: CheckCircle,
      title: 'Ćwiczenia do każdego tematu',
      description: 'wraz z rozwiązaniami'
    },
    {
      icon: Trophy,
      title: 'W cenie niższej',
      description: 'niż miesiąc korepetycji'
    }
  ];

  return (
    <section id="program" className="py-20 bg-paulina-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-paulina-primary mb-4">
              CO ZAWIERA KURS MATEMATYKI DLA 1 KLASY?
            </h2>
            <p className="text-lg sm:text-xl text-paulina-text-light max-w-3xl mx-auto px-2">
              Kompletny kurs matematyki dla 1 klasy to nie kolejny nudny zbiór zadań. To precyzyjnie skonstruowany system, 
              który przez cały rok szkolny buduje solidne fundamenty matematyczne u Twojego dziecka.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-4 sm:p-6 shadow-card hover:shadow-card-hover transform transition-all duration-200 hover:-translate-y-1"
              >
                <feature.icon className="w-10 h-10 sm:w-12 sm:h-12 text-paulina-accent mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-semibold text-paulina-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-paulina-text-light">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-paulina-bg-yellow rounded-card p-8 text-center"
          >
            <p className="text-lg text-paulina-text mb-4">
              Wszystko to w cenie niższej niż miesiąc korepetycji, które według CBOS opłaca 
              <span className="font-semibold"> co czwarty rodzic w Polsce</span>.
            </p>
            <div className="flex items-center justify-center gap-2">
              <Users className="w-5 h-5 text-paulina-accent" />
              <span className="text-paulina-text-light">
                Dołącz do ponad 20 000 zadowolonych kursantów
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Solution;
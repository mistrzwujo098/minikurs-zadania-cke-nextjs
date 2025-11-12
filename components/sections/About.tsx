'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, PlayCircle, BookOpen, Heart } from 'lucide-react';

const About = () => {
  const achievements = [
    {
      icon: Award,
      text: 'Stypendystka Ministra Nauki i Szkolnictwa Wyższego'
    },
    {
      icon: Award,
      text: '6-krotna laureatka plebiscytu Orły Edukacji'
    },
    {
      icon: PlayCircle,
      text: 'Twórca kanału „Skuteczne Korepetycje" z ponad 20 milionami wyświetleń'
    },
    {
      icon: BookOpen,
      text: 'Autorka bestsellerowych Kursów matematycznych'
    },
    {
      icon: Heart,
      text: 'Specjalizuję się w przygotowaniu licealistów do matury od podstaw'
    }
  ];

  return (
    <section id="about" className="py-20 bg-paulina-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-paulina-primary mb-12 text-center">
            👩‍🏫 KIM JESTEM?
          </h2>

          <div className="bg-white rounded-card shadow-card overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative">
                <img
                  src="https://paulinaodmatematyki.com/wp-content/uploads/2025/06/hero-1.webp"
                  alt="Paulina Miś"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width="600"
                  height="600"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-paulina-primary/20 to-transparent"></div>
              </div>
              
              <div className="p-8 lg:p-12">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-xl text-paulina-text mb-6"
                >
                  Nazywam się <span className="font-bold text-paulina-primary">Paulina Miś</span>. 
                  Matematyki uczę od 15 lat. Moje metody pomogły tysiącom uczniów 
                  <span className="font-bold text-paulina-accent"> pokonać trudności</span> i osiągnąć sukces na maturze.
                </motion.p>

                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <achievement.icon className="w-6 h-6 text-paulina-accent flex-shrink-0 mt-0.5" />
                      <p className="text-paulina-text">
                        {achievement.text}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="mt-8 p-6 bg-paulina-surface rounded-lg"
                >
                  <p className="text-lg text-paulina-text italic">
                    "Wiem, jak trudne może być przejście do szkoły ponadpodstawowej. Dlatego stworzyłam ten kurs."
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-paulina-accent mb-2">15</div>
              <p className="text-paulina-text-light">lat doświadczenia</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-paulina-accent mb-2">20k+</div>
              <p className="text-paulina-text-light">zadowolonych kursantów</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-paulina-accent mb-2">20M+</div>
              <p className="text-paulina-text-light">wyświetleń</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-paulina-accent mb-2">6x</div>
              <p className="text-paulina-text-light">Orły Edukacji</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
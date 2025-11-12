'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      image: 'https://paulinaodmatematyki.com/wp-content/uploads/2024/08/Zrzut-ekranu-2022-07-5-o-13.32.10.png'
    },
    {
      id: 2,
      image: 'https://paulinaodmatematyki.com/wp-content/uploads/2024/08/Zrzut-ekranu-2022-08-24-o-13.40.51.png'
    },
    {
      id: 3,
      image: 'https://paulinaodmatematyki.com/wp-content/uploads/2024/08/Zrzut-ekranu-2022-05-27-o-08.59.37-2.png'
    },
    {
      id: 4,
      image: 'https://paulinaodmatematyki.com/wp-content/uploads/2024/08/Zrzut-ekranu-2022-07-5-o-11.41.51.png'
    },
    {
      id: 5,
      image: 'https://paulinaodmatematyki.com/wp-content/uploads/2024/08/Zrzut-ekranu-2022-05-17-o-10.45.54.png'
    },
    {
      id: 6,
      image: 'https://paulinaodmatematyki.com/wp-content/uploads/2024/08/Zrzut-ekranu-2022-05-26-o-20.50.34-1.png'
    },
    {
      id: 7,
      image: 'https://paulinaodmatematyki.com/wp-content/uploads/2024/08/Zrzut-ekranu-2022-05-13-o-10.54.48-1.png'
    },
    {
      id: 8,
      image: 'https://paulinaodmatematyki.com/wp-content/uploads/2024/08/Zrzut-ekranu-2022-08-30-o-00.34.09.png'
    },
    {
      id: 9,
      image: 'https://paulinaodmatematyki.com/wp-content/uploads/2024/08/Zrzut-ekranu-2022-05-12-o-22.25.18-2.png'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-white">
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
              👨‍👩‍👧‍👦 CO MÓWIĄ RODZICE
            </h2>
            <div className="flex justify-center items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-paulina-accent text-paulina-accent" />
              ))}
            </div>
            <p className="text-lg text-paulina-text-light">
              Ponad 20 000 zadowolonych kursantów
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-card bg-paulina-surface p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <Quote className="w-12 h-12 text-paulina-accent/20 mx-auto mb-4" />
                  <img
                    src={testimonials[currentIndex].image}
                    alt={`Opinia ${currentIndex + 1}`}
                    className="w-full max-w-md mx-auto rounded-lg shadow-md"
                    loading="lazy"
                    width="400"
                    height="600"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              onClick={prevTestimonial}
              className="absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 sm:-translate-x-4 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow z-10"
              aria-label="Poprzednia opinia"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-paulina-primary" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 sm:translate-x-4 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow z-10"
              aria-label="Następna opinia"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-paulina-primary" />
            </button>
          </div>

          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-paulina-accent' : 'bg-paulina-text-light/30'
                }`}
                aria-label={`Przejdź do opinii ${index + 1}`}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mt-12"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-paulina-accent mb-2">98%</div>
              <p className="text-paulina-text-light">rodziców poleca kurs</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-paulina-accent mb-2">82%</div>
              <p className="text-paulina-text-light">średni wynik na maturze rozszerzonej moich kursantów</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-paulina-accent mb-2">15 minut dziennie</div>
              <p className="text-paulina-text-light">wystarczy na przerobienie</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Clock, CreditCard, BookOpen, Users } from 'lucide-react';

const Objections = () => {
  const objections = [
    {
      icon: Clock,
      objection: "Czy moje dziecko nadąży za tempem kursu?",
      answer: "Każde dziecko uczy się we własnym tempie. Dlatego daję dostęp na cały rok - można wracać do lekcji wielokrotnie, zatrzymać film, powtórzyć trudniejsze fragmenty. To wielka przewaga nad zwykłymi lekcjami w szkole.",
      highlight: "Nauka we własnym tempie"
    },
    {
      icon: AlertCircle,
      objection: "Moje dziecko miało problemy w podstawówce",
      answer: "Pierwsze klasy często wyrównują poziom. W kursie każdy temat jest wyjaśniony od podstaw, krok po kroku. Używam prostego języka i pokazuję łatwiejsze metody niż te w szkole. To może być nowy start dla Twojego dziecka.",
      highlight: "Świeży start w nowej szkole"
    },
    {
      icon: CreditCard,
      objection: "597 zł to dużo pieniędzy",
      answer: "Rozumiem. Ale proszę porównać - miesięczne korepetycje kosztują 600-800 zł. Tu dostajesz cały rok nauki, ponad 60 lekcji, zadania z rozwiązaniami. To mniej niż 10 zł za lekcję. Plus 30 dni na sprawdzenie.",
      highlight: "Taniej niż miesiąc korepetycji"
    },
    {
      icon: BookOpen,
      objection: "Czy to zastąpi lekcje w szkole?",
      answer: "Jeśli Twoje dziecko korzysta z edukacji domowej ten kurs w pełni zastąpi lekcje w szkole. Natomiast większość uczniów traktuje go jako dodatek i uzupełnienie do materiałów na lekcji",
      highlight: "Wsparcie, nie zastępstwo"
    },
    {
      icon: Users,
      objection: "Skąd pewność, że to pomoże mojemu dziecku?",
      answer: "Nie mogę zagwarantować, że każde dziecko pokocha matematykę. Ale z doświadczenia wiem, że jasne wyjaśnienia i dobre materiały pomagają większości uczniów. Dlatego daję 14 dni na test - zobaczysz sam.",
      highlight: "30 dni na sprawdzenie"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-paulina-surface" id="objections">
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
              🤔 TWOJE WĄTPLIWOŚCI
            </h2>
            <p className="text-lg text-paulina-text-light max-w-3xl mx-auto">
              Rozumiem Twoje obawy. Oto odpowiedzi na najczęstsze pytania rodziców
            </p>
          </div>

          <div className="space-y-6">
            {objections.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-card p-6 sm:p-8 shadow-card hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-paulina-surface rounded-full flex items-center justify-center">
                      <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-paulina-accent" />
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-xl sm:text-2xl font-bold text-paulina-primary mb-3">
                      {item.objection}
                    </h3>
                    <p className="text-base sm:text-lg text-paulina-text mb-4">
                      {item.answer}
                    </p>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-paulina-success flex-shrink-0" />
                      <span className="text-paulina-success font-semibold">
                        {item.highlight}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <div className="bg-paulina-accent/10 border-2 border-paulina-accent rounded-card p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-paulina-primary mb-4">
                Nadal masz wątpliwości?
              </h3>
              <p className="text-lg text-paulina-text mb-6">
                Wiem, że to trudna decyzja. Kurs nie jest magiczną różdżką - to narzędzie, 
                które może pomóc, ale wymaga zaangażowania dziecka. 
                Dlatego proponuję - spróbuj przez 30 dni i oceń sam.
              </p>
              <a 
                href="https://skutecznekorepetycje.salescrm.pl/cart/add_product/10088" 
                className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-paulina-accent text-white font-bold text-base sm:text-lg rounded-full shadow-button hover:shadow-button-hover hover:bg-paulina-accent-hover transform transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
              >
                Sprawdzam bez ryzyka
                <CheckCircle className="ml-2 w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Objections;
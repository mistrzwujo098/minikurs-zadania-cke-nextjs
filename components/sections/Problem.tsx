'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingDown, Brain } from 'lucide-react';

const Problem = () => {
  const statistics = [
    { value: '92,7%', label: 'uczniów doświadcza lęku matematycznego', icon: Brain },
    { value: '50%', label: 'nie podejmuje próby rozwiązania trudniejszych zadań', icon: TrendingDown },
    { value: '26%', label: 'ma problemy z koncentracją z powodu stresu', icon: AlertTriangle }
  ];

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
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-paulina-primary mb-6">
            Drogi Rodzicu,
          </h2>
          
          <p className="text-lg text-paulina-text mb-4">
            Zastanawiasz się czasem, dlaczego niektóre dzieci podchodzą do każdej lekcji matematyki ze spokojem, 
            a inne – mimo miesięcy nauki – z paraliżującym strachem?
          </p>
          
          <p className="text-lg text-paulina-text mb-8">
            <span className="font-semibold text-paulina-primary">Nie chodzi tylko o to, ile Twoje dziecko wie.</span> Chodzi też o to, 
            w co wierzy, że potrafi.
          </p>

          <div className="bg-paulina-surface rounded-card p-8 mb-12">
            <h3 className="text-2xl font-bold text-paulina-primary mb-6 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-3 text-paulina-error" />
              NIEPOKOJĄCA PRAWDA O MATEMATYCE W SZKOLE
            </h3>
            
            <p className="text-paulina-text mb-6">
              Badania pokazują coś, o czym rzadko się mówi:
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {statistics.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-12 h-12 text-paulina-accent mx-auto mb-3" />
                  <div className="text-3xl font-bold text-paulina-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-paulina-text-light">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="bg-paulina-error/10 border-l-4 border-paulina-error p-4 rounded">
              <p className="text-paulina-text font-medium">
                Najgorsze? To nie tylko brak wiedzy decyduje o wyniku ze sprawdzianu. <span className="font-bold">To też brak pewności siebie.</span>
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            <p className="text-lg text-paulina-text mb-6">
              Twoje dziecko prawdopodobnie zna większość materiału. Ale w momencie próby – gdy widzi nieznane zadanie, 
              a czas nieubłaganie tyka – po prostu… <span className="font-semibold text-paulina-primary">zamiera</span>.
            </p>

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Problem;
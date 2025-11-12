'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'O mnie', href: '#about' },
    { label: 'Program', href: '#program' },
    { label: 'Jak to działa', href: '#how-it-works' },
    { label: 'Opinie', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Kontakt', href: '#footer' }
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-paulina-primary">MATEMATYKA 1 KLASA</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="text-paulina-text hover:text-paulina-accent transition-colors duration-200 font-medium"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="https://skutecznekorepetycje.salescrm.pl/cart/add_product/10088"
                className="inline-flex items-center px-4 py-2 bg-paulina-accent text-white font-bold text-sm rounded-full hover:bg-paulina-accent-hover transform transition-all duration-200 hover:-translate-y-0.5"
              >
                Zapisz się
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-paulina-text hover:text-paulina-accent focus:outline-none"
              aria-label="Otwórz menu"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="block px-3 py-2 rounded-md text-base font-medium text-paulina-text hover:text-paulina-accent hover:bg-paulina-surface transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://skutecznekorepetycje.salescrm.pl/cart/add_product_set/3219"
              className="block mx-3 mt-3 px-4 py-2 bg-paulina-accent text-white font-bold text-center rounded-full hover:bg-paulina-accent-hover transition-colors duration-200"
            >
              Zapisz się
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';

const MobileCTA = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-3 sm:p-4 z-40 lg:hidden safe-area-inset-bottom">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-paulina-error line-through">1000 zł</p>
          <p className="text-xl font-bold text-paulina-accent">597 zł</p>
        </div>
        <a 
          href="https://skutecznekorepetycje.salescrm.pl/cart/add_product/10088" 
          className="flex-1 inline-flex items-center justify-center px-5 sm:px-6 py-3 bg-paulina-accent text-white font-bold text-sm sm:text-base rounded-full shadow-button hover:bg-paulina-accent-hover active:scale-95 transition-all"
        >
          Kupuję teraz
          <ChevronRight className="ml-1 w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

export default MobileCTA;
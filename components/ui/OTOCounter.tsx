'use client';

import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

const OTOCounter = () => {
  const [timeLeft, setTimeLeft] = useState({
    minutes: 15,
    seconds: 0
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Check if there's a saved expiry time in localStorage
    const savedExpiry = localStorage.getItem('oto_expiry');
    const now = new Date().getTime();
    
    let expiryTime;
    if (savedExpiry && parseInt(savedExpiry) > now) {
      // Use existing expiry time
      expiryTime = parseInt(savedExpiry);
    } else {
      // Set new expiry time (15 minutes from now)
      expiryTime = now + (15 * 60 * 1000);
      localStorage.setItem('oto_expiry', expiryTime.toString());
    }

    const updateTimer = () => {
      const currentTime = new Date().getTime();
      const difference = expiryTime - currentTime;

      if (difference > 0) {
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ minutes, seconds });
      } else {
        setTimeLeft({ minutes: 0, seconds: 0 });
        setIsExpired(true);
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  if (isExpired) {
    return null; // Hide counter when expired
  }

  const isUrgent = timeLeft.minutes < 5;

  return (
    <div className={`fixed top-0 left-0 right-0 z-[60] ${isUrgent ? 'bg-red-600' : 'bg-paulina-accent'} text-white shadow-lg transition-colors duration-300`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-3 gap-2 sm:gap-4">
          <div className="flex items-center gap-2">
            {isUrgent ? (
              <AlertTriangle className="w-5 h-5 animate-pulse" />
            ) : (
              <Clock className="w-5 h-5" />
            )}
            <span className="text-sm sm:text-base font-semibold">
              JEDNORAZOWA OFERTA - NIE ZAMYKAJ KARTY:
            </span>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="flex flex-col items-center">
              <div className={`text-xl sm:text-2xl font-bold ${isUrgent ? 'animate-pulse' : ''}`}>
                {formatNumber(timeLeft.minutes)}
              </div>
              <div className="text-[10px] sm:text-xs uppercase opacity-80">MIN</div>
            </div>
            
            <div className="text-xl sm:text-2xl font-bold">:</div>
            
            <div className="flex flex-col items-center">
              <div className={`text-xl sm:text-2xl font-bold ${isUrgent ? 'animate-pulse' : ''}`}>
                {formatNumber(timeLeft.seconds)}
              </div>
              <div className="text-[10px] sm:text-xs uppercase opacity-80">SEK</div>
            </div>
          </div>
          
          <a 
            href="https://skutecznekorepetycje.salescrm.pl/cart/add_product/10088" 
            className="ml-2 sm:ml-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-white text-paulina-accent font-bold text-sm sm:text-base rounded-full hover:bg-gray-100 transition-colors whitespace-nowrap"
          >
            KUP TERAZ
          </a>
        </div>
      </div>
    </div>
  );
};

export default OTOCounter;
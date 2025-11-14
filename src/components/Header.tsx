import React from 'react';
import { Anchor, Calendar, MapPin } from 'lucide-react';
import compassIcon from '@/assets/nautilus-compass.jpg';

const Header = () => {
  return (
    <header className="ocean-bg text-primary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-6">
          {/* Logo and Title */}
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-4">
              <img 
                src={compassIcon} 
                alt="Nautilus Compass" 
                className="w-12 h-12 wave-animation rounded-full"
              />
              <h1 className="text-4xl md:text-5xl font-heading font-bold">
                Titanic Survival Calculator
              </h1>
              <img 
                src={compassIcon} 
                alt="Nautilus Compass" 
                className="w-12 h-12 wave-animation rounded-full"
                style={{ animationDelay: '1s' }}
              />
            </div>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl">
              Calculate survival probability using historical passenger data analysis
            </p>
          </div>

          {/* Historical Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
            <div className="flex items-center justify-center space-x-3 text-primary-foreground/80">
              <Calendar className="w-5 h-5" />
              <span className="text-sm font-medium">April 14-15, 1912</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-primary-foreground/80">
              <MapPin className="w-5 h-5" />
              <span className="text-sm font-medium">North Atlantic Ocean</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-primary-foreground/80">
              <Anchor className="w-5 h-5" />
              <span className="text-sm font-medium">RMS Titanic</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
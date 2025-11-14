import React from 'react';
import Header from '@/components/Header';
import TitanicForm from '@/components/TitanicForm';
import heroImage from '@/assets/titanic-hero.jpg';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-elegant">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-nautical">
                  Titanic Survival Analysis
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Calculate your hypothetical survival probability aboard the RMS Titanic using 
                  machine learning trained on historical passenger data. Discover key factors 
                  that influenced survival rates during the tragic voyage.
                </p>
                {/* <div className="flex flex-wrap gap-4">
                  <div className="bg-success/10 text-success-foreground px-4 py-2 rounded-lg border border-success/20">
                    <span className="text-sm font-medium">Machine Learning Model</span>
                  </div>
                  <div className="bg-brass/10 text-brass-foreground px-4 py-2 rounded-lg border border-brass/20">
                    <span className="text-sm font-medium">What-If Analysis</span>
                  </div>
                  <div className="bg-accent/10 text-accent-foreground px-4 py-2 rounded-lg border border-accent/20">
                    <span className="text-sm font-medium">Historical Data</span>
                  </div>
                </div> */}
              </div>
              <div className="relative">
                <img 
                  src={heroImage} 
                  alt="RMS Titanic sailing on the ocean at sunset" 
                  className="w-full h-auto rounded-xl shadow-ocean"
                />
                <div className="absolute inset-0 bg-gradient-ocean opacity-20 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <TitanicForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-80">
            Educational tool based on historical Titanic passenger data. In memory of those who perished.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

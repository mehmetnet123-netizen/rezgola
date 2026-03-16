import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Business } from '@/types';
import { useLocation } from '@/hooks/useLocation';
import { Header } from '@/components/Header';
import { Hero } from '@/sections/Hero';
import { CategoryNav } from '@/sections/CategoryNav';
import { BusinessList } from '@/sections/BusinessList';
import { QuoteForm, type QuoteData } from '@/components/QuoteForm';
import { toast } from 'sonner';

export function Home() {
  const navigate = useNavigate();
  const { location } = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [serviceType, setServiceType] = useState<'in-house' | 'home' | 'quote'>('in-house');
  const [searchQuery, setSearchQuery] = useState('');
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  const handleServiceTypeChange = (type: 'in-house' | 'home' | 'quote') => {
    setServiceType(type);
    if (type === 'quote') setShowQuoteForm(true);
  };

  const handleBusinessClick = (business: Business) => {
    navigate(`/business/${business.id}`);
  };

  const handleQuoteSubmit = (_data: QuoteData) => {
    toast.success('Teklif talebiniz alındı!');
    setShowQuoteForm(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onSearch={setSearchQuery} />
      <main>
        <Hero onServiceTypeChange={handleServiceTypeChange} selectedServiceType={serviceType} />
        <CategoryNav selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} />
        <BusinessList
          selectedCategory={selectedCategory}
          serviceType={serviceType}
          searchQuery={searchQuery}
          userLocation={location}
          onBusinessClick={handleBusinessClick}
        />
      </main>
      <QuoteForm isOpen={showQuoteForm} onClose={() => setShowQuoteForm(false)} onSubmit={handleQuoteSubmit} />
    </div>
  );
}

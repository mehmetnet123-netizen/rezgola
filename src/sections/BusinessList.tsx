import { useEffect, useState, useMemo } from 'react';
import { MapPin, AlertCircle } from 'lucide-react';
import type { Business } from '@/types';
import { businesses, sortByDistance, filterByServiceType, categories } from '@/data/sectors';
import { BusinessCard } from '@/components/BusinessCard';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface BusinessListProps {
  selectedCategory: string | null;
  serviceType: 'in-house' | 'home' | 'quote';
  searchQuery: string;
  userLocation: { lat: number; lng: number } | null;
  onBusinessClick: (business: Business) => void;
}

export function BusinessList({ selectedCategory, serviceType, searchQuery, userLocation, onBusinessClick }: BusinessListProps) {
  const [showLocationAlert, setShowLocationAlert] = useState(false);

  const filteredBusinesses = useMemo(() => {
    let filtered = [...businesses];
    filtered = filterByServiceType(filtered, serviceType);
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(b => b.category === selectedCategory);
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(b => b.name.toLowerCase().includes(query) || b.description.toLowerCase().includes(query));
    }
    if (userLocation) filtered = sortByDistance(filtered, userLocation);
    return filtered;
  }, [selectedCategory, serviceType, searchQuery, userLocation]);

  useEffect(() => {
    setShowLocationAlert(!userLocation && filteredBusinesses.length > 0);
  }, [userLocation, filteredBusinesses.length]);

  const categoryName = selectedCategory ? categories.find(c => c.id === selectedCategory)?.name : 'Tüm İşletmeler';

  if (filteredBusinesses.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPin className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">İşletme bulunamadı</h3>
        <p className="text-gray-500">Seçtiğiniz kriterlere uygun işletme bulunmamaktadır.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {showLocationAlert && (
        <Alert className="mb-6 bg-amber-50 border-amber-200">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          <AlertDescription className="text-amber-800">En yakın işletmeleri görmek için konum izni verin.</AlertDescription>
        </Alert>
      )}
      <h2 className="text-xl font-bold text-gray-900 mb-4">{categoryName}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredBusinesses.map((business) => (
          <BusinessCard key={business.id} business={business} userLocation={userLocation} onClick={() => onBusinessClick(business)} />
        ))}
      </div>
    </div>
  );
}

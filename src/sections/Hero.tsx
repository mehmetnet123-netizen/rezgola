import { useState, useEffect } from 'react';
import { Store, Home, FileText, MapPin } from 'lucide-react';
import { useLocation } from '@/hooks/useLocation';
import { serviceTypes, businesses, sortByDistance, filterByServiceType } from '@/data/sectors';

interface HeroProps {
  onServiceTypeChange: (type: 'in-house' | 'home' | 'quote') => void;
  selectedServiceType: 'in-house' | 'home' | 'quote';
}

export function Hero({ onServiceTypeChange, selectedServiceType }: HeroProps) {
  const { location, loading, requestLocation } = useLocation();
  const [nearbyCount, setNearbyCount] = useState(0);

  useEffect(() => {
    if (location) {
      const filtered = filterByServiceType(businesses, selectedServiceType);
      const sorted = sortByDistance(filtered, location);
      setNearbyCount(sorted.length);
    }
  }, [location, selectedServiceType]);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Store': return <Store className="w-5 h-5" />;
      case 'Home': return <Home className="w-5 h-5" />;
      case 'FileText': return <FileText className="w-5 h-5" />;
      default: return <Store className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        {/* Logo ve Başlık - Rezzgo Tarzı */}
        <div className="text-center mb-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="text-4xl md:text-5xl font-bold tracking-tight">
              <span className="text-gray-900">rez</span>
              <span className="text-[#00A86B]">g</span>
              <span className="text-gray-900">ola</span>
              {/* g harfinin altındaki ok */}
              <svg 
                className="inline-block ml-0.5 -mb-1" 
                width="24" 
                height="12" 
                viewBox="0 0 24 12" 
                fill="none"
              >
                <path 
                  d="M2 6C2 6 8 10 12 10C16 10 22 6 22 6M22 6L18 2M22 6L18 10" 
                  stroke="#00A86B" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Favori <span className="text-[#00A86B]">işletmeni</span> hemen
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            randevu al
          </h2>
        </div>

        {/* Konum Bilgisi */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-50 rounded-full px-4 py-2 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#00A86B]" />
            {loading ? (
              <span className="text-sm text-gray-600">Konum alınıyor...</span>
            ) : location ? (
              <span className="text-sm text-gray-600">{nearbyCount} işletme yakınınızda</span>
            ) : (
              <button onClick={requestLocation} className="text-sm text-[#00A86B] underline">
                Konumu etkinleştir
              </button>
            )}
          </div>
        </div>

        {/* Servis Tipi Seçimi */}
        <div className="flex justify-center">
          <div className="bg-gray-100 rounded-xl p-1 flex flex-wrap justify-center gap-1">
            {serviceTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => onServiceTypeChange(type.id as 'in-house' | 'home' | 'quote')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                  selectedServiceType === type.id
                    ? 'bg-white text-[#00A86B] shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {getServiceIcon(type.icon)}
                <span className="font-medium text-sm">{type.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

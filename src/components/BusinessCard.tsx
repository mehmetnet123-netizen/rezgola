import { Star, MapPin, Heart } from 'lucide-react';
import type { Business } from '@/types';

interface BusinessCardProps {
  business: Business;
  userLocation?: { lat: number; lng: number } | null;
  onClick: () => void;
}

export function BusinessCard({ business, onClick }: BusinessCardProps) {

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200 group border border-gray-100"
    >
      {/* Görsel */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={business.image}
          alt={business.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Favori Butonu */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            // Favori toggle fonksiyonu
          }}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
        >
          <Heart className="w-4 h-4 text-gray-600" />
        </button>
        
        {/* Yeni Etiketi */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="text-xs font-medium text-gray-700">Yeni</span>
        </div>
      </div>

      {/* İçerik */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{business.name}</h3>
        
        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <MapPin className="w-4 h-4 text-[#00A86B]" />
          <span className="line-clamp-1">{business.address}</span>
        </div>
      </div>
    </div>
  );
}

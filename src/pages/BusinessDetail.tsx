import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Phone, ChevronLeft, Heart } from 'lucide-react';
import { getBusinessById } from '@/data/sectors';
import { Button } from '@/components/ui/button';

export function BusinessDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const business = id ? getBusinessById(id) : undefined;

  if (!business) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">İşletme bulunamadı</h2>
          <Button onClick={() => navigate('/')} className="bg-[#00A86B]">Ana Sayfaya Dön</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-64">
        <img src={business.image} alt={business.name} className="w-full h-full object-cover" />
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
          <Heart className="w-5 h-5" />
        </button>
      </div>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">{business.name}</h1>
        <div className="flex items-center gap-1 mb-4">
          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          <span className="font-semibold">{business.rating}</span>
          <span className="text-gray-500">({business.reviewCount} değerlendirme)</span>
        </div>
        <p className="text-gray-600 mb-4">{business.description}</p>
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <MapPin className="w-4 h-4" />
          <span>{business.address}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 mb-6">
          <Phone className="w-4 h-4" />
          <span>{business.phone}</span>
        </div>
        <Button className="w-full bg-[#00A86B] hover:bg-[#008f5b]">Rezervasyon Yap</Button>
      </div>
    </div>
  );
}

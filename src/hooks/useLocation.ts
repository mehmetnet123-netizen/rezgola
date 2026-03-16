import { useState, useEffect, useCallback } from 'react';
import type { Location } from '@/types';

interface UseLocationReturn {
  location: Location | null;
  error: string | null;
  loading: boolean;
  requestLocation: () => void;
}

export function useLocation(): UseLocationReturn {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const requestLocation = useCallback(() => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Tarayıcınız konum özelliğini desteklemiyor.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        let errorMessage = 'Konum alınamadı.';
        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = 'Konum izni reddedildi. Lütfen tarayıcı ayarlarından konum iznini etkinleştirin.';
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = 'Konum bilgisi kullanılamıyor.';
            break;
          case err.TIMEOUT:
            errorMessage = 'Konum isteği zaman aşımına uğradı.';
            break;
        }
        setError(errorMessage);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  }, []);

  useEffect(() => {
    // Otomatik konum isteme
    requestLocation();
  }, [requestLocation]);

  return { location, error, loading, requestLocation };
}

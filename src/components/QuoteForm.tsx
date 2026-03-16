import { useState } from 'react';
import { MapPin, Calendar, DollarSign, User, Phone, Mail } from 'lucide-react';
import { categories } from '@/data/sectors';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

interface QuoteFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: QuoteData) => void;
  initialCategory?: string;
}

export interface QuoteData {
  category: string;
  subcategory?: string;
  description: string;
  address: string;
  preferredDate?: string;
  budget?: number;
  userName: string;
  userPhone: string;
  userEmail?: string;
}

export function QuoteForm({ isOpen, onClose, onSubmit, initialCategory }: QuoteFormProps) {
  const [category, setCategory] = useState(initialCategory || '');
  const [subcategory, setSubcategory] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState<Date>();
  const [budget, setBudget] = useState('');
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const selectedCategory = categories.find(c => c.id === category);

  const handleSubmit = () => {
    if (!category || !description || !address || !userName || !userPhone) return;

    onSubmit({
      category,
      subcategory: subcategory || undefined,
      description,
      address,
      preferredDate: date ? format(date, 'yyyy-MM-dd') : undefined,
      budget: budget ? parseInt(budget) : undefined,
      userName,
      userPhone,
      userEmail: userEmail || undefined,
    });
  };

  const canSubmit = category && description && address && userName && userPhone;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Teklif Al</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Kategori Seçimi */}
          <div>
            <Label>Kategori *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Kategori seçin" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Alt Kategori */}
          {selectedCategory?.subcategories && (
            <div>
              <Label>Alt Kategori</Label>
              <Select value={subcategory} onValueChange={setSubcategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Alt kategori seçin" />
                </SelectTrigger>
                <SelectContent>
                  {selectedCategory.subcategories.map((sub) => (
                    <SelectItem key={sub} value={sub}>
                      {sub}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Açıklama */}
          <div>
            <Label>İhtiyacınızı Açıklayın *</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ne tür bir hizmete ihtiyacınız var? Detaylı açıklayın..."
              rows={4}
            />
          </div>

          {/* Adres */}
          <div>
            <Label>Adres *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Hizmetin yapılacağı adres..."
                className="pl-10"
                rows={2}
              />
            </div>
          </div>

          {/* Tercih Edilen Tarih */}
          <div>
            <Label>Tercih Edilen Tarih (Opsiyonel)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {date ? format(date, 'dd MMMM yyyy', { locale: tr }) : 'Tarih seçin'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(d) => d < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Bütçe */}
          <div>
            <Label>Tahmini Bütçe (Opsiyonel)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Örn: 5000"
                className="pl-10"
              />
            </div>
          </div>

          {/* İletişim Bilgileri */}
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">İletişim Bilgileri</h4>
            <div className="space-y-3">
              <div>
                <Label>Ad Soyad *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Adınız ve soyadınız"
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label>Telefon *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    placeholder="05XX XXX XX XX"
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label>E-posta (Opsiyonel)</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="ornek@email.com"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Butonlar */}
        <div className="flex gap-3 mt-6">
          <Button variant="outline" onClick={onClose} className="flex-1">
            İptal
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="flex-1 bg-[#00A86B] hover:bg-[#008f5b]"
          >
            Teklif İste
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

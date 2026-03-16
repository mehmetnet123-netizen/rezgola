import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  user?: {
    name: string;
    role: 'user' | 'business' | 'admin';
  } | null;
  onLogin?: () => void;
  onSearch?: (query: string) => void;
}

export function Header({ user, onLogin, onSearch }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Rezzgo Tarzı */}
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-bold tracking-tight">
              <span className="text-gray-900">rez</span>
              <span className="text-[#00A86B]">g</span>
              <span className="text-gray-900">ola</span>
              <svg 
                className="inline-block ml-0.5 -mb-0.5" 
                width="16" 
                height="8" 
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
          </Link>

          {/* Arama Çubuğu - Ortada */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="İşletmeleri bul..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 h-10 rounded-lg border border-gray-200 text-sm bg-gray-50 focus:bg-white focus:border-[#00A86B]"
              />
            </div>
          </form>

          {/* Sağ Taraf */}
          <div className="flex items-center gap-2">
            {/* Tema Toggle */}
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <Sun className="w-5 h-5 text-gray-600" />
            </button>

            {/* İşletmeler İçin */}
            <Link 
              to="/business-panel"
              className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              İşletmeler İçin
            </Link>

            {/* Giriş Yap */}
            {user ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#00A86B] rounded-full flex items-center justify-center text-white font-medium text-sm">
                  {user.name.charAt(0)}
                </div>
              </div>
            ) : (
              <Button 
                onClick={onLogin}
                className="bg-[#00A86B] hover:bg-[#008f5b] text-white rounded-lg px-4 py-2 text-sm font-medium"
              >
                Giriş Yap
              </Button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-100">
            <form onSubmit={handleSearch} className="px-4 pb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="İşletmeleri bul..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 h-10 rounded-lg border border-gray-200 text-sm bg-gray-50"
                />
              </div>
            </form>
            <Link
              to="/business-panel"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              İşletmeler İçin
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

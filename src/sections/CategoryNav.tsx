import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { categories } from '@/data/sectors';

interface CategoryNavProps {
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
}

export function CategoryNav({ selectedCategory, onCategorySelect }: CategoryNavProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === 'left' ? -200 : 200, behavior: 'smooth' });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="relative bg-white border-b border-gray-200">
      {/* Sol Ok */}
      {showLeftArrow && (
        <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-gray-50 border border-gray-200">
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
      )}

      {/* Sağ Ok */}
      {showRightArrow && (
        <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-gray-50 border border-gray-200">
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>
      )}

      {/* Kategori Listesi - Kaydırılabilir */}
      <div ref={scrollRef} onScroll={checkScroll} className="flex gap-8 px-4 py-4 overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => onCategorySelect(isSelected ? null : category.id)}
              className={`flex-shrink-0 flex flex-col items-center gap-2 pb-2 border-b-2 transition-all duration-200 min-w-[64px] ${
                isSelected ? 'border-[#00A86B] text-[#00A86B]' : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
              }`}
            >
              <span className="text-2xl">{getCategoryEmoji(category.id)}</span>
              <span className="text-xs font-medium whitespace-nowrap">{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function getCategoryEmoji(id: string): string {
  const emojis: Record<string, string> = {
    all: '🧭',
    restaurant: '🍽️',
    beauty: '✨',
    health: '❤️',
    sports: '💪',
    entertainment: '🎉',
    education: '🎓',
    automotive: '🚗',
    home: '🏠',
    hotel: '🏨',
    shopping: '🛍️',
    pet: '🐕',
  };
  return emojis[id] || '📍';
}

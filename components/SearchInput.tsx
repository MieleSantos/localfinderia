import React, { useState } from 'react';
import { GeoLocation, SearchFilters } from '../types';

interface SearchInputProps {
  onSearch: (address: string, filters: SearchFilters, location?: GeoLocation) => void;
  isLoading: boolean;
}

const CATEGORIES = [
  { id: 'mercado', label: '🛒 Mercado' },
  { id: 'farmacia', label: '💊 Farmácia' },
  { id: 'beleza', label: '✂️ Beleza' },
];

const DISTANCES = [
  { id: '1km', label: 'Até 1km' },
  { id: '5km', label: 'Até 5km' },
  { id: '10km', label: 'Até 10km' },
  { id: 'any', label: 'Sem limite' },
];

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, isLoading }) => {
  const [address, setAddress] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  
  // Filter States
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRadius, setSelectedRadius] = useState<string>('any');

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev => 
      prev.includes(id) 
        ? prev.filter(c => c !== id) 
        : [...prev, id]
    );
  };

  const executeSearch = (searchAddress: string, loc?: GeoLocation) => {
    const filters: SearchFilters = {
      categories: selectedCategories,
      radius: selectedRadius
    };
    onSearch(searchAddress, filters, loc);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim()) {
      executeSearch(address);
    }
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocalização não é suportada pelo seu navegador.");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        const loc: GeoLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        setAddress("Minha localização atual");
        executeSearch("Minha localização atual", loc);
      },
      (error) => {
        setIsLocating(false);
        console.error("Geolocation error:", error);
        alert("Não foi possível obter sua localização. Por favor, digite o endereço.");
      }
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8 animate-fade-in-up">
      <form onSubmit={handleSubmit} className="relative group z-10">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-blue-400 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative flex items-stretch bg-white rounded-lg shadow-xl ring-1 ring-gray-900/5">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            disabled={isLoading || isLocating}
            placeholder="Digite um endereço (ex: Av. Paulista, 1000)"
            className="block w-full px-6 py-4 text-gray-700 bg-transparent rounded-l-lg focus:outline-none placeholder-gray-400 text-lg"
          />
          
          <button
            type="button"
            onClick={handleUseLocation}
            disabled={isLoading || isLocating}
            className="px-4 text-gray-400 hover:text-primary-600 border-l border-gray-100 transition-colors"
            title="Usar minha localização"
          >
            {isLocating ? (
              <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </button>

          <button
            type="submit"
            disabled={isLoading || isLocating || !address.trim()}
            className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-r-lg transition-colors focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? '...' : 'Buscar'}
          </button>
        </div>
      </form>

      {/* Filters Section */}
      <div className="mt-4 bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-gray-200/60 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider w-full sm:w-auto mb-1 sm:mb-0 sm:mr-2 self-center">
              Categorias:
            </span>
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategories.includes(cat.id);
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => toggleCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                    isSelected
                      ? 'bg-primary-100 text-primary-700 border-primary-200 ring-2 ring-primary-100 ring-offset-1'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Divider on Mobile */}
          <div className="h-px w-full bg-gray-200 sm:hidden"></div>

          {/* Radius/Distance */}
          <div className="flex items-center gap-2">
             <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Distância:
            </span>
            <select
              value={selectedRadius}
              onChange={(e) => setSelectedRadius(e.target.value)}
              className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-1.5 pl-2 pr-6 outline-none cursor-pointer hover:border-gray-300 transition-colors"
            >
              {DISTANCES.map((dist) => (
                <option key={dist.id} value={dist.id}>
                  {dist.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Helper text if no categories selected (implies ALL) */}
        {selectedCategories.length === 0 && (
          <p className="text-xs text-gray-400 mt-2 text-center sm:text-left italic">
            Nenhuma categoria selecionada: buscaremos por todos os tipos sugeridos.
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
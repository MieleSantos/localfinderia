import React, { useState } from 'react';
import SearchInput from './components/SearchInput';
import ResultView from './components/ResultView';
import { SearchResult, GeoLocation, SearchFilters } from './types';
import { searchPlaces } from './services/geminiService';

const App: React.FC = () => {
  const [result, setResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (address: string, filters: SearchFilters, location?: GeoLocation) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await searchPlaces(address, filters, location);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro ao buscar os locais. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-primary-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-primary-600 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              LocalFinder <span className="text-primary-600">AI</span>
            </h1>
          </div>
          <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
            Sobre
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero Section */}
        <div className={`transition-all duration-500 ease-in-out ${result ? 'mb-8' : 'mb-16 mt-10 text-center'}`}>
          {!result && (
            <>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                Explore o que há <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-400">ao seu redor</span>
              </h2>
              <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
                Encontre mercados, farmácias e barbearias próximos com recomendações inteligentes alimentadas pelo Google Maps.
              </p>
            </>
          )}
          
          <SearchInput onSearch={handleSearch} isLoading={loading} />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative w-20 h-20">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-primary-600 rounded-full animate-spin border-t-transparent"></div>
            </div>
            <p className="mt-6 text-gray-500 font-medium animate-pulse">Consultando o Gemini e Google Maps...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <ResultView data={result} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8 mt-auto">
        <div className="max-w-5xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} LocalFinder AI. Alimentado por Gemini 2.5 Flash & Google Maps.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
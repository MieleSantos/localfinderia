import React from 'react';
import { SearchResult } from '../types';
import PlaceCard from './PlaceCard';

interface ResultViewProps {
  data: SearchResult;
}

const ResultView: React.FC<ResultViewProps> = ({ data }) => {
  // Improved markdown parser that handles inline bolding
  const formatText = (text: string) => {
    return text.split('\n').map((line, lineIndex) => {
      const trimmedLine = line.trim();
      
      if (!trimmedLine) return <br key={lineIndex} />;

      // Helper to parse inline bolding **text**
      const parseInline = (content: string) => {
        const parts = content.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>;
          }
          return part;
        });
      };

      // Headers (lines starting with **)
      if (trimmedLine.startsWith('**') && !trimmedLine.includes(':')) {
         // Assuming a standalone bold line is a header
         return <h3 key={lineIndex} className="text-lg font-bold mt-5 mb-2 text-gray-800">{parseInline(trimmedLine)}</h3>;
      }
      
      // Lists
      if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
        return (
          <li key={lineIndex} className="ml-4 text-gray-700 list-disc marker:text-primary-500 pl-1 mb-2">
            {parseInline(trimmedLine.substring(2))}
          </li>
        );
      }

      // Standard paragraphs
      return (
        <p key={lineIndex} className="text-gray-700 leading-relaxed mb-3">
          {parseInline(trimmedLine)}
        </p>
      );
    });
  };

  return (
    <div className="animate-fade-in-up space-y-8">
      
      {/* AI Analysis Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-primary-50 to-white px-6 py-4 border-b border-gray-100 flex items-center">
          <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-gray-800">Análise e Recomendações</h2>
        </div>
        <div className="p-6 md:p-8">
          <div className="prose prose-blue max-w-none text-gray-600">
            {formatText(data.text)}
          </div>
        </div>
      </div>

      {/* Map Places Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xl font-bold text-gray-900">Locais Encontrados no Mapa</h2>
          {data.places.length > 0 && (
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {data.places.length} resultados
            </span>
          )}
        </div>
        
        {data.places.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.places.map((place, index) => (
              <PlaceCard key={index} chunk={place} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 bg-white rounded-2xl border border-dashed border-gray-300">
            <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="mt-4 text-lg font-medium text-gray-600">Nenhum cartão de local gerado.</p>
            <p className="text-sm max-w-md mx-auto mt-2">
              O Gemini analisou a região, mas não retornou pinos de mapa específicos desta vez. Verifique os nomes sugeridos no texto acima e busque diretamente no Google Maps.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultView;
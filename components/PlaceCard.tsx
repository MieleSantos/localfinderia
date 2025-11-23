import React from 'react';
import { GroundingChunk } from '../types';

interface PlaceCardProps {
  chunk: GroundingChunk;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ chunk }) => {
  const mapData = chunk.maps;

  if (!mapData || !mapData.title || !mapData.uri) return null;

  const { title, uri } = mapData;

  // Helper function to categorize and style based on title/type
  const getCategoryStyles = (name: string) => {
    const lowerName = name.toLowerCase();
    
    if (lowerName.includes('mercado') || lowerName.includes('super') || lowerName.includes('market') || lowerName.includes('carrefour') || lowerName.includes('extra') || lowerName.includes('dia')) {
      return {
        label: 'Mercado',
        bg: 'bg-green-50',
        border: 'border-green-100',
        text: 'text-green-700',
        iconBg: 'bg-green-100',
        button: 'hover:bg-green-600 bg-green-500',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        )
      };
    } 
    
    if (lowerName.includes('farma') || lowerName.includes('drogaria') || lowerName.includes('remedio')) {
      return {
        label: 'Farmácia',
        bg: 'bg-red-50',
        border: 'border-red-100',
        text: 'text-red-700',
        iconBg: 'bg-red-100',
        button: 'hover:bg-red-600 bg-red-500',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        )
      };
    }
    
    if (lowerName.includes('barber') || lowerName.includes('cabelo') || lowerName.includes('salao') || lowerName.includes('barba') || lowerName.includes('beauty')) {
      return {
        label: 'Beleza',
        bg: 'bg-purple-50',
        border: 'border-purple-100',
        text: 'text-purple-700',
        iconBg: 'bg-purple-100',
        button: 'hover:bg-purple-600 bg-purple-500',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
          </svg>
        )
      };
    }

    // Default
    return {
      label: 'Local',
      bg: 'bg-white',
      border: 'border-gray-200',
      text: 'text-gray-700',
      iconBg: 'bg-gray-100',
      button: 'hover:bg-blue-600 bg-blue-500',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    };
  };

  const styles = getCategoryStyles(title);

  return (
    <div className={`relative flex flex-col justify-between p-5 rounded-2xl border ${styles.border} ${styles.bg} shadow-sm hover:shadow-lg transition-all duration-300 group`}>
      
      {/* Header with Icon and Label */}
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${styles.iconBg} ${styles.text}`}>
          {styles.icon}
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${styles.iconBg} ${styles.text} opacity-80`}>
          {styles.label}
        </span>
      </div>

      {/* Title */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-primary-600 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mt-2 flex items-center">
           <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
           </svg>
           Veja detalhes na análise
        </p>
      </div>

      {/* Action Button */}
      <a 
        href={uri} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`mt-auto flex items-center justify-center w-full py-3 px-4 rounded-xl text-white font-medium shadow-sm transition-all duration-300 transform group-hover:translate-y-[-2px] ${styles.button}`}
      >
        <span>Ver Rota e Distância</span>
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  );
};

export default PlaceCard;
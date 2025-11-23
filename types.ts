// types.ts

export interface GroundingChunk {
  maps?: {
    uri?: string;
    title?: string;
    placeId?: string;
  };
}

export interface SearchResult {
  text: string; // The markdown explanation from Gemini
  places: GroundingChunk[]; // The structured map data
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
}

export interface SearchFilters {
  categories: string[]; // e.g. ['mercado', 'farmacia']
  radius: string;       // e.g. '1km', '5km', 'any'
}
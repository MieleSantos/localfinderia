import { GoogleGenAI } from "@google/genai";
import { SearchResult, GroundingChunk, GeoLocation, SearchFilters } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Searches for places using Gemini with Google Maps Grounding.
 */
export const searchPlaces = async (
  query: string, 
  filters: SearchFilters,
  location?: GeoLocation
): Promise<SearchResult> => {
  try {
    const modelId = "gemini-2.5-flash";
    
    // 1. Build dynamic strings based on filters
    
    // Categories Logic
    let categoriesText = "Mercado, Farmácia e Beleza (Barbearia/Salão)";
    if (filters.categories && filters.categories.length > 0) {
      // Map IDs to friendly names if needed, or just use a switch/map
      const names = filters.categories.map(c => {
        if (c === 'mercado') return "Mercado/Supermercado";
        if (c === 'farmacia') return "Farmácia/Drogaria";
        if (c === 'beleza') return "Barbearia/Salão de Beleza";
        return c;
      });
      categoriesText = names.join(" e ");
    }

    // Radius Logic
    let distanceInstruction = "";
    if (filters.radius && filters.radius !== 'any') {
      distanceInstruction = `IMPORTANTE: Filtre rigorosamente locais num raio máximo de ${filters.radius} a partir do ponto de busca.`;
    } else {
      distanceInstruction = "Busque nas proximidades imediatas.";
    }

    // Construct a context-aware prompt that forces tool usage
    const promptText = `
      Localização/Busca: "${query}".

      TAREFA:
      Identifique e liste os melhores estabelecimentos APENAS nas seguintes categorias: ${categoriesText}.
      ${distanceInstruction}

      REQUISITOS OBRIGATÓRIOS:
      1. Use a ferramenta Google Maps para confirmar a existência real dos locais.
      2. Você DEVE citar explicitamente os nomes dos locais encontrados para que eles gerem cartões interativos.
      3. Na resposta de texto, para cada local, inclua a distância aproximada e um breve destaque.
      4. Use **negrito** nos nomes dos estabelecimentos.
      5. Se nenhum local for encontrado nas categorias selecionadas dentro da distância, avise claramente.

      Se a busca for muito vaga (ex: apenas um nome de rua sem número), procure no centro ou no ponto mais relevante dessa via.
    `;

    // Configure tools
    const config: any = {
      tools: [{ googleMaps: {} }],
    };

    // Add location context if available
    if (location) {
      config.toolConfig = {
        retrievalConfig: {
          latLng: {
            latitude: location.latitude,
            longitude: location.longitude
          }
        }
      };
    }

    const response = await ai.models.generateContent({
      model: modelId,
      contents: promptText,
      config: config,
    });

    // Use the .text property directly as recommended
    const text = response.text || "Não encontrei resultados específicos com estes filtros. Tente ampliar a busca.";
    
    // Extract grounding chunks safely
    const candidate = response.candidates?.[0];
    const chunks = candidate?.groundingMetadata?.groundingChunks || [];
    
    // Filter chunks to ensure they are actually map results and map to our local type
    const validMapChunks: GroundingChunk[] = chunks
      .filter((chunk: any) => chunk.maps?.title)
      .map((chunk: any) => ({
        maps: {
          uri: chunk.maps.uri,
          title: chunk.maps.title,
          placeId: chunk.maps.placeId
        }
      }));

    return {
      text: text,
      places: validMapChunks
    };

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // Handle the specific RPC error gracefully
    if (error.message && (error.message.includes("Rpc failed") || error.message.includes("500"))) {
         throw new Error("Ocorreu um erro temporário de conexão com o Google Maps. Por favor, tente novamente.");
    }
    throw error;
  }
};
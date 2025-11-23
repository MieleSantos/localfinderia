<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# LocalFinder AI 📍🤖

O **LocalFinder AI** é uma aplicação web inteligente que combina o poder de processamento de linguagem natural do Google Gemini com a precisão de dados geográficos do Google Maps. O objetivo é ajudar usuários a encontrarem estabelecimentos essenciais (Mercados, Farmácias e Salões de Beleza) com análises detalhadas e dados verificados.

## ✨ Funcionalidades

### 🔍 Busca Inteligente & Contextual
- **Entendimento de Linguagem Natural:** O usuário pode digitar endereços completos, nomes de bairros ou apenas referências vagas. A IA interpreta a intenção e localiza a área.
- **Geolocalização Automática:** Integração com a API do navegador para buscar estabelecimentos ao redor da posição atual do usuário com um clique.

### 🗺️ Google Maps Grounding (Dados Reais)
- **Veracidade:** Ao contrário de chatos comuns que podem "alucinar" endereços, este app utiliza a ferramenta `googleMaps` do Gemini para buscar locais reais existentes no Google Maps.
- **Cards Interativos:** Os resultados são apresentados em cartões visuais que contêm o nome, categoria e um link direto para abrir a rota no Google Maps.

### 🎛️ Filtros Avançados
- **Categorias Específicas:** O usuário pode filtrar a busca por:
  - 🛒 **Mercados** (Supermercados, Mercearias)
  - 💊 **Farmácias** (Drogarias)
  - ✂️ **Beleza** (Barbearias, Salões, Estética)
- **Controle de Raio/Distância:** Opção para limitar a busca a 1km, 5km, 10km ou sem limite de distância.

### 🎨 Interface Moderna (UI/UX)
- **Categorização Visual:** As categorias possuem cores temáticas para fácil identificação (Verde para mercados, Vermelho para farmácias, Roxo para beleza).
- **Formatador Markdown:** A análise textual da IA é renderizada com formatação rica (negrito, listas), facilitando a leitura das recomendações.
- **Design Responsivo:** Layout fluido construído com Tailwind CSS que funciona bem em mobile e desktop.

---

## 🚀 Tecnologias Usadas

### Frontend
- **[React 19](https://react.dev/):** Biblioteca principal para construção da interface reativa.
- **[TypeScript](https://www.typescriptlang.org/):** Para tipagem estática, garantindo segurança e melhor manutenção do código (interfaces para `SearchResult`, `GroundingChunk`, `SearchFilters`).
- **[Tailwind CSS](https://tailwindcss.com/):** Framework CSS utilitário para estilização rápida, animações e design responsivo.

### Inteligência Artificial & Backend Services
- **[Google Gemini API](https://ai.google.dev/):**
  - **SDK:** `@google/genai`
  - **Modelo:** `gemini-2.5-flash` (Otimizado para velocidade e eficiência).
  - **Tool Use (Grounding):** Utilização da ferramenta nativa de Google Maps para ancorar as respostas da IA em dados do mundo real.

---

## ⚙️ Como Funciona (Fluxo Técnico)

1. **Entrada:** O usuário insere um local ou usa o GPS, e seleciona filtros.
2. **Prompt Engineering:** O serviço (`geminiService.ts`) constrói um prompt dinâmico instruindo a IA a buscar apenas as categorias selecionadas dentro do raio estipulado.
3. **Chamada API:** O modelo `gemini-2.5-flash` recebe o prompt com a ferramenta `googleMaps` habilitada.
4. **Processamento:**
   - A IA consulta o Google Maps.
   - A IA gera uma resposta textual com recomendações e distâncias.
   - A API retorna metadados estruturados (`GroundingChunks`) com links e títulos dos locais.
5. **Renderização:** O React exibe o texto formatado e renderiza os `PlaceCards` com base nos dados estruturados retornados.

---

## 📦 Instalação e Execução

Para rodar este projeto localmente, você precisará de uma **API KEY** do Google AI Studio com acesso ao modelo Gemini 2.5 Flash.

1. Clone o repositório.
2. Certifique-se de ter uma variável de ambiente `API_KEY` configurada (ou injetada pelo seu ambiente de desenvolvimento).
3. O projeto utiliza importação de módulos ES6 diretamente no navegador (via `index.html`), não requerendo necessariamente um build step complexo para visualização simples, mas recomenda-se um servidor local (como Vite) para desenvolvimento.

---

Feito com 💙 usando **Gemini AI**.

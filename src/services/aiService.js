// src/services/aiService.js
import { DUMMY_MENUS } from '../Data/menus';
import { RESTAURANTES } from '../Data/restaurants'; // <--- IMPORTAMOS AMBOS

export const getAIRecommendations = (preferences) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let results = [...DUMMY_MENUS];

      // 1. Filtro Vegano
      if (preferences.veganOnly) {
        results = results.filter(item => item.isVegan === true);
      }

      // 2. Filtro de Búsqueda
      if (preferences.search) {
        const query = preferences.search.trim().toLowerCase();
        results = results.filter(item => 
          item.nombre.toLowerCase().includes(query) || 
          item.categoria.toLowerCase().includes(query) ||
          (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query)))
        );
      }

      // 3. CRUCIAL: Unir el plato con su restaurante
      // Esto hace que cada resultado tenga los datos del local (nombre, rating, etc.)
      const resultsWithRestaurant = results.map(plato => {
        const restaurante = RESTAURANTES.find(r => r.id === plato.restaurantId);
        return {
          ...plato,
          restaurantName: restaurante ? restaurante.nombre : 'Restaurante Desconocido',
          restaurantRating: restaurante ? restaurante.rating : 'N/A',
          deliveryTime: restaurante ? restaurante.entrega : '--'
        };
      });

      resolve(resultsWithRestaurant);
    }, 1200);
  });
};
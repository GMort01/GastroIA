// src/services/aiService.js
import { DUMMY_MENUS } from '../Data/menus';
import { RESTAURANTES } from '../Data/restaurants'; // <--- IMPORTAMOS AMBOS

export const getAIRecommendations = (preferences) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let results = [...DUMMY_MENUS];

      const dietType = preferences.dietType || 'carnivoro';
      if (dietType === 'vegano') {
        results = results.filter(item => item.isVegan === true);
      } else if (dietType === 'vegetariano') {
        results = results.filter(item =>
          item.isVegan === true ||
          (item.tags && item.tags.some(tag =>
            tag.toLowerCase().includes('vegetariana') || tag.toLowerCase().includes('vegana') || tag.toLowerCase().includes('vegano')
          ))
        );
      }

      const allergies = (preferences.allergies || []).map((allergy) => allergy.trim().toLowerCase()).filter(Boolean);
      const allergyKeywordsMap = {
        gluten: ['pizza', 'tortilla', 'burrito', 'wrap', 'brownie', 'tarta', 'galleta', 'pan', 'tempura', 'ramen', 'sushi', 'roll', 'fajitas', 'cheesecake', 'tiramisu', 'masa', 'crouton', 'galletas', 'pastel'],
        lacteos: ['queso', 'leche', 'mascarpone', 'parmesano', 'mozzarella', 'cheddar', 'crema', 'helado', 'yogur', 'mantequilla', 'manteca', 'cheesecake', 'tiramisu', 'brownie'],
        huevo: ['huevo', 'tiramisu', 'omelet', 'mayonesa', 'caesar', 'ramen', 'brownie', 'aliño'],
        mariscos: ['camarón', 'mariscos', 'langostinos', 'mejillones', 'almejas', 'paella', 'ceviche', 'camarones'],
        pescado: ['salmón', 'atún', 'pescado', 'sashimi', 'ceviche'],
        soya: ['soja', 'miso', 'edamame', 'tamarindo', 'tamari', 'salsa de soya', 'soy', 'aderezo', 'soya'],
        mani: ['cacahuete', 'maní', 'cacahuates', 'peanut'],
        nueces: ['almendra', 'nuez', 'nueces', 'avellana', 'pistacho'],
      };

      if (allergies.length > 0) {
        results = results.filter((item) => {
          const itemText = [item.nombre, item.descripcion, ...(item.tags || [])].join(' ').toLowerCase();
          return !allergies.some((allergy) => {
            const normalizedAllergy = allergy.replace(/\s+/g, '').replace(/í/g, 'i').replace(/é/g, 'e').replace(/á/g, 'a').replace(/ó/g, 'o').replace(/ú/g, 'u');
            const aliases = allergyKeywordsMap[normalizedAllergy] || [normalizedAllergy];
            return aliases.some((keyword) => itemText.includes(keyword));
          });
        });
      }

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
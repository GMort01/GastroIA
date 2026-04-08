// Data/menus.js

export const DUMMY_MENUS = [
  // PIZZAS
  { id: '1', restaurantId: 'r1', nombre: 'Pizza Margherita', precio: 25000, categoria: 'Pizza', descripcion: 'Tomate San Marzano, mozzarella de búfala y albahaca fresca.', popular: true, isVegan: false, tags: ['pizza', 'italiana', 'vegetariana'] },
  { id: '2', restaurantId: 'r1', nombre: 'Pizza Diávola', precio: 28000, categoria: 'Pizza', descripcion: 'Salami picante, peperoncino y mozzarella.', isVegan: false, tags: ['pizza', 'italiana', 'picante'] },
  { id: '3', restaurantId: 'r6', nombre: 'Pizza Fugazzeta', precio: 26000, categoria: 'Pizza', descripcion: 'Mucha cebolla, queso mozzarella y orégano premium.', isVegan: false, tags: ['pizza', 'argentina', 'cebolla'] },
  { id: '16', restaurantId: 'r1', nombre: 'Pizza Quattro Stagioni', precio: 30000, categoria: 'Pizza', descripcion: 'Champiñones, jamón, alcachofas y aceitunas.', isVegan: false, tags: ['pizza', 'italiana', 'cuatro estaciones'] },
  { id: '17', restaurantId: 'r6', nombre: 'Pizza Calabresa', precio: 27500, categoria: 'Pizza', descripcion: 'Salchicha calabresa, mozzarella y orégano.', isVegan: false, tags: ['pizza', 'argentina', 'calabresa'] },
  { id: '18', restaurantId: 'r1', nombre: 'Pizza Vegetariana', precio: 26500, categoria: 'Pizza', descripcion: 'Pimientos, champiñones, cebolla y mozzarella.', isVegan: false, tags: ['pizza', 'italiana', 'vegetariana'] },
  { id: '19', restaurantId: 'r6', nombre: 'Pizza Napolitana', precio: 25500, categoria: 'Pizza', descripcion: 'Tomate, mozzarella, anchoas y orégano.', isVegan: false, tags: ['pizza', 'napolitana', 'anchoas'] },

  // HAMBURGUESA
  { id: '4', restaurantId: 'r2', nombre: 'Bacon Cheese Burger', precio: 22000, categoria: 'Hamburguesa', descripcion: 'Carne angus 200g, cheddar fundido y tocino crujiente.', isVegan: false, tags: ['hamburguesa', 'bacon', 'cheddar'] },
  { id: '5', restaurantId: 'r2', nombre: 'Truffle Burger', precio: 35000, categoria: 'Hamburguesa', descripcion: 'Salsa de trufa negra, champiñones salteados y queso suizo.', isVegan: false, tags: ['hamburguesa', 'trufa', 'gourmet'] },
  { id: '20', restaurantId: 'r2', nombre: 'Veggie Burger', precio: 20000, categoria: 'Hamburguesa', descripcion: 'Hamburguesa de lentejas, lechuga, tomate y mayonesa vegana.', isVegan: true, tags: ['hamburguesa', 'vegetariana', 'vegana'] },
  { id: '21', restaurantId: 'r2', nombre: 'BBQ Burger', precio: 24000, categoria: 'Hamburguesa', descripcion: 'Carne angus con salsa BBQ, cebolla caramelizada y bacon.', isVegan: false, tags: ['hamburguesa', 'bbq', 'bacon'] },
  { id: '22', restaurantId: 'r2', nombre: 'Mushroom Swiss Burger', precio: 26000, categoria: 'Hamburguesa', descripcion: 'Champiñones salteados, queso suizo y cebolla.', isVegan: false, tags: ['hamburguesa', 'champiñones', 'suizo'] },

  // ASIÁTICA / SUSHI
  { id: '6', restaurantId: 'r3', nombre: 'California Roll', precio: 24000, categoria: 'Sushi', descripcion: 'Cangrejo, aguacate y pepino con sésamo.', isVegan: false, tags: ['sushi', 'california', 'roll'] },
  { id: '7', restaurantId: 'r3', nombre: 'Ramen Miso Especial', precio: 32000, categoria: 'Asiática', descripcion: 'Caldo de 12 horas, huevo marinado, chashu y fideos artesanales.', isVegan: false, tags: ['ramen', 'miso', 'especial'] },
  { id: '8', restaurantId: 'r5', nombre: 'Pad Thai de Langostinos', precio: 28000, categoria: 'Asiática', descripcion: 'Fideos de arroz, brotes de soja, cacahuetes y salsa tamarindo.', isVegan: false, tags: ['pad thai', 'langostinos', 'tailandesa'] },
  { id: '23', restaurantId: 'r3', nombre: 'Sushi Sashimi Mix', precio: 36000, categoria: 'Sushi', descripcion: 'Variedad de sashimi fresco: salmón, atún y pez mantequilla.', isVegan: false, tags: ['sushi', 'sashimi', 'fresco'] },
  { id: '24', restaurantId: 'r5', nombre: 'Khao Man Gai', precio: 22000, categoria: 'Asiática', descripcion: 'Arroz jazmín con pollo, salsa de jengibre y sopa.', isVegan: false, tags: ['tailandesa', 'pollo', 'arroz'] },
  { id: '25', restaurantId: 'r3', nombre: 'Tempura de Verduras', precio: 20000, categoria: 'Asiática', descripcion: 'Verduras frescas rebozadas en tempura.', isVegan: true, tags: ['tempura', 'verduras', 'vegana'] },
  { id: '26', restaurantId: 'r5', nombre: 'Curry Verde Tailandés', precio: 26500, categoria: 'Asiática', descripcion: 'Curry verde con coco, verduras y arroz jazmín.', isVegan: true, tags: ['curry', 'verde', 'vegano'] },

  // MEXICANA
  { id: '9', restaurantId: 'r4', nombre: 'Tacos al Pastor (3 unidades)', precio: 20000, categoria: 'Mexicana', descripcion: 'Cerdo marinado, piña, cebolla y cilantro.', isVegan: false, tags: ['tacos', 'pastor', 'cerdo'] },
  { id: '10', restaurantId: 'r4', nombre: 'Burrito de Arranchera', precio: 26000, categoria: 'Mexicana', descripcion: 'Frijoles refritos, arroz, queso y carne de res premium.', isVegan: false, tags: ['burrito', 'arranchera', 'res'] },
  { id: '27', restaurantId: 'r4', nombre: 'Quesadillas de Pollo', precio: 18000, categoria: 'Mexicana', descripcion: 'Tortillas de maíz con pollo, queso y salsa.', isVegan: false, tags: ['quesadillas', 'pollo', 'queso'] },
  { id: '28', restaurantId: 'r4', nombre: 'Enchiladas Verdes', precio: 24000, categoria: 'Mexicana', descripcion: 'Tortillas rellenas de pollo con salsa verde y queso.', isVegan: false, tags: ['enchiladas', 'verdes', 'pollo'] },
  { id: '29', restaurantId: 'r4', nombre: 'Fajitas de Vegetales', precio: 22000, categoria: 'Mexicana', descripcion: 'Pimientos, cebolla, champiñones salteados con tortillas.', isVegan: true, tags: ['fajitas', 'vegetales', 'veganas'] },

  // SALUDABLE / OTROS
  { id: '11', restaurantId: 'r7', nombre: 'Ensalada Caesar Gourmet', precio: 18500, categoria: 'Saludable', descripcion: 'Pollo a la parrilla, croutons, parmesano y aderezo casero.', isVegan: false, tags: ['ensalada', 'caesar', 'pollo'] },
  { id: '12', restaurantId: 'r7', nombre: 'Poke Bowl Salmón', precio: 29500, categoria: 'Saludable', descripcion: 'Salmón fresco, edamame, mango y base de arroz de sushi.', isVegan: false, tags: ['poke', 'salmón', 'bowl'] },
  { id: '30', restaurantId: 'r7', nombre: 'Quinoa Bowl Vegano', precio: 24000, categoria: 'Saludable', descripcion: 'Quinoa, verduras asadas, aguacate y tahini.', isVegan: true, tags: ['quinoa', 'vegano', 'bowl'] },
  { id: '31', restaurantId: 'r7', nombre: 'Smoothie Bowl', precio: 16000, categoria: 'Saludable', descripcion: 'Frutas mixtas, granola y miel.', isVegan: false, tags: ['smoothie', 'frutas', 'bowl'] },
  { id: '32', restaurantId: 'r7', nombre: 'Wrap de Pollo', precio: 20000, categoria: 'Saludable', descripcion: 'Pollo grillado, verduras y aderezo light.', isVegan: false, tags: ['wrap', 'pollo', 'light'] },

  // MARISCOS
  { id: '13', restaurantId: 'r8', nombre: 'Ceviche Clásico', precio: 36000, categoria: 'Mariscos', descripcion: 'Pescado blanco del día marinado en leche de tigre.', isVegan: false, tags: ['ceviche', 'pescado', 'clásico'] },
  { id: '33', restaurantId: 'r8', nombre: 'Paella de Mariscos', precio: 40000, categoria: 'Mariscos', descripcion: 'Arroz con calamares, mejillones, gambas y azafrán.', isVegan: false, tags: ['paella', 'mariscos', 'arroz'] },
  { id: '34', restaurantId: 'r8', nombre: 'Tacos de Camarón', precio: 30000, categoria: 'Mariscos', descripcion: 'Camarones al ajillo con cilantro y limón.', isVegan: false, tags: ['tacos', 'camarón', 'mariscos'] },
  { id: '35', restaurantId: 'r8', nombre: 'Sopa de Almejas', precio: 28000, categoria: 'Mariscos', descripcion: 'Almejas frescas en caldo de vino blanco.', isVegan: false, tags: ['sopa', 'almejas', 'fresco'] },

  // POSTRES
  { id: '14', restaurantId: 'r9', nombre: 'Tiramisú Artesanal', precio: 12000, categoria: 'Postres', descripcion: 'Café expreso, mascarpone y cacao puro.', isVegan: false, tags: ['tiramisu', 'artesanal', 'café'] },
  { id: '15', restaurantId: 'r9', nombre: 'Brownie con Helado', precio: 11000, categoria: 'Postres', descripcion: 'Chocolate 70% cacao con helado de vainilla bourbon.', isVegan: false, tags: ['brownie', 'helado', 'chocolate'] },
  { id: '36', restaurantId: 'r9', nombre: 'Cheesecake de Frutos Rojos', precio: 14000, categoria: 'Postres', descripcion: 'Base de galleta, queso crema y coulis de frutos rojos.', isVegan: false, tags: ['cheesecake', 'frutos rojos', 'cremoso'] },
  { id: '37', restaurantId: 'r9', nombre: 'Tarta de Manzana', precio: 13000, categoria: 'Postres', descripcion: 'Manzanas caramelizadas con canela y masa hojaldre.', isVegan: false, tags: ['tarta', 'manzana', 'canela'] },
  { id: '38', restaurantId: 'r9', nombre: 'Helado Vegano de Coco', precio: 9000, categoria: 'Postres', descripcion: 'Helado cremoso de coco con toppings.', isVegan: true, tags: ['helado', 'coco', 'vegano'] }
];
## 🍔 GastroIA: Asistente de Antojos y Calculadora de Pedidos
Una aplicación móvil interactiva que ayuda a los usuarios a decidir qué comer según su antojo y presupuesto, integrando una calculadora de pedidos y propinas.

Este proyecto es el entregable del Reto Expo MVP de Utilidad Instantánea para la asignatura de Desarrollo de Aplicaciones Móviles de la Fundación Universitaria Católica Lumen Gentium (UNICATÓLICA).

---

## 📋 Descripción del Proyecto
GastroIA resuelve el problema cotidiano de "no saber qué comer". El usuario ingresa su antojo y presupuesto, y el sistema filtra recomendaciones. Además, implementamos la "Opción 1" sugerida en clase (Calculadora de Propinas): el usuario puede agregar platillos a un carrito virtual y calcular el total de su pedido sumando el costo de envío y seleccionando dinámicamente el porcentaje de propina deseado.

---

## ✨ Características Principales (Requisitos del MVP)
Interfaz Responsiva: Construida utilizando Flexbox y StyleSheet para adaptarse a diferentes pantallas.

Manejo de Estado Local: Uso intensivo del hook useState para capturar inputs, procesar filtros matemáticos, manejar arreglos (carrito) y calcular totales en tiempo real.

Renderizado Condicional: Navegación fluida entre pantallas (Inicio, Resultados y Checkout) usando renderizado condicional puro, cumpliendo la restricción de no usar librerías de navegación complejas.

---

## 🛠️ Tecnologías y Herramientas Utilizadas
React Native: Framework principal para el desarrollo móvil.

Expo: Conjunto de herramientas y servicios (usando la estructura de Expo Router).

TypeScript: Tipado estático para un código más robusto y seguro (ej. interface Platillo).

Componentes Core: View, Text, TextInput, TouchableOpacity, FlatList.

---

## 👥 Equipo de Desarrollo
Manuel Morales Martinez - 406384

Meredith Stefany Olave Salazar - 398964

---

## 🚀 Guía de Instalación y Ejecución
Para poner en marcha el proyecto localmente, sigue estos pasos:

### 1. Clonar el repositorio
1. `git clone 
2. Terminal: `cd GastroIA`
---
## 2. 📦 Comandos de Instalación Esenciales (Terminal)
1. `npm install`
2. `npm install @react-navigation/native @react-navigation/native-stack`
3. `npx expo install react-native-screens react-native-safe-area-context`
4. `npm install @expo/vector-icons`
---
### 3. Iniciar el entorno de desarrollo
Inicia Expo Go mediante el comando: Terminal: `npx expo start`

---
## 4. 🛠️ ¿Qué es lo que realmente se descarga?
Cuando ejecutas esos comandos, se crea o se actualiza una carpeta llamada node_modules. Aquí te explico qué contienen las partes más importantes:

1. react-native-safe-area-context: Es el que evita que el contenido de la app se meta debajo de la cámara ("notch") o de la barra de estado de los celulares modernos.

2. react-native-screens: Optimiza la memoria del teléfono para que las pantallas que no estás viendo no consuman recursos.

3. @expo/vector-icons: Contiene todas las familias de íconos que usamos en el HeaderComponent y en el ProSideMenu.Cuando ejecutas esos comandos, se crea o se actualiza una carpeta llamada node_modules. Aquí te explico qué contienen las partes más importantes:
---
## 🚀 Una última recomendación Pro
Si en algún momento sientes que la app "se vuelve loca" o no reconoce una librería que acabas de instalar, el comando de limpieza profunda es tu mejor amigo:
**Terminal:** `npx expo start -c`

---
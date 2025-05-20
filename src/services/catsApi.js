// src/services/catsApi.js

import { peticionesfetch } from "../utils/apiUtils";
import CatModel from "../models/catModel";

// 1. Obtenemos la clave de API desde las variables de entorno
const CAT_API_KEY = import.meta.env.VITE_CAT_API_KEY || 'your-default-key';
// 2. Definimos la URL base de la API
const CAT_API_URL = 'https://api.thecatapi.com/v1';

// 3. Función para obtener todas las razas de gatos
export const getAllCatBreeds = async () => {

    const url = `${CAT_API_URL}/breeds`;
    const mensajeError = "Error fetching cat breed";
    
    const response = await peticionesfetch(url,CAT_API_KEY,mensajeError);

    // Assuming the API returns a JSON object with a 'data' property containing the array of breeds
    console.log(response);
    const catBreeds = response.map(breedData => new CatModel(breedData));
    return catBreeds;

};

// 9. Función para obtener imágenes de una raza específica
export const getCatImagesByBreed = async (breedId) => {

    const url = `${CAT_API_URL}/images/search?breed_ids=${breedId}&limit=10`;
    const mensajeError = 'Error fetching cat images';
    return peticionesfetch(url,CAT_API_KEY,mensajeError);
    
};

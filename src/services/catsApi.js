// src/services/catsApi.js

import CatModel from "../models/catModel";
import { peticionesfetch } from "../utils/apiUtils";

// 1. Obtenemos la clave de API desde las variables de entorno
const CAT_API_KEY = import.meta.env.VITE_CAT_API_KEY || 'your-default-key';
// 2. Definimos la URL base de la API
const CAT_API_URL = import.meta.env.VITE_CAT_API_URL;

// 3. Función para obtener todas las razas de gatos
export const getAllCatBreeds = async () => {

    const url = `${CAT_API_URL}`;
    const mensajeError = "Error fetching cat breed";
    
    const response = await peticionesfetch(url,CAT_API_KEY,mensajeError);

    
    console.log(response);
    const catBreeds = response.data.map(breedData => new CatModel(breedData));
    return catBreeds;

};

export const getCatById = async (breedId) => {

    const url = `${CAT_API_URL}/${breedId}`;
    const mensajeError = 'Error fetching cat id';
    const response =  await peticionesfetch(url,CAT_API_KEY,mensajeError);
    const catBreed = response.data;
    return catBreed;
    
};

// 9. Función para obtener imágenes de una raza específica
export const getCatImageById = async (breedId) => {
  try {
    const cat = await getCatById(breedId);
    return cat.images_urls[0];
  } catch (error) {
    console.error("Error fetching cat image:", error);
    return null; // Or throw the error, depending on your error handling strategy
  }
};

//Para obtener lista de imagenes
export const getCatImageUrlsById = async (breedId) => {
  try {
    const cat = await getCatById(breedId);
    return cat.images_urls;
  } catch (error) {
    console.error("Error fetching cat images:", error);
    return []; // Or throw the error, depending on your error handling strategy
  }
};

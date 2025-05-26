import CatModel from "../models/catModel";
import { peticionesfetch } from "../utils/apiUtils";

const CAT_API_KEY = import.meta.env.VITE_CAT_API_KEY || 'your-default-key';
const CAT_API_URL = import.meta.env.VITE_CAT_API_URL;

export const getAllCatBreeds = async () => {

    const url = `${CAT_API_URL}`;
    const mensajeError = "Error fetching cat breed";
    
    const response = await peticionesfetch(url,CAT_API_KEY,mensajeError);

    
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

export const getCatImageById = async (breedId) => {
  try {
    const cat = await getCatById(breedId);
    return cat.images_urls[0];
  } catch (error) {
    console.error("Error fetching cat image:", error);
    return null;
  }
};

export const getCatImageUrlsById = async (breedId) => {
  try {
    const cat = await getCatById(breedId);
    return cat.images_urls;
  } catch (error) {
    console.error("Error fetching cat images:", error);
    return [];
  }
};

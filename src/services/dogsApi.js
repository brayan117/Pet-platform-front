import { peticionesfetch } from "../utils/apiUtils";
import DogModel from "../models/dogModel";

// src/services/dogsApi.js
const DOG_API_KEY = import.meta.env.VITE_DOG_API_KEY || 'your-default-key';
const DOG_API_URL = 'https://petplatformback-duateac4dbh3bahj.canadacentral-01.azurewebsites.net/api/dogs/breeds';

export const getAllDogBreeds = async () => {
  
  const url = `${DOG_API_URL}`;
  const mensajeError = 'Error fetching dog breeds';

  const response = await peticionesfetch(url, DOG_API_KEY, mensajeError);

  // Assuming the API returns a JSON object with a 'data' property containing the array of breeds
  const dogBreeds = response.data.map(breedData => new DogModel(breedData));
  return dogBreeds;
};

export const getDogById = async (breedId) => {
 

  const url = `${DOG_API_URL}/${breedId}`;
  const mensajeError = 'Error id dog';

  return peticionesfetch(url,DOG_API_KEY, mensajeError);
};

export const getDogImageById = async (breedId) => {
  try {
    const dog = await getDogById(breedId);
    return dog.data.images_urls[0];
  } catch (error) {
    console.error("Error fetching dog image:", error);
    return null; // Or throw the error, depending on your error handling strategy
  }
};

export const getDogImageUrlsById = async (breedId) => {
  try {
    const dog = await getDogById(breedId);
    return dog.data.images_urls;
  } catch (error) {
    console.error("Error fetching dog images:", error);
    return []; // Or throw the error, depending on your error handling strategy
  }
};

export const getDogImagesByBreed = async (breedId) => {
 

  const url = `${DOG_API_URL}/images/search?breed_ids=${breedId}&limit=10`;
  const mensajeError = 'Error fetching dog images';

  return peticionesfetch(url,DOG_API_KEY, mensajeError);
};

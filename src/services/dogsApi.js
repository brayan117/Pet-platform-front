import { peticionesfetch } from "../utils/apiUtils";
import DogModel from "../models/dogModel";

// src/services/dogsApi.js
const DOG_API_KEY = import.meta.env.VITE_DOG_API_KEY || 'your-default-key';
const DOG_API_URL = import.meta.env.VITE_DOG_API_URL;

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
  const mensajeError = 'Error fetching dog id';
  const response =  await peticionesfetch(url,DOG_API_KEY,mensajeError);
  const dogBreed = response.data;
  return dogBreed;

};

export const getDogImageById = async (breedId) => {
  try {
    const dog = await getDogById(breedId);
    return dog.images_urls[0];
  } catch (error) {
    console.error("Error fetching dog image:", error);
    return null; // Or throw the error, depending on your error handling strategy
  }
};

export const getDogImageUrlsById = async (breedId) => {
  try {
    const dog = await getDogById(breedId);
    return dog.images_urls;
  } catch (error) {
    console.error("Error fetching dog images:", error);
    return []; // Or throw the error, depending on your error handling strategy
  }
};

// src/services/usersApi.js

import UserModel from "../models/userModel";
import { fetchApi, peticionesfetch } from "../utils/apiUtils";

const USER_API_URL = import.meta.env.VITE_USER_API_URL;
const API_KEY = import.meta.env.VITE_USER_API_KEY;
export const ApiPetTypes={
    "perros": "dogs",
    "gatos": "cats"
}

export const getAllUsers = async () => {
    const url = `${USER_API_URL}`;
    const mensajeError = "Error fetching users";
    const response = await peticionesfetch(url, API_KEY, mensajeError);
    const users = response.data.map(userData => new UserModel(userData));
    return users;
};

export const getUserById = async (userId) => {
    const url = `${USER_API_URL}/${userId}`;
    const mensajeError = "Error fetching user";
    const response = await peticionesfetch(url, API_KEY, mensajeError);
    const user = response.data;
    return new UserModel(user);
};

export const createUser = async (userData) => {
    const url = `${USER_API_URL}`;
    const mensajeError = "Error creating user";
    const data = await fetchApi(url, 'POST', API_KEY, mensajeError, userData);
    return new UserModel(data.data);
};

export const updateUser = async (userId, userData) => {
    const url = `${USER_API_URL}/${userId}`;
    const mensajeError = "Error updating user";
    const response = await fetchApi(url, 'PUT', API_KEY, mensajeError, userData);
    return response.data;
};

export const deleteUser = async (userId) => {
    const url = `${USER_API_URL}/${userId}`;
    const mensajeError = "Error deleting user";
    const data = await fetchApi(url, 'DELETE', API_KEY, mensajeError);
    return data;
};

export const addFavorite = async (userId, breedId, petType) => {
    let url = `${USER_API_URL}/${userId}/favorites/${ApiPetTypes[petType]}/${breedId}`;
    const mensajeError = "Error adding favorite";
    const data = await fetchApi(url, 'POST', API_KEY, mensajeError);
    return data;
}

export const removeFavorite = async (userId, breedId, petType) => {
    let url = `${USER_API_URL}/${userId}/favorites/${breedId}?pet_type=${ApiPetTypes[petType].replace("s", "")}`;
    const mensajeError = "Error removing favorite";
    const data = await fetchApi(url, 'DELETE', API_KEY, mensajeError);
    return data;
};

export const getFavorites = async (userId, petType) => {
    let url = `${USER_API_URL}/${userId}/favorites?pet_type=${ApiPetTypes[petType].replace("s", "")}`;
    const mensajeError = "Error getting favorites";
    const data = await fetchApi(url, 'GET', API_KEY, mensajeError);
    return data.data;
};

// src/services/usersApi.js

import { peticionesfetch } from "../utils/apiUtils";
import UserModel from "../models/userModel";

const USER_API_URL = 'https://petplatformback-duateac4dbh3bahj.canadacentral-01.azurewebsites.net/api/users';
const API_KEY = ''; 

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
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error(`Error creating user: ${response.status}`);
        }

        const data = await response.json();
        return new UserModel(data);
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

export const updateUser = async (userId, userData) => {
    const url = `${USER_API_URL}/${userId}`;
    const mensajeError = "Error updating user";
    const response = await peticionesfetch(url, API_KEY, mensajeError, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    return response.data;
};

export const deleteUser = async (userId) => {
    const url = `${USER_API_URL}/${userId}`;
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'x-api-key': API_KEY
            }
        });

        if (!response.ok) {
            throw new Error(`Error deleting user: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};

export const addCatToFavorites = async (userId, breedId) => {
    const url = `${USER_API_URL}/${userId}/favorites/cats/${breedId}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'x-api-key': API_KEY
            }
        });
        if (!response.ok) {
            throw new Error(`Error adding cat to favorites: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error adding cat to favorites:", error);
        throw error;
    }
};

export const addDogToFavorites = async (userId, breedId) => {
    const url = `${USER_API_URL}/${userId}/favorites/dogs/${breedId}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'x-api-key': API_KEY
            }
        });
        if (!response.ok) {
            throw new Error(`Error adding dog to favorites: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error adding dog to favorites:", error);
        throw error;
    }
};

export const removeFavorite = async (userId, breedId, petType) => {
    let url = `${USER_API_URL}/${userId}/favorites/${breedId}`;
    if (petType === 'perro') {
        url += `?pet_type=dog`;
    }
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'x-api-key': API_KEY
            }
        });
        if (!response.ok) {
            throw new Error(`Error removing favorite: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error removing favorite:", error);
        throw error;
    }
};

export const getFavorites = async (userId, petType) => {
    let url = `${USER_API_URL}/${userId}/favorites`;
    if (petType) {
        url += `?pet_type=${petType}`;
    }
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'x-api-key': API_KEY
            }
        });
        if (!response.ok) {
            throw new Error(`Error getting favorites: ${response.status}`);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error getting favorites:", error);
        throw error;
    }
};

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
    const mensajeError = "Error creating user";
    const response = await peticionesfetch(url, API_KEY, mensajeError, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    return response.data;
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
    const mensajeError = "Error deleting user";
    const response = await peticionesfetch(url, API_KEY, mensajeError, {
        method: 'DELETE'
    });
    return response.data;
};

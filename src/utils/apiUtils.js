import { getCachedData, setCachedData } from './indexedDbHelper';

export const peticionesfetch = async (url, api_key, mensajeError) => {
  try {
    const cached = await getCachedData(url);
    if (cached) {
      return cached;
    }

    const response = await fetch(url, {
      headers: {
        'x-api-key': api_key
      }
    });

    if (!response.ok) {
      throw new Error(`${mensajeError}`);
    }

    const data = await response.json();
    await setCachedData(url, data);
    return data;

  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

import { clearCache } from './indexedDbHelper';

export const fetchApi = async (url, method, apiKey, errorMessage, body = null) => {
  const options = {
    method,
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json'
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`${errorMessage}: ${response.status} - ${errorData.message || response.statusText}`);
    }

    //clear cache when POST, PUT or DELETE
    if (['POST', 'PUT', 'DELETE'].includes(method.toUpperCase())) {
      await clearCache();
    }

    if (response.status === 204 || method === 'DELETE') {
      return true;
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error (${method} ${url}):`, error);
    throw error;
  }
};

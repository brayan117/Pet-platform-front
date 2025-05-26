export const peticionesfetch = async (url, api_key, mensajeError) => {
  try {
    const response = await fetch(`${url}`, {
      headers: {
        'x-api-key': api_key
      }
    });

    if (!response.ok) {
      throw new Error(`${mensajeError}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error; // Re-throw the error so it can be caught by the caller
  }
};

export const fetchApi = async (url, method, apiKey, errorMessage, body = null) => {
  const options = {
    method: method,
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
      const errorData = await response.json().catch(() => ({})); // Try to parse error response
      throw new Error(`${errorMessage}: ${response.status} - ${errorData.message || response.statusText}`);
    }

    // For DELETE requests, the response might not have a body
    if (response.status === 204 || method === 'DELETE') {
      return true; 
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error (${method} ${url}):`, error);
    throw error;
  }
};

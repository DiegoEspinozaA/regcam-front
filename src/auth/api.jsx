const apiUrl = 'http://localhost:3000'; // Reemplaza con la URL de tu servidor

export const login = async (username, password) => {
  try {
    const response = await fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Credenciales incorrectas');
    }

    const user = await response.json();
    return user;
  } catch (error) {
    throw error;
  }
};

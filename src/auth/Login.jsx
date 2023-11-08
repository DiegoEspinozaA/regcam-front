import React, { useState } from 'react';
import Link from '../Apiconf';
function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    // Realiza una solicitud al servidor para autenticar al usuario
    const response = await fetch(Link+'/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    
    console.log(response)
    if (response.ok) {
      // Si la autenticación es exitosa, obtén el token y llama a la función onLogin
      const data = await response.json();
      const token = data.token;
      const user = data.user;
      onLogin(token, user);
    } else {
      // Si la autenticación falla, muestra un mensaje de error
      console.error('Error de inicio de sesión');
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}

export default Login;

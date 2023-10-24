const BASE_URL = "http://localhost:3001";

function createHeaders() {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    // Puedes agregar más encabezados personalizados aquí si es necesario
    return headers;
  }

export function fetchData(endpoint) {
  const url = `${BASE_URL}/${endpoint}`;
  return fetch(url, {
    method: "GET",
    headers: createHeaders(),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al recuperar los datos de la API");
      }
      return response.json();
    });
}

export function postData(endpoint, data) {
  const url = `${BASE_URL}/${endpoint}`;
  return fetch(url, {
    method: "POST",
    headers: createHeaders(),
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al enviar los datos a la API");
      }
      return response.json();
    });
}

export function updateData(endpoint, id, data) {
    const url = `${BASE_URL}/${endpoint}/${id}`;
    console.log(url);
    return fetch(url, {
      method: "PUT", // Utiliza el método PUT para actualizar datos
      headers: createHeaders(),
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al actualizar los datos en la API");
        }
        return response.json();
      });
  }
  
// Otras funciones para PUT, DELETE, etc.

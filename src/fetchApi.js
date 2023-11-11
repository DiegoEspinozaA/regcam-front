const BASE_URL = "http://localhost:3001";


function createHeaders() {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
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


export const actualizarRegistro = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/actualizarRegistro`, {
      method: 'POST',
      headers: createHeaders(),
      body: JSON.stringify(formData),
    });
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error en la solicitud HTTP:', error);
    return false;

    
  }

  
};

export const actualizarYSetearRegistros = async (formData, dispatch, state) => {
  const exito = await actualizarRegistro(formData);
  if (exito) {
    try {
      const nuevosRegistros = await fetchData('registros');
      dispatch({ type: 'SET_REGISTROS', payload: nuevosRegistros });
      return true;
    } catch (error) {
      console.error('Error al obtener nuevos registros:', error);
    }
  }
  return false;
};

export const agregarYSetearRegistros = async (formData, dispatch) => {


  try {
    const fechaChileISO = new Date().toLocaleString('sv-SE', { timeZone: 'America/Santiago' });
    const newFormData = {
      ...formData,
      fecha: fechaChileISO,
    };

    if (newFormData.tipo.length === 0 || newFormData.fecha.length === 0 || newFormData.descripcion.length === 0 || newFormData.id_camara.length === 0) {
      return false; // Indica que la operación no tuvo éxito
    }

    const postResponse = await fetch(BASE_URL + '/guardarRegistro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFormData),
    });

    if (postResponse.ok) {
      // Después de agregar el registro, actualiza la lista de registros
      const registrosResponse = await fetch(BASE_URL + '/registros');
      const registrosData = await registrosResponse.json();
      dispatch({ type: 'SET_REGISTROS', payload: registrosData });

      

      return true; // Indica que la operación tuvo éxito
    } else {
      return false; // Indica que la operación no tuvo éxito
    }
  } catch (error) {
    console.error('Error en la solicitud HTTP:', error);
    return false; // Indica que la operación no tuvo éxito debido a un error
  }
};


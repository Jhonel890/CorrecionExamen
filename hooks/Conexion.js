let URL = "https://computacion.unl.edu.ec/pdml/examen1/";
export function url_api() {
  return URL;
}

export async function obtener(recurso) {
  const response = await fetch(URL + recurso);
  return await response.json();
}


export async function enviar(recurso, data, key = "") {
  let headers = [];

  if (key !== "") {
    headers = {
      Accept: "application/json",
    };
  } else {
    headers = {
      Accept: "application/json",

    };
  }
  const response = await fetch(URL + recurso, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  });
  return await response.json();
}





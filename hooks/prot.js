
import { getToken, getExternalUser } from "./SessionUtilClient";

export async function ListaEscuelas() {
    const token = getToken();

    try {
        // Configuración de la solicitud GET
        const options = {
            method: 'GET',
            headers: {
                'TEST-KEY': token,
                // Agrega otros encabezados si es necesario
            },
        };

        // URL del recurso
        const url = 'https://computacion.unl.edu.ec/pdml/examen1/examen.php?resource=school';

        // Realizar la solicitud GET
        const response = await fetch(url, options);

        // Manejar la respuesta
        if (response.ok) {
            const data = await response.json();
            // Devolver directamente el array de cursos
            return data.info;
        } else {
            console.error('Error al obtener los cursos:', response.status, response.statusText);
            // En caso de error, puedes devolver un array vacío o null según tus necesidades
            return [];
        }
    } catch (error) {
        console.error('Error en la solicitud GET:', error.message);
        // En caso de error, puedes devolver un array vacío o null según tus necesidades
        return [];
    }
}

export async function noCensados() {
    const token = getToken();

    try {
        // Configuración de la solicitud GET
        const options = {
            method: 'GET',
            headers: {
                'TEST-KEY': token,
                // Agrega otros encabezados si es necesario
            },
        };

        // URL del recurso
        const url = 'https://computacion.unl.edu.ec/pdml/examen1/examen.php?resource=unregistered_children';

        // Realizar la solicitud GET
        const response = await fetch(url, options);

        // Manejar la respuesta
        if (response.ok) {
            const data = await response.json();
            // Devolver directamente el array de cursos
            return data.info;
        } else {
            console.error('Error al obtener los niños no censados:', response.status, response.statusText);
            // En caso de error, puedes devolver un array vacío o null según tus necesidades
            return [];
        }
    } catch (error) {
        console.error('Error en la solicitud GET:', error.message);
        // En caso de error, puedes devolver un array vacío o null según tus necesidades
        return [];
    }
}

export async function obtenerCursos() {

    try {
        // Configuración de la solicitud GET
        const options = {
            method: 'GET',
            headers: {

                // Agrega otros encabezados si es necesario
            },
        };

        // URL del recurso
        const url = 'https://computacion.unl.edu.ec/pdml/examen1/examen.php?resource=course';

        // Realizar la solicitud GET
        const response = await fetch(url, options);

        // Manejar la respuesta
        if (response.ok) {
            const data = await response.json();
            // Devolver directamente el array de cursos
            return data.info;
        } else {
            console.error('Error al obtener los niños no censados:', response.status, response.statusText);
            // En caso de error, puedes devolver un array vacío o null según tus necesidades
            return [];
        }
    } catch (error) {
        console.error('Error en la solicitud GET:', error.message);
        // En caso de error, puedes devolver un array vacío o null según tus necesidades
        return [];
    }
}


export async function nuevoCenso(formData, ninoIncensadoSeleccionado, escuelaSeleccionada, cursoSeleccionado) {
    const token = getToken();
    const external = getExternalUser();

    console.log(external)
    try {
        // URL del recurso
        const url = 'https://computacion.unl.edu.ec/pdml/examen1/examen.php';

        // Configuración de la solicitud POST
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'TEST-KEY': token,  // Reemplaza 'tu_token_aqui' con tu token
            },
            body: JSON.stringify({
                resource: 'saveCensus',
                weight: formData.weight,
                height: formData.height,
                representative: formData.representative,
                activities: formData.activities,
                external_child: ninoIncensadoSeleccionado?.external_id || '',
                external_school: escuelaSeleccionada?.external_id || '',
                external_course: cursoSeleccionado?.external_id || '',
                external_session: external,  // Reemplaza 'tu_external_user_aqui' con tu external user
            }),
        };

        // Realizar la solicitud POST
        const response = await fetch(url, options);

        // Manejar la respuesta
        if (response.ok) {
            const data = await response.json();
            console.log('Respuesta del servidor:', data);
            // Puedes devolver la respuesta del servidor si es necesario
            return data;
        } else {
            console.error('Error en la solicitud POST:', response.status, response.statusText);
            // En caso de error, puedes devolver un objeto con un mensaje de error
            return { error: 'Hubo un error al guardar los datos.' };
        }
    } catch (error) {
        console.error('Error en la solicitud POST:', error.message);
        // En caso de error, puedes devolver un objeto con un mensaje de error
        return { error: 'Hubo un error al realizar la solicitud.' };
    }
}

export async function ninosCensados() {
    const token = getToken();
    const external_user = getExternalUser();

    try {
        // Configuración de la solicitud GET
        const options = {
            method: 'GET',
            headers: {
                'TEST-KEY': token,
                // Agrega otros encabezados si es necesario
            },
        };

        // URL del recurso

        const url = `https://computacion.unl.edu.ec/pdml/examen1/examen.php?resource=census_children_login&external=${external_user}`;

        // Realizar la solicitud GET
        const response = await fetch(url, options);

        // Manejar la respuesta
        if (response.ok) {
            const data = await response.json();
            // Devolver directamente el array de cursos
            return data.info;
        } else {
            console.error('Error al obtener los niños censados:', response.status, response.statusText);
            // En caso de error, puedes devolver un array vacío o null según tus necesidades
            return [];
        }
    } catch (error) {
        console.error('Error en la solicitud GET:', error.message);
        // En caso de error, puedes devolver un array vacío o null según tus necesidades
        return [];
    }
}

export async function Modificar(formData, escuelaSeleccionada, cursoSeleccionado, external_censo) {
    const token = getToken();
    //const external = getExternalUser();

    console.log(external_censo)
    try {
        // URL del recurso
        const url = 'https://computacion.unl.edu.ec/pdml/examen1/examen.php';

        // Configuración de la solicitud POST
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'TEST-KEY': token,  // Reemplaza 'tu_token_aqui' con tu token
            },
            body: JSON.stringify({
                resource: 'saveCensus',
                weight: formData.weight,
                height: formData.height,
                representative: formData.representative,
                activities: formData.activities,
                external_school: escuelaSeleccionada?.external_escuela
                    || '',
                external_course: cursoSeleccionado?.external_curso
                    || '',
                external: external_censo,  // Reemplaza 'tu_external_user_aqui' con tu external user
            }),
        };

        // Realizar la solicitud POST
        const response = await fetch(url, options);

        // Manejar la respuesta
        if (response.ok) {
            const data = await response.json();
            console.log('Respuesta del servidor:', data);
            // Puedes devolver la respuesta del servidor si es necesario
            return data;
        } else {
            console.error('Error en la solicitud POST:', response.status, response.statusText);
            // En caso de error, puedes devolver un objeto con un mensaje de error
            return { error: 'Hubo un error al guardar los datos.' };
        }
    } catch (error) {
        console.error('Error en la solicitud POST:', error.message);
        // En caso de error, puedes devolver un objeto con un mensaje de error
        return { error: 'Hubo un error al realizar la solicitud.' };
    }
}

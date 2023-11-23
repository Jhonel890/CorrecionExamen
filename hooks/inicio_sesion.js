import { enviar } from "./Conexion";
import { save, saveToken } from "./SessionUtil";


export async function inicio_sesion(data) {
    const sesion = await enviar("index.php?funcion=marcas", data);
    if (sesion.code == 200 && sesion.jwt) {
        saveToken(sesion.jwt);
        save("id", sesion.external);
        save("user", sesion.usuario);
    }
    return sesion;
}

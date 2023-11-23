import { enviar } from "./Conexion";
import { save, saveToken } from "./SessionUtil";

export async function inicio_sesion(data) {
  const sesion = await enviar('examen.php', data);
  console.log(sesion)
  if (sesion.code == 200 && sesion.info.code) {
    saveToken(sesion.info.code);
    save("user", sesion.info.email);
    save("external", sesion.info.external);
  }
  return sesion;
}


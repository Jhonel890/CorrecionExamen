"use client";
export const get = (key) => {
  window.sessionStorage.getItem(key);
};

export const getToken = () => {
  return window.sessionStorage.getItem("token");
};

export function borrarSesion() {
  sessionStorage.clear();
}

export const getExternalUser = () => {
  var sesion = sessionStorage.getItem('external')
  return sesion;
};

export function estaSesion() {
  let token = window.sessionStorage.getItem("token");

  return token && (token != "undefined" || token != null || token != "null");
}

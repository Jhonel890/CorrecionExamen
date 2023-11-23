'use client'
import { borrarSesion, estaSesion } from "@/hooks/SessionUtilClient";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Menu() {
    const [sesionActualizada, setSesionActualizada] = useState(false);

    useEffect(() => {
        setSesionActualizada(true);

    }, []);

    const verificarSesion = () => {
        if (estaSesion()) {
            return (
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/lista">Lista</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/inicio_sesion" onClick={() => { borrarSesion(); }}>Cerrar Sesión</a>
                    </li>
                </ul>
            )
        } else {
            return (
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <Link href="/inicio_sesion" classNameName="nav-link active" aria-current="page">Login</Link>
                </ul>
            )
        }
    }

    return (
        <div key={sesionActualizada}>
            {sesionActualizada && (
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {verificarSesion()}
                            </ul>
                        </div>
                    </div>
                </nav>
            )}
        </div>
    );
}
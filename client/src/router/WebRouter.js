import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Clientes, Contacto, Solicitudes, Post } from "../pages/web";
import { ClientLayout } from "../layouts";


export function WebRouter() {
    const loadLayout = (Layout, Page) => {
        return (
            <Layout>
                <Page />
            </Layout>
        );
    }

    return (
        <Routes>
            <>
                <Route path="/" element={loadLayout(ClientLayout, Home)} />
                <Route path="/clientes" element={loadLayout(ClientLayout, Clientes)} />
                <Route path="/solicitudes" element={loadLayout(ClientLayout, Solicitudes)} />
                <Route path="/solicitudes/:path" element={loadLayout(ClientLayout, Post)} />
                <Route path="/contacto" element={loadLayout(ClientLayout, Contacto)} />
            </>
        </Routes>
    );

}
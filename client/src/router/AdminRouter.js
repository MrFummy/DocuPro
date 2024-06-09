import React from "react";
import { Routes, Route } from "react-router-dom";
import { Auth, Users, Contratas, Documentacion, Menu, Newsletter, Subidas } from "../pages/admin";
import { AdminLayout } from "../layouts";
import { useAuth } from "../hooks";

export function AdminRouter() {
    
    const { user } = useAuth();
    const loadLayout = (Layout, Page) => {
        return (
            <Layout>
                <Page />
            </Layout>
        );
    }
    return (
        <Routes>
            {!user ? (
                <Route path="/admin/*" element={<Auth />} />
            ) : (
                <>
                    {["/admin", "/admin/contratas"].map((path) => (
                        <Route key={path} path={path} element={loadLayout(AdminLayout, Contratas)} />
                    ))}
                <Route path="/admin/users" element={loadLayout(AdminLayout, Users)} />
                <Route path="/admin/documentacion" element={loadLayout(AdminLayout, Documentacion)} />
                <Route path="/admin/subidas" element={loadLayout(AdminLayout, Subidas)} />
                <Route path="/admin/menu" element={loadLayout(AdminLayout, Menu)} />
                <Route path="/admin/newsletter" element={loadLayout(AdminLayout, Newsletter)} />
                </>
            )}  
        </Routes>
    );
}
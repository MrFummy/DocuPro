import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import "./AdminMenu.scss";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../../hooks";


export function AdminMenu() {
    const { pathname } = useLocation();
    const { user: { role } } = useAuth();
    const isAdmin = role === "admin";

    const isCurrentPath = (path) => {
        if(path === pathname) return true;
        return false;
    }
    return (
        <Menu fluid vertical icon text className="admin-menu">
                {isAdmin && (
            <>
            <Menu.Item as={Link} to="/admin/users" active={isCurrentPath("/admin/users")}>
                <Icon name="user outline" />
                Usuarios
            </Menu.Item>
            <Menu.Item as={Link} to="/admin/menu" active={isCurrentPath("/admin/menu")}>
                <Icon name="bars" />
                Menu
            </Menu.Item>
            <Menu.Item as={Link} to="/admin/contratas" active={isCurrentPath("/admin/contratas")}>
                <Icon name="address card outline" />
                Validaciones
            </Menu.Item>
            </>
                )}
            <Menu.Item as={Link} to="/admin/documentacion" active={isCurrentPath("/admin/documentacion")}>
                <Icon name="computer" />
                Documentacion
            </Menu.Item>
            <Menu.Item as={Link} to="/admin/subidas" active={isCurrentPath("/admin/subidas")}>
                <Icon name="upload" />
                Subidas
            </Menu.Item>
            <Menu.Item as={Link} to="/admin/newsletter" active={isCurrentPath("/admin/newsletter")}>
                <Icon name="mail" />
                Suscribirse
            </Menu.Item>
        </Menu>
    );
}

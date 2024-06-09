import React, { useState, useEffect} from "react";
import { Menu } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { Loader } from "semantic-ui-react";
import {size, map } from "lodash";
import { MenuItem } from "../MenuItem";

const menuController = new Menu();

export function ListMenu(props){
    const {active, reload, onReload} = props;
    const { accessToken } = useAuth();
    const [menus, setMenus] = useState(null);
    
    useEffect(() => {
        (async () => {
            try {
                setMenus(null);
                const response = await menuController.getMenu(accessToken, active);
                setMenus(response);

            } catch (error) {
                console.error(error);
            }
        })();
    }, [active, reload]);

    if(!menus) return <Loader active inline="centered" />;
    if (size(menus) === 0) return "No se han encontrado menus";

    return map(menus, (menu) => <MenuItem key={menu._id} menu={menu} onReload={onReload} />);
}

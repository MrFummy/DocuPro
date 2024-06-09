import React from "react";
import { Menu } from "../../../../api";
import { useAuth } from "../../../../hooks";
import {ENV} from "../../../../utils";
import { Form, Dropdown, Input } from "semantic-ui-react";
import { Formik, useFormik } from "formik";
import { initialValues,validationSchema } from "./MenuForm.form";

const menuController = new Menu();

export function MenuForm(props){
    const {onClose, onReload, menu} = props;
    const { accessToken } = useAuth();
    const formik = useFormik({
        initialValues: initialValues(menu),
        validationSchema: validationSchema(menu),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const data = {
                    title: formValue.title,
                    path: `${formValue.protocol}${formValue.path}`,
                    order: formValue.order,
                    active: formValue.active
                };
                if(!menu){
                    await menuController.createMenu(accessToken, data);
                } else {
                    data.path = formValue.path;
                    await menuController.updateMenu(accessToken, menu._id, data);
                }
                onReload();
                onClose();
            } catch (error){
                console.error(error);
            }
        }
    })
    return(
        <Form className="menu-form" onSubmit={formik.handleSubmit}>
            <Form.Group widths="equal">
                <Form.Input 
                    name="title" 
                    placeholder="Titulo" 
                    onChange={formik.handleChange} 
                    value={formik.values.title}
                    error={formik.errors.title}/>
                <Form.Input 
                    name="order"
                    type="number" 
                    placeholder="order"
                    onChange={formik.handleChange} 
                    value={formik.values.order}
                    error={formik.errors.order} 
                    />
            </Form.Group>
            <Input 
                name="path" 
                placeholder="URL" 
                fluid
                onChange={formik.handleChange} 
                value={formik.values.path}
                error={formik.errors.path}
                label={!menu ? 
                    <Dropdown options={pathOptions} 
                              onChange={(_, data) => formik.setFieldValue("protocol", data.value)} 
                            value={formik.values.protocol}
                            error={formik.errors.protocol}
                    /> : null }
          />
        <Form.Group/>

        <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
            {menu ? "Actualizar menu" : "Crear menu"}
        </Form.Button>
        </Form>
    );

}

const pathOptions = [
    {
        key: "https://",
        text: "https://",
        value: "https://",
    },
    {
        key: "https://",
        text: "http://",
        value: "http://",
    },
    {
        key: "/",
        text: "/",
        value: "/",
    },
];
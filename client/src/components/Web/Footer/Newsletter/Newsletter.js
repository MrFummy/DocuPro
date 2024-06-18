import React, {useState} from "react";
import { initialValues, validationSchema } from "./Newsletter.Form";
import { useFormik } from "formik"; 
import "./Newsletter.scss";
import { Form } from "semantic-ui-react";
import { Newsletter as Email } from "../../../../api";

const email = new Email();

export function Newsletter() {
    const [success, setSuccess] = useState(false);
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            setSuccess(false);
            try {
                await email.suscribeEmail(formValue.email);
                formik.resetForm();
                setSuccess(true);
           } catch (error) {
               console.error(error);
           }
        }
    });
    
    return (
        <div className="footer-newsletter">
            <h4>Apuntate a nuestra Newsletter</h4>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Input name="email" 
                            placeholder="Correo electronico" 
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            error={formik.errors.email}/>
                <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
                    Me suscribo!
                </Form.Button>
                {success && (
                  <p className="success">Email registrado correctamente</p>
                )}
            </Form>
        </div>
    );
}
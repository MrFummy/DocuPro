import { ENV } from "../utils";

export class Contrata{
    baseApi = ENV.BASE_API;



    async getDocumentos(estado){
        try{
            /*const pageFilter = `page=${params.page || 1}`;
            const limitFilter = `limit=${params.limit || 10}`;
            const estado = `${params.estado}`;*/
            const url = `${this.baseApi}/${ENV.API_ROUTES.DOCUMENTO}?estado=${estado}&page=1&limit=50`;
            const response = await fetch(url);
            const result = await response.json();
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }

    
    async updateDocumento(accessToken, idDocumento, documentData){
        try {
            const data = documentData;
            const url = `${this.baseApi}${ENV.API_ROUTES.DOCUMENTO}/${idDocumento}`;
            const params = {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${accessToken}` 
                },
                body: JSON.stringify(data),
            };
            const response = await fetch(url, params);
            const result = await response.json();
            if (response.status !== 200) throw result;
            console.log(result);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async validaDocumento(accessToken, idDocumento){
        try {
            const url = `${this.baseApi}${ENV.API_ROUTES.VALIDA}/${idDocumento}`;
            const params = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`, 
                },
            };
            const response = await fetch(url, params);
            if (response.status !== 200) {
                const result = await response.json();
                throw result;
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    async invalidaDocumento(accessToken, idDocumento){
        try {
            const url = `${this.baseApi}${ENV.API_ROUTES.INVALIDA}/${idDocumento}`;
            const params = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}` 
                },
            };
            const response = await fetch(url, params);
            if (response.status !== 200) {
                const result = await response.json();
                throw result;
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    async uploadDocumento(accessToken, documentId, file, userId) {
        const url = `${this.baseApi}${ENV.API_ROUTES.UPLOAD}`;
        const formData = new FormData();
        formData.append('id', documentId);
        formData.append('documento', file);
        formData.append('uploader', userId);
        const params = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
        };
        try {
            const response = await fetch(url, params);
            const responseText = await response.text(); // Obtener la respuesta completa como texto
            console.log('Response text:', responseText);

            if (!response.ok) {
                const result = JSON.parse(responseText); // Intentar convertir la respuesta a JSON
                throw result;
            }
            return JSON.parse(responseText); // Convertir la respuesta a JSON si es válida
        } catch (error) {
            throw error;
        }
    }


}
import { ENV } from "../utils";

export class Solicitud {
    baseApi = ENV.BASE_API;

    async getSolicitudes(params){ 
        try {
            const pageFilter = `page=${params?.page || 1}`;
            const limitFilter = `limit=${params?.limit || 10}`;
            const url = `${this.baseApi}${ENV.API_ROUTES.SOLICITUD}?${pageFilter}&${limitFilter}`;
            const response = await fetch(url);
            const result = await response.json();
            if(response.status !== 200) throw result;
            return result;

        } catch (error) {
            throw error;
        }
    }

}
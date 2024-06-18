import { ENV } from "../utils";

export class Newsletter {
    baseApi = ENV.BASE_API;

    async getEmails(accessToken, page = 1, limit = 10){ 
        try {
            const pageFilter = `page=${page}`;
            const limitFilter = `limit=${limit}`;
            const url = `${this.baseApi}${ENV.API_ROUTES.NEWSLETTER}?${pageFilter}&${limitFilter}`;
            const params = {
                headers: {
                   Authorization: `Bearer ${accessToken}`, 
                },
            };
            const response = await fetch(url, params);
            const result = await response.json();
            if(response.status !== 200) throw result;
            return result;

        } catch (error) {
            throw error;
        }
    }

    async deleteEmail(accessToken, idEmail){
        try {
            const url = `${this.baseApi}${ENV.API_ROUTES.NEWSLETTER}/${idEmail}`;
            console.log(url);
            const params = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${accessToken}` 
                },
            };
            const response = await fetch(url, params);
            const result = await response.json();
            if (response.status !== 200) throw result;
            return result;

        } catch (error) {
            throw error;
        }
    }

    async suscribeEmail(data){
        try {
            const url = `${this.baseApi}${ENV.API_ROUTES.NEWSLETTER}`;
            console.log(url);
            console.log(data);
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: data,
                }),
            };
            const response = await fetch(url, params);
            const result = await response.json();
            if (response.status !== 200) throw result;
            return result;

        } catch (error) {
            throw error;
        }
    }


}
import RESTClient from './RESTClient.mjs';

export default class RESTCountries {
    constructor() {
        this.baseUrl = 'https://restcountries.com/v3.1/';
    }

    async getWithData(restClient, fields) {
        try {
            const response = await restClient.get(
                {
                    fields: fields
                }
            )

            return response;
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    async getAllCountries(fields="name,flags,maps") {
        try {
            const restClient = new RESTClient(this.baseUrl + 'all');
            const response = await this.getWithData(restClient, fields);

            return response;
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    async getCountryByName(name, fields="name,flags,maps") {
        try {
            const restClient = new RESTClient(this.baseUrl + 'name/' + name);
            const response = await this.getWithData(restClient, fields);

            return response;
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
}
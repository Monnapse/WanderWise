import RESTClient from './RESTClient.mjs';

class Place {
    constructor(name, flag, map, img, temp) {
        this.name = name;
        this.flag = flag;
        this.map = map;
        this.img = img;
        this.temp = temp;
    }
}

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

    async parseResponse(response) {
        if (response === null || response == undefined) return null;

        const name = response.name.common;
        const flag = response.flags.png;
        const map = response.maps.googleMaps;
        const img = response.flags.svg;
        const temp = "82°F Sunny";

        return new Place(name, flag, map, img, temp);
    }

    async parseResponses(response) {
        if (!Array.isArray(response)) {
            console.error('Response is not an array:', response);
            return [];
        }

        let parsedResponse = [];

        //console.log(response);

        for (const country of response) {
            parsedResponse.push(await this.parseResponse(country));
        }

        return parsedResponse;
    }

    async getAllCountries(fields="name,flags,maps", parse=true) {
        try {
            const restClient = new RESTClient(this.baseUrl + 'all');
            const response = await this.getWithData(restClient, fields);
            
            if (!response || !Array.isArray(response)) {
                console.error('Invalid response:', response);
                return null;
            }

            //console.log(response);
            return parse ? await this.parseResponses(response) : response;
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    async getCountryByName(name, fields="name,flags,maps", parse=true) {
        try {
            const restClient = new RESTClient(this.baseUrl + 'name/' + name);
            const response = await this.getWithData(restClient, fields);

            return parse ? await this.parseResponse(response[0]) : response[0];
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    async bulkSearchCountries(filCountries, fields="name,flags,maps", parse=true) {
        try {
            const countries = await this.getAllCountries(fields, false);

            //console.log(countries);

            if (!countries) return null;
            if (countries.length === 0) return null;

            const filteredCountries = [];

            //console.log(countries);

            for (const filCountry of filCountries) {
                for (const country of countries) {
                    if (country.name.common.toLowerCase() === filCountry.toLowerCase()) {
                        //console.log(country);
                        filteredCountries.push(country);
                    }
                }
            }

            //console.log(filteredCountries);

            return parse ? await this.parseResponses(filteredCountries) : filteredCountries;
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
}
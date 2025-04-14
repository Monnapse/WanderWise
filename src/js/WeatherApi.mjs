import RESTClient from './RESTClient.mjs';

export default class WeatherApi {
    constructor(apiKey) {
        this.baseUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}`;
    }

    async getWeatherByQuery(query) {
        try {
            const restClient = new RESTClient(this.baseUrl);
            const response = await restClient.get({
                q: query
            });

            return response;
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
}
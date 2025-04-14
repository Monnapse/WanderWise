import RESTClient from './RESTClient.mjs';

export default class PexelsWrapper {
    constructor(apiKey) {
        //this.client = createClient(apiKey);
        this.baseUrl = 'https://api.pexels.com/v1/';
    }

    async searchPhotos(query, perPage=10, page=1) {
        try {
            const restClient = new RESTClient(this.baseUrl + 'search');
            //const response = await this.getWithData(restClient, fields);
            const response = await restClient.get(
                {
                    query: query,
                    per_page: perPage,
                    page: page
                },
                {
                    Authorization: import.meta.env.VITE_PEXELS_API_KEY
                }
            );

            //const response = await this.client.photos.search({
            //    query: query,
            //    per_page: perPage,
            //    page: page
            //});
            return response.photos;
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    async getRandomPhoto(query, searchAmount=5) {
        try {
            const photos = await this.searchPhotos(query, searchAmount, 1);

            if (photos.length === 0) {
                console.error('No photos found for query:', query);
                return null;
            }

            const randomIndex = Math.floor(Math.random() * searchAmount);
            return photos[randomIndex].src.large2x;
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
}
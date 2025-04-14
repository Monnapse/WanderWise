import { createClient } from 'pexels';

export default class PexelsWrapper {
    constructor(apiKey) {
        this.client = createClient(apiKey);
    }

    async searchPhotos(query, perPage=10, page=1) {
        try {
            const response = await this.client.photos.search({
                query: query,
                per_page: perPage,
                page: page
            });
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
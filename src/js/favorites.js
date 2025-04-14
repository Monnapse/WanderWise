import { loadHeaderFooter, loadDates, updateRecommendedCard, replaceCards, getFavorites } from './utils.mjs';
import RESTCountries from './RESTCountries.mjs';
import PexelsWrapper from './PexelsWrapper.mjs';

const restCountries = new RESTCountries();
const pexels = new PexelsWrapper(import.meta.env.VITE_PEXELS_API_KEY);

async function init() {
    await loadHeaderFooter();
    loadDates();

    const favorites = getFavorites();

    const countries = await restCountries.bulkSearchCountries(favorites, 'name,flags,maps');
    const countriesWithPhotos = [];

    for (const country of countries) {
        if (!country) continue; // Skip if country is not found
        const photo = await pexels.getRandomPhoto(country.name, 5);
        country.img = photo;
        countriesWithPhotos.push(country);
    }


    console.log(countriesWithPhotos)
    replaceCards(countriesWithPhotos, "#favorites-container");
}

init();
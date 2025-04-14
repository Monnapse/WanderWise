import { loadHeaderFooter, loadDates, updateRecommendedCard, replaceCards } from './utils.mjs';
import RESTCountries from './RESTCountries.mjs';
import PexelsWrapper from './PexelsWrapper.mjs';
//import WeatherApi from './WeatherApi.mjs';



async function init() {
    await loadHeaderFooter();
    loadDates();

    
    const restCountries = new RESTCountries();
    //const countries = await restCountries.getAllCountries();

    const recommendedCountryName = import.meta.env.VITE_RECOMMENDED_COUNTRY;
    const recommendedCountries = import.meta.env.VITE_RECOMMENDED_COUNTRIES.split(',');

    const recommendedCountry = await restCountries.getCountryByName(recommendedCountryName, 'name,flags,maps');
    const recommendedCountriesList = await restCountries.bulkSearchCountries(recommendedCountries, 'name,flags,maps');

    const pexels = new PexelsWrapper(import.meta.env.VITE_PEXELS_API_KEY);
    const recommendedCountryPhotos = await pexels.getRandomPhoto(recommendedCountry.name, 5);

    // Add images to recommended countries
    for (const country of recommendedCountriesList) {
        const photo = await pexels.getRandomPhoto(country.name, 5);
        country.img = photo;
    }

    updateRecommendedCard(
        recommendedCountry.name,
        "82°F Sunny",
        "The capital is " + recommendedCountry.name + ".",
        
        //country.img = photo[randomIndex].src.large2x;
        recommendedCountryPhotos
    )

    replaceCards(recommendedCountriesList, "#recommend-destinations-container");
}

init();
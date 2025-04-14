import { loadHeaderFooter, loadDates, updateRecommendedCard, replaceCards } from './utils.mjs';
import RESTCountries from './RESTCountries.mjs';
import PexelsWrapper from './PexelsWrapper.mjs';

const restCountries = new RESTCountries();
const pexels = new PexelsWrapper(import.meta.env.VITE_PEXELS_API_KEY);

async function searchResults(search) {
    if (!search) {
        return [];
    }

    const countries = await restCountries.getAllCountries('name,flags,maps');
    const countriesFiltered = [];

    for (const country of countries) {
        if (country.name.toLowerCase().includes(search.toLowerCase())) {
            country.img = await pexels.getRandomPhoto(country.name, 5, 1);
            countriesFiltered.push(country);
        }
    }

    console.log(countriesFiltered)
    replaceCards(countriesFiltered, "#destinations-container");
}

async function init() {
    await loadHeaderFooter();
    loadDates();

    // Get q param
    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get('q');
    //const searchedCountryName = document.para;

    await searchResults(q || "Spain");

    //const randomizeBtn = document.querySelector("#randomize-btn");
//
    //randomizeBtn.addEventListener("click", async () => {
    //    await requestRandomCountries(12);
    //});
}

init();
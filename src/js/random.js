import { loadHeaderFooter, loadDates, updateRecommendedCard, replaceCards } from './utils.mjs';
import RESTCountries from './RESTCountries.mjs';
import PexelsWrapper from './PexelsWrapper.mjs';

const restCountries = new RESTCountries();
const pexels = new PexelsWrapper(import.meta.env.VITE_PEXELS_API_KEY);

async function requestRandomCountries(amount=10) {
    const countries = await restCountries.getAllCountries('name,flags,maps');
    const randomCountries = [];

    for (let i = 0; i < amount; i++) {
        const randomIndex = Math.floor(Math.random() * countries.length);

        const country = countries[randomIndex];
        country.img = await pexels.getRandomPhoto(country.name, 5, 1);
        randomCountries.push(country);

        countries.splice(randomIndex, 1); // Remove the selected country from the array to avoid duplicates
    }

    console.log(randomCountries)
    replaceCards(randomCountries, "#recommend-destinations-container");
}

async function init() {
    await loadHeaderFooter();
    loadDates();

    await requestRandomCountries(12);

    const randomizeBtn = document.querySelector("#randomize-btn");

    randomizeBtn.addEventListener("click", async () => {
        await requestRandomCountries(12);
    });
}

init();
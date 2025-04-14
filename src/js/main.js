import { loadHeaderFooter, loadDates } from './utils.mjs';
import RESTCountries from './RESTCountries.mjs';

async function init() {
    await loadHeaderFooter();
    loadDates();
}

init();

const restCountries = new RESTCountries();
const countries = await restCountries.getAllCountries();

const recommendedCountryName = import.meta.env.VITE_RECOMMENDED_COUNTRY;

const recommendedCountry = await restCountries.getCountryByName(recommendedCountryName, 'name,flags,maps');
console.log(recommendedCountry);
import { loadHeaderFooter, loadDates } from './utils.mjs';

async function init() {
    await loadHeaderFooter();
    loadDates();
}

init();